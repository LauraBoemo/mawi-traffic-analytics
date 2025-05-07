import { csvParse } from "d3-dsv";
import { url, maxPoints } from "../mainValues";

/**
 * Gera a distribuição de pacotes por janelas de tempo (burstness),
 * útil para visualizar picos de tráfego.
 */
export async function loadBurstnessData(
  binSize = 1 // segundos por janela
): Promise<Array<{ time: number; packets: number }>> {
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

    const timeBins: Record<number, number> = {};
    let processed = 0;
    let baseTime = null;

    for (const row of rawData) {
      if (processed >= 10000) break;

      let ts = parseFloat(row["timestamp"]);
      if (isNaN(ts)) continue;

      // Corrige unidades (suporta microssegundos)
      if (ts > 1e10) ts = ts / 1_000_000;

      if (baseTime === null) baseTime = ts;
      const relativeTime = ts - baseTime;

      const bin = Math.floor(relativeTime / binSize);
      timeBins[bin] = (timeBins[bin] || 0) + 1;

      processed++;
    }

    const data = Object.entries(timeBins)
      .map(([bin, count]) => ({
        time: parseInt(bin),
        packets: count,
      }))
      .sort((a, b) => a.time - b.time);

    // Redução opcional
    if (data.length > maxPoints) {
      const step = Math.floor(data.length / maxPoints);
      return data.filter((_, i) => i % step === 0).slice(0, maxPoints);
    }

    return data;
  } catch (error) {
    console.error("Erro ao processar burstness:", error);
    return [];
  }
}
