import { csvParse } from "d3-dsv";
import { url, maxPoints } from "../mainValues";

/**
 * Calcula a CDF do tamanho dos pacotes.
 * Retorna um array de { size, cdf } onde:
 * - size: tamanho do pacote (em bytes)
 * - cdf: proporção acumulada de pacotes até aquele tamanho
 */
export async function loadPacketSizeCDF(): Promise<Array<{ size: number; cdf: number }>> {
  try {
    const response = await fetch(url, { cache: "no-store" });;
    if (!response.ok) {
      throw new Error(`Erro ao carregar o arquivo: ${response.statusText}`);
    }

    const text = await response.text();
    const rawData = csvParse(text);

    if (!("length" in rawData[0])) {
      throw new Error("Coluna 'length' não encontrada no CSV.");
    }

    const sizes: number[] = [];

    for (const row of rawData) {
      if (sizes.length >= 10000) break;

      const size = parseInt(row["length"]);
      if (!isNaN(size)) sizes.push(size);
    }

    sizes.sort((a, b) => a - b);

    const total = sizes.length;
    const cdfData: { size: number; cdf: number }[] = [];

    for (let i = 0; i < total; i++) {
      const size = sizes[i];
      const cdf = parseFloat(((i + 1) / total).toFixed(4)); // 4 casas para suavidade
      cdfData.push({ size, cdf });
    }

    // Reduz se necessário
    if (cdfData.length > maxPoints) {
      const step = Math.floor(cdfData.length / maxPoints);
      return cdfData.filter((_, i) => i % step === 0).slice(0, maxPoints);
    }

    return cdfData;
  } catch (error) {
    console.error("Erro ao calcular CDF:", error);
    return [];
  }
}
