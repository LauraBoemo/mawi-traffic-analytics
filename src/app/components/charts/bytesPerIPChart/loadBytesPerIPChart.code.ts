export const code = `
import { csvParse } from "d3-dsv";

export async function loadBytesPerIP(
  url: string,
  maxPackets = 10000,
  topN = 10
): Promise<Array<{ ip: string; bytes: number }>> {
  /**
   * Soma o total de bytes transmitidos por IP de origem.
   * Processa até maxPackets pacotes e retorna os topN IPs que mais transmitiram dados.
   * 
   * @param maxPackets - Número máximo de pacotes a serem processados do CSV.
   * @param topN - Número de IPs com maior volume de dados a serem retornados.
   * @returns Array de objetos contendo IP e total de bytes transmitidos.
  */
  try {
    // Requisição do arquivo CSV
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error("Erro ao carregar o arquivo.");

    // Converte o conteúdo do CSV em texto e depois em array de objetos
    const text = await response.text();
    const rawData = csvParse(text);

    // Verifica se as colunas necessárias existem
    if (!("src_ip" in rawData[0]) || !("length" in rawData[0])) {
      throw new Error("CSV deve conter as colunas 'src_ip' e 'length'.");
    }

    const byteMap: Record<string, number> = {}; // Mapeia IPs ao total de bytes transmitidos
    let processed = 0;

    // Itera sobre os pacotes até atingir o limite
    for (const row of rawData) {
      if (processed >= maxPackets) break;

      const ip = row["src_ip"]; // IP de origem
      const length = parseInt(row["length"]); // Tamanho do pacote em bytes
      if (!ip || isNaN(length)) continue; // Ignora entradas inválidas

      // Soma os bytes transmitidos por IP
      byteMap[ip] = (byteMap[ip] || 0) + length;
      processed++;
    }

    // Transforma o mapeamento em array, ordena por volume de bytes e retorna os topN IPs
    return Object.entries(byteMap)
      .map(([ip, bytes]) => ({ ip, bytes }))
      .sort((a, b) => b.bytes - a.bytes)
      .slice(0, topN);
  } catch (error) {
    // Em caso de erro, exibe no console e retorna array vazio
    console.error("Erro ao calcular volume de bytes por IP:", error);
    return [];
  }
}
`;
