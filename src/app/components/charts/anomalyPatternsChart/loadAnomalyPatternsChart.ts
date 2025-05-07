import { csvParse } from "d3-dsv";
import { url } from "../mainValues";

/**
 * Gera a quantidade de pacotes por janela de tempo para observar padrões anômalos.
 */
export async function loadAnomalyPatterns(
  binSize = 1, // segundos
  maxPackets = 10000
): Promise<Array<{ time: number; packets: number }>> {
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error("Erro ao carregar o CSV.");

    const text = await response.text();
    const rawData = csvParse(text);

    if (!("timestamp" in rawData[0])) {
      throw new Error("CSV deve conter a coluna 'timestamp'.");
    }

    const bins: Record<number, number> = {};
    let processed = 0;
    let baseTime: number | null = null;

    for (const row of rawData) {
      if (processed >= maxPackets) break;

      let ts = parseFloat(row["timestamp"]);
      if (isNaN(ts)) continue;

      if (ts > 1e10) ts = ts / 1_000_000;
      if (baseTime === null) baseTime = ts;

      const relTime = ts - baseTime;
      const bin = Math.floor(relTime / binSize);

      bins[bin] = (bins[bin] || 0) + 1;
      processed++;
    }

    const result = Object.entries(bins)
      .map(([time, packets]) => ({
        time: parseInt(time),
        packets,
      }))
      .sort((a, b) => a.time - b.time);

    return result;
  } catch (error) {
    console.error("Erro ao detectar padrões anômalos:", error);
    return [];
  }
}
