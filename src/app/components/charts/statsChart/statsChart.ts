import { csvParse } from "d3-dsv";
import { url, maxIPG } from "../mainValues";

/**
 * Calcula Skewness e Kurtosis da distribuição do IPG.
 * Retorna array com { metric, value } para visualização em BarChart.
 */
export async function loadIPGStats(): Promise<Array<{ metric: string; value: number }>> {
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error("Erro ao carregar o arquivo");

    const text = await response.text();
    const rawData = csvParse(text);

    if (!("timestamp" in rawData[0])) {
      throw new Error("Coluna 'timestamp' não encontrada no CSV.");
    }

    const ipgs: number[] = [];
    for (let i = 1; i < rawData.length && ipgs.length < 10000; i++) {
      const prev = parseFloat(rawData[i - 1]["timestamp"]);
      const curr = parseFloat(rawData[i]["timestamp"]);
      if (isNaN(prev) || isNaN(curr)) continue;

      let ipg = curr - prev;
      if (ipg > 1e10) ipg /= 1_000_000; // converte microssegundos se necessário
      if (ipg >= 0 && ipg <= maxIPG) ipgs.push(ipg);
    }

    const n = ipgs.length;
    if (n < 2) return [];

    const mean = ipgs.reduce((a, b) => a + b, 0) / n;
    const variance = ipgs.reduce((acc, val) => acc + (val - mean) ** 2, 0) / n;
    const stdDev = Math.sqrt(variance);

    const skewness =
      ipgs.reduce((acc, val) => acc + ((val - mean) / stdDev) ** 3, 0) / n;

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
