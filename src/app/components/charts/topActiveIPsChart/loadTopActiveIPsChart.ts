import { csvParse } from "d3-dsv";
import { url } from "../mainValues";

/**
 * Retorna os 10 IPs de origem que mais enviaram pacotes.
 */
export async function loadTopActiveIPs(
  maxPackets = 10000,
  topN = 10
): Promise<Array<{ ip: string; packets: number }>> {
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error("Erro ao carregar o CSV.");

    const text = await response.text();
    const rawData = csvParse(text);

    if (!("src_ip" in rawData[0])) {
      throw new Error("CSV deve conter a coluna 'src_ip'.");
    }

    const ipCounts: Record<string, number> = {};
    let processed = 0;

    for (const row of rawData) {
      if (processed >= maxPackets) break;

      const ip = row["src_ip"];
      if (!ip) continue;

      ipCounts[ip] = (ipCounts[ip] || 0) + 1;
      processed++;
    }

    return Object.entries(ipCounts)
      .map(([ip, packets]) => ({ ip, packets }))
      .sort((a, b) => b.packets - a.packets)
      .slice(0, topN);
  } catch (error) {
    console.error("Erro ao calcular IPs mais ativos:", error);
    return [];
  }
}
