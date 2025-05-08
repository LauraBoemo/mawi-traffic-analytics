import { csvParse } from "d3-dsv";

export async function loadBurstnessData(
  url: string,
  binSize = 1,
  maxPoints = 10000
): Promise<Array<{ time: number; packets: number }>> {
  /**
   * Gera a distribuição de pacotes por janelas de tempo (burstness),
   * útil para visualizar picos de tráfego em intervalos regulares.
   * 
   * @param binSize - Duração da janela de tempo em segundos.
   * @returns Um array de objetos com o tempo relativo (bin) e o número de pacotes naquela janela.
  */
  try {
    // Faz requisição para obter os dados CSV
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Erro ao carregar o arquivo: ${response.statusText}`);
    }

    // Converte o conteúdo do CSV em texto e depois em objetos
    const text = await response.text();
    const rawData = csvParse(text);

    // Verifica se existe a coluna 'timestamp' no CSV
    if (!("timestamp" in rawData[0])) {
      throw new Error("Coluna 'timestamp' não encontrada no CSV.");
    }

    const timeBins: Record<number, number> = {}; // Acumula contagens de pacotes por janela de tempo
    let processed = 0; // Quantidade de pacotes processados
    let baseTime = null; // Timestamp do primeiro pacote para referência

    // Itera sobre as linhas do CSV
    for (const row of rawData) {
      if (processed >= 10000) break; // Limita a 10.000 pacotes

      let ts = parseFloat(row["timestamp"]); // Converte o timestamp para número
      if (isNaN(ts)) continue;

      // Corrige timestamps possivelmente em microssegundos
      if (ts > 1e10) ts = ts / 1_000_000;

      // Define o tempo base no primeiro pacote válido
      if (baseTime === null) baseTime = ts;
      const relativeTime = ts - baseTime;

      // Determina o bin (janela de tempo) onde o pacote se encaixa
      const bin = Math.floor(relativeTime / binSize);

      // Incrementa a contagem de pacotes para aquele bin
      timeBins[bin] = (timeBins[bin] || 0) + 1;

      processed++;
    }

    // Converte o objeto timeBins em um array ordenado por tempo
    const data = Object.entries(timeBins)
      .map(([bin, count]) => ({
        time: parseInt(bin),
        packets: count,
      }))
      .sort((a, b) => a.time - b.time);

    // Reduz a quantidade de pontos se exceder maxPoints
    if (data.length > maxPoints) {
      const step = Math.floor(data.length / maxPoints);
      return data.filter((_, i) => i % step === 0).slice(0, maxPoints);
    }

    return data;
  } catch (error) {
    // Em caso de erro, loga no console e retorna array vazio
    console.error("Erro ao processar burstness:", error);
    return [];
  }
}
