import { csvParse } from "d3-dsv";
import { url } from "../mainValues";

/**
 * Calcula a entropia da distribuição de IPs de origem por janela de tempo.
 */
export async function loadIPEntropyByWindow(
  binSize = 10, // segundos
  maxPackets = 10000
): Promise<Array<{ window: string; entropy: number }>> {
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error("Erro ao carregar o arquivo.");

    const text = await response.text();
    const rawData = csvParse(text);

    if (!("timestamp" in rawData[0]) || !("src_ip" in rawData[0])) {
      throw new Error("CSV deve conter 'timestamp' e 'src_ip'.");
    }

    const bins: Record<number, Record<string, number>> = {};
    let processed = 0;
    let baseTime: number | null = null;

    for (const row of rawData) {
      if (processed >= maxPackets) break;

      let ts = parseFloat(row["timestamp"]);
      const ip = row["src_ip"];
      if (!ip || isNaN(ts)) continue;

      if (ts > 1e10) ts = ts / 1_000_000; // microssegundos
      if (baseTime === null) baseTime = ts;

      const relTime = ts - baseTime;
      const bin = Math.floor(relTime / binSize);

      if (!bins[bin]) bins[bin] = {};
      bins[bin][ip] = (bins[bin][ip] || 0) + 1;

      processed++;
    }

    const formatWindow = (bin: number) => {
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
      return `${format(start)}-${format(end)}`;
    };

    const entropyData = Object.entries(bins).map(([binStr, ipCounts]) => {
      const bin = parseInt(binStr, 10);
      const total = Object.values(ipCounts).reduce((sum, count) => sum + count, 0);

      const entropy = Object.values(ipCounts).reduce((sum, count) => {
        const p = count / total;
        return sum - p * Math.log2(p);
      }, 0);

      return {
        window: formatWindow(bin),
        entropy: parseFloat(entropy.toFixed(3)),
      };
    });

    return entropyData.sort((a, b) => a.window.localeCompare(b.window));
  } catch (error) {
    console.error("Erro ao calcular entropia de IPs:", error);
    return [];
  }
}
