import { csvParse } from "d3-dsv";

export async function loadIPGStats(
  url: string,
  maxIPG: number
): Promise<Array<{ metric: string; value: number }>> {
  /**
   * Calcula as métricas estatísticas Skewness (assimetria) e Kurtosis (achatamento)
   * da distribuição dos IPGs (Inter-Packet Gaps).
   * 
   * Ideal para detecção de anomalias ou assimetrias em tráfego de rede.
   * 
   * @returns Um array com objetos { metric, value }:
   *  - Skewness: assimetria da distribuição (negativa: cauda à esquerda, positiva: à direita)
   *  - Kurtosis: achatamento da distribuição (valores altos indicam caudas pesadas)
  */
  try {
    // Requisição do CSV com dados de timestamp
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error("Erro ao carregar o arquivo");

    const text = await response.text();
    const rawData = csvParse(text);

    // Verifica a presença da coluna 'timestamp'
    if (!("timestamp" in rawData[0])) {
      throw new Error("Coluna 'timestamp' não encontrada no CSV.");
    }

    const ipgs: number[] = [];

    // Calcula o IPG entre pares consecutivos de pacotes
    for (let i = 1; i < rawData.length && ipgs.length < 10000; i++) {
      const prev = parseFloat(rawData[i - 1]["timestamp"]);
      const curr = parseFloat(rawData[i]["timestamp"]);
      if (isNaN(prev) || isNaN(curr)) continue;

      let ipg = curr - prev;
      if (ipg > 1e10) ipg /= 1_000_000; // Corrige se estiver em microssegundos
      if (ipg >= 0 && ipg <= maxIPG) ipgs.push(ipg);
    }

    const n = ipgs.length;
    if (n < 2) return []; // Amostra muito pequena para estatísticas confiáveis

    // Média e desvio padrão
    const mean = ipgs.reduce((a, b) => a + b, 0) / n;
    const variance = ipgs.reduce((acc, val) => acc + (val - mean) ** 2, 0) / n;
    const stdDev = Math.sqrt(variance);

    // Skewness: mede a simetria da distribuição
    const skewness =
      ipgs.reduce((acc, val) => acc + ((val - mean) / stdDev) ** 3, 0) / n;

    // Kurtosis: mede o achatamento/caudas pesadas da distribuição
    const kurtosis =
      ipgs.reduce((acc, val) => acc + ((val - mean) / stdDev) ** 4, 0) / n;

    return [
      { metric: "Skewness", value: parseFloat(skewness.toFixed(3)) },
      { metric: "Kurtosis", value: parseFloat(kurtosis.toFixed(3)) },
    ];
  } catch (error) {
    console.error("Erro ao calcular Skewness e Kurtosis:", error);
    return [];
  }
}
