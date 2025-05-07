import { csvParse } from "d3-dsv";
import { url } from "../mainValues";

/**
 * Calcula a quantidade total de bytes transmitidos ao longo do tempo por janelas fixas.
 */
export async function loadTrafficOverTime(
  binSize = 1, // segundos
  maxPackets = 10000
): Promise<Array<{ time: number; bytes: number }>> {
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error("Erro ao carregar o CSV.");

    const text = await response.text();
    const rawData = csvParse(text);

    if (!("timestamp" in rawData[0]) || !("length" in rawData[0])) {
      throw new Error("CSV deve conter as colunas 'timestamp' e 'length'.");
    }

    const bins: Record<number, number> = {};
    let processed = 0;
    let baseTime: number | null = null;

    for (const row of rawData) {
      if (processed >= maxPackets) break;

      let ts = parseFloat(row["timestamp"]);
      const length = parseInt(row["length"]);

      if (isNaN(ts) || isNaN(length)) continue;

      if (ts > 1e10) ts = ts / 1_000_000; // microssegundos
      if (baseTime === null) baseTime = ts;

      const relTime = ts - baseTime;
      const bin = Math.floor(relTime / binSize);

      bins[bin] = (bins[bin] || 0) + length;
      processed++;
    }

    const result = Object.entries(bins)
      .map(([time, bytes]) => ({
        time: parseInt(time),
        bytes,
      }))
      .sort((a, b) => a.time - b.time);

    return result;
  } catch (error) {
    console.error("Erro ao calcular tráfego por tempo:", error);
    return [];
  }
}
