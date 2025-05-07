import { csvParse } from "d3-dsv";
import { url } from "../mainValues";

/**
 * Detecta IPs que se comunicam com muitos destinos únicos (horizontal scan).
 * Retorna array de objetos { ip, destinations }.
 */
export async function loadHorizontalScanData(
  maxPackets = 10000
): Promise<Array<{ ip: string; destinations: number }>> {
  try {
    const response = await fetch(url, { cache: "no-store" });;
    if (!response.ok) {
      throw new Error(`Erro ao carregar o arquivo: ${response.statusText}`);
    }

    const text = await response.text();
    const rawData = csvParse(text);

    if (!("src_ip" in rawData[0]) || !("dst_ip" in rawData[0])) {
      throw new Error("CSV deve conter 'src_ip' e 'dst_ip'.");
    }

    const scanMap: Record<string, Set<string>> = {};
    let processed = 0;

    for (const row of rawData) {
      if (processed >= maxPackets) break;

      const src = row["src_ip"];
      const dst = row["dst_ip"];
      if (!src || !dst) continue;

      if (!scanMap[src]) {
        scanMap[src] = new Set();
      }

      scanMap[src].add(dst);
      processed++;
    }

    const result = Object.entries(scanMap)
      .map(([ip, dstSet]) => ({
        ip,
        destinations: dstSet.size,
      }))
      .sort((a, b) => b.destinations - a.destinations); // ordena por maior escaneamento

    return result;
  } catch (error) {
    console.error("Erro ao detectar horizontal scan:", error);
    return [];
  }
}
