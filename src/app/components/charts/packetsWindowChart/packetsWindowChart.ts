import { csvParse } from "d3-dsv";
import { url, maxPoints } from "../mainValues";

/**
 * Agrupa pacotes em janelas de tempo fixas e conta quantos pacotes caem em cada janela.
 * Retorna dados formatados para visualização em BarChart.
 */
export async function loadPacketsPerWindow(
  binSize = 10 // segundos por janela
): Promise<Array<{ window: string; count: number }>> {
  try {
    const response = await fetch(url, { cache: "no-store" });;
    if (!response.ok) {
      throw new Error(`Erro ao carregar o arquivo: ${response.statusText}`);
    }

    const text = await response.text();
    const rawData = csvParse(text);

    if (!("timestamp" in rawData[0])) {
      throw new Error("Coluna 'timestamp' não encontrada no CSV.");
    }

    const bins: Record<number, number> = {};
    let processed = 0;
    let baseTime: number | null = null;

    for (const row of rawData) {
      if (processed >= 10000) break;

      let ts = parseFloat(row["timestamp"]);
      if (isNaN(ts)) continue;

      if (ts > 1e10) ts = ts / 1_000_000;

      if (baseTime === null) baseTime = ts;
      const relativeTime = ts - baseTime;

      const binIndex = Math.floor(relativeTime / binSize);
      bins[binIndex] = (bins[binIndex] || 0) + 1;

      processed++;
    }

    const result = Object.entries(bins)
      .map(([binStr, count]) => {
        const bin = parseInt(binStr, 10);
        const start = bin * binSize;
        const end = (bin + 1) * binSize;

        const format = (s: number) => {
          const min = Math.floor(s / 60)
            .toString()
            .padStart(2, "0");
          const sec = Math.floor(s % 60)
            .toString()
            .padStart(2, "0");
          return `${min}:${sec}`;
        };

        return {
          window: `${format(start)}-${format(end)}`,
          count,
        };
      })
      .sort((a, b) => a.window.localeCompare(b.window));

    // Reduz se necessário
    if (result.length > maxPoints) {
      const step = Math.floor(result.length / maxPoints);
      return result.filter((_, i) => i % step === 0).slice(0, maxPoints);
    }

    return result;
  } catch (error) {
    console.error("Erro ao agrupar pacotes por janela de tempo:", error);
    return [];
  }
}
