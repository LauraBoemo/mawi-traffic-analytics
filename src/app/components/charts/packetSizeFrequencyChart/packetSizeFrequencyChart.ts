import { csvParse } from "d3-dsv";
import { url } from "../mainValues";

/**
 * Calcula a frequência de ocorrência de cada tamanho de pacote (ou bucket).
 */
export async function loadPacketSizeFrequency(
  maxPackets = 10000,
  binSize = 64 // bucket size em bytes
): Promise<Array<{ size: number; frequency: number }>> {
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error("Erro ao carregar o CSV.");

    const text = await response.text();
    const rawData = csvParse(text);

    if (!("length" in rawData[0])) {
      throw new Error("CSV deve conter a coluna 'length'.");
    }

    const freqMap: Record<number, number> = {};
    let processed = 0;

    for (const row of rawData) {
      if (processed >= maxPackets) break;

      const size = parseInt(row["length"]);
      if (isNaN(size)) continue;

      // Agrupamento por faixas de tamanho (bins)
      const bin = Math.round(size / binSize) * binSize;

      freqMap[bin] = (freqMap[bin] || 0) + 1;
      processed++;
    }

    return Object.entries(freqMap)
      .map(([size, frequency]) => ({
        size: parseInt(size),
        frequency,
      }))
      .sort((a, b) => a.size - b.size);
  } catch (error) {
    console.error("Erro ao calcular frequência de tamanho de pacotes:", error);
    return [];
  }
}
