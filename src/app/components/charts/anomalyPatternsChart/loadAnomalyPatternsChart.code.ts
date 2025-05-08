export const code = `
import { csvParse } from "d3-dsv";

export async function loadAnomalyPatterns({
  url,
  binSize = 1,
  maxPackets = 10000,
}: {
  url: string
  binSize?: number
  maxPackets?: number
}): Promise<Array<{ time: number; packets: number }>> {
  /**
   * Gera a quantidade de pacotes por janela de tempo para observar padrões anômalos.
   * 
   * @param binSize - Tamanho da janela de tempo em segundos para agrupar os pacotes.
   * @param maxPackets - Número máximo de pacotes a serem processados.
   * @returns Um array de objetos contendo o tempo relativo (em bins) e a quantidade de pacotes naquele intervalo.
  */
  try {
    // Faz requisição para obter os dados CSV
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error("Erro ao carregar o CSV.");

    // Converte o conteúdo em texto e depois em uma lista de objetos (linhas do CSV)
    const text = await response.text();
    const rawData = csvParse(text);

    // Verifica se o CSV contém a coluna 'timestamp'
    if (!("timestamp" in rawData[0])) {
      throw new Error("CSV deve conter a coluna 'timestamp'.");
    }

    const bins: Record<number, number> = {}; // Mapeia o número de pacotes por intervalo de tempo (bin)
    let processed = 0; // Contador de pacotes processados
    let baseTime: number | null = null; // Timestamp do primeiro pacote, usado como referência

    // Itera sobre as linhas do CSV
    for (const row of rawData) {
      if (processed >= maxPackets) break; // Limita a quantidade de pacotes processados

      let ts = parseFloat(row["timestamp"]); // Converte o timestamp para número
      if (isNaN(ts)) continue; // Ignora valores inválidos

      // Corrige timestamps que parecem estar em nanossegundos
      if (ts > 1e10) ts = ts / 1_000_000;

      // Define o tempo base como o timestamp do primeiro pacote
      if (baseTime === null) baseTime = ts;

      const relTime = ts - baseTime; // Calcula o tempo relativo desde o primeiro pacote
      const bin = Math.floor(relTime / binSize); // Determina em qual bin o pacote cai

      bins[bin] = (bins[bin] || 0) + 1; // Incrementa a contagem de pacotes no bin correspondente
      processed++;
    }

    // Converte o objeto bins para um array ordenado por tempo
    const result = Object.entries(bins)
      .map(([time, packets]) => ({
        time: parseInt(time),
        packets,
      }))
      .sort((a, b) => a.time - b.time);

    return result;
  } catch (error) {
    // Em caso de erro, exibe no console e retorna array vazio
    console.error("Erro ao detectar padrões anômalos:", error);
    return [];
  }
}
`;
