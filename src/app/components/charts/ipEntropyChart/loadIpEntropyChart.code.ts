export const code = `
import { csvParse } from "d3-dsv";

export async function loadIPEntropyByWindow(
  url: string,
  binSize = 10, // segundos
  maxPackets = 10000
): Promise<Array<{ window: string; entropy: number }>> {
  /**
   * Calcula a entropia da distribuição de IPs de origem por janela de tempo.
   * A entropia mede a diversidade de IPs em cada intervalo — quanto maior, mais variado é o tráfego.
   * 
   * @param binSize - Duração da janela de tempo em segundos.
   * @param maxPackets - Número máximo de pacotes a serem processados.
   * @returns Array de objetos { window, entropy } onde:
   *  - window: intervalo de tempo formatado (ex: "00:00-00:10")
   *  - entropy: valor da entropia logarítmica baseado nos IPs de origem
  */
  try {
    // Requisição do CSV contendo os dados de tráfego
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error("Erro ao carregar o arquivo.");

    // Converte o conteúdo em texto e depois em array de objetos
    const text = await response.text();
    const rawData = csvParse(text);

    // Verifica se as colunas necessárias estão presentes
    if (!("timestamp" in rawData[0]) || !("src_ip" in rawData[0])) {
      throw new Error("CSV deve conter 'timestamp' e 'src_ip'.");
    }

    // Estrutura que armazena a contagem de IPs por janela de tempo (bin)
    const bins: Record<number, Record<string, number>> = {};
    let processed = 0;
    let baseTime: number | null = null;

    // Processa cada pacote
    for (const row of rawData) {
      if (processed >= maxPackets) break;

      let ts = parseFloat(row["timestamp"]);
      const ip = row["src_ip"];
      if (!ip || isNaN(ts)) continue;

      // Converte de microssegundos para segundos, se necessário
      if (ts > 1e10) ts = ts / 1_000_000;
      if (baseTime === null) baseTime = ts;

      // Calcula tempo relativo ao primeiro pacote e determina a janela (bin)
      const relTime = ts - baseTime;
      const bin = Math.floor(relTime / binSize);

      // Inicializa e atualiza contagem de IPs para o bin atual
      if (!bins[bin]) bins[bin] = {};
      bins[bin][ip] = (bins[bin][ip] || 0) + 1;

      processed++;
    }

    // Função utilitária para formatar a janela de tempo (ex: "00:10-00:20")
    const formatWindow = (bin: number) => {
      const start = bin * binSize;
      const end = (bin + 1) * binSize;
      const format = (s: number) => {
        const min = Math.floor(s / 60).toString().padStart(2, "0");
        const sec = Math.floor(s % 60).toString().padStart(2, "0");
        return 
      };
      return
    };

    // Calcula a entropia para cada janela de tempo
    const entropyData = Object.entries(bins).map(([binStr, ipCounts]) => {
      const bin = parseInt(binStr, 10);
      const total = Object.values(ipCounts).reduce((sum, count) => sum + count, 0);

      const entropy = Object.values(ipCounts).reduce((sum, count) => {
        const p = count / total; // probabilidade de um IP aparecer
        return sum - p * Math.log2(p); // fórmula da entropia de Shannon
      }, 0);

      return {
        window: formatWindow(bin),
        entropy: parseFloat(entropy.toFixed(3)), // 3 casas decimais para precisão controlada
      };
    });

    // Ordena por ordem cronológica das janelas
    return entropyData.sort((a, b) => a.window.localeCompare(b.window));
  } catch (error) {
    console.error("Erro ao calcular entropia de IPs:", error);
    return [];
  }
}
`;
