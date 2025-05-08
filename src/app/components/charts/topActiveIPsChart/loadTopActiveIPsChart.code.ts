export const code = `
import { csvParse } from "d3-dsv";

export async function loadTopActiveIPs(
  url: string,
  maxPackets = 10000,
  topN = 10
): Promise<Array<{ ip: string; packets: number }>> {
  /**
   * Identifica os IPs de origem mais ativos na rede com base na quantidade de pacotes enviados.
   * 
   * @param maxPackets - Número máximo de pacotes a serem processados.
   * @param topN - Quantidade de IPs mais ativos a serem retornados.
   * @returns Um array de objetos { ip, packets }, ordenado do mais ativo para o menos.
  */
  try {
    // Requisição do arquivo CSV
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error("Erro ao carregar o CSV.");

    // Converte o conteúdo do CSV em objetos
    const text = await response.text();
    const rawData = csvParse(text);

    // Verifica se a coluna 'src_ip' existe
    if (!("src_ip" in rawData[0])) {
      throw new Error("CSV deve conter a coluna 'src_ip'.");
    }

    const ipCounts: Record<string, number> = {}; // Mapeia IPs à contagem de pacotes enviados
    let processed = 0;

    // Processa até maxPackets pacotes, contando quantos cada IP de origem enviou
    for (const row of rawData) {
      if (processed >= maxPackets) break;

      const ip = row["src_ip"];
      if (!ip) continue;

      ipCounts[ip] = (ipCounts[ip] || 0) + 1;
      processed++;
    }

    // Converte o mapeamento em array, ordena por contagem e retorna os topN IPs
    return Object.entries(ipCounts)
      .map(([ip, packets]) => ({ ip, packets }))
      .sort((a, b) => b.packets - a.packets)
      .slice(0, topN);
  } catch (error) {
    // Em caso de erro, loga e retorna array vazio
    console.error("Erro ao calcular IPs mais ativos:", error);
    return [];
  }
}
`;
