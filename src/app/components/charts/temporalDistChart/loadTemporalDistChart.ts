import { csvParse } from "d3-dsv";
import { binSize, maxPackets, url } from "../mainValues";

/**
 * Agrupa pacotes ao longo do tempo por IP de origem,
 * normalizando os timestamps (micro ou segundos) e rebasing para iniciar do zero.
 */
export async function loadTemporalDistributionByIP(): Promise<Array<Record<string, number>>> {
  try {
    const response = await fetch(url, { cache: "no-store" });;
    if (!response.ok) {
      throw new Error(`Erro ao carregar o arquivo: ${response.statusText}`);
    }

    const text = await response.text();
    const rawData = csvParse(text);

    if (!("timestamp" in rawData[0]) || !("src_ip" in rawData[0])) {
      throw new Error("CSV deve conter 'timestamp' e 'src_ip'.");
    }

    const bins: Record<number, Record<string, number>> = {};
    let processed = 0;
    let baseTime = null;

    for (const row of rawData) {
      if (processed >= maxPackets) break;

      let ts = parseFloat(row["timestamp"]);
      const ip = row["src_ip"];
      if (!ip || isNaN(ts)) continue;

      // Detecta timestamp muito grande (ex: microssegundos) e normaliza
      if (ts > 1e10) ts = ts / 1_000_000;

      // Rebase do tempo
      if (baseTime === null) baseTime = ts;
      const relativeTime = ts - baseTime;

      const timeBin = Math.floor(relativeTime / binSize);

      if (!bins[timeBin]) {
        bins[timeBin] = { time: timeBin };
      }

      bins[timeBin][ip] = (bins[timeBin][ip] || 0) + 1;
      processed++;
    }

    return Object.values(bins).sort((a, b) => a.time - b.time);
  } catch (error) {
    console.error("Erro ao calcular distribuição temporal:", error);
    return [];
  }
}
