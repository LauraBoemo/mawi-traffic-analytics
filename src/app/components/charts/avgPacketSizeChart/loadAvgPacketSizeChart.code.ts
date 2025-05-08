export const code = `
import { csvParse } from "d3-dsv";

export async function loadAvgPacketSizeByIP(
  url: string,
  maxPackets = 10000,
  minPackets = 1
): Promise<Array<{ ip: string; size: number }>> {
  /**
   * Calcula o tamanho médio dos pacotes enviados por IP de origem.
   * Processa no máximo maxPackets registros para evitar sobrecarga.
   * 
   * Retorna um array de objetos com o IP de origem e o tamanho médio dos pacotes
   * enviados por esse IP, considerando apenas IPs com pelo menos minPackets pacotes.
  */
  try {
    // Faz a requisição do arquivo CSV remoto
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(Erro ao carregar o arquivo:);
    }

    // Lê e converte o conteúdo CSV para uma lista de objetos
    const text = await response.text();
    const rawData = csvParse(text);

    // Objeto que acumula o total de bytes e contagem de pacotes por IP
    const ipStats: Record<string, { total: number; count: number }> = {};
    let processed = 0;

    // Processa os pacotes até atingir o limite de maxPackets
    for (const row of rawData) {
      if (processed >= maxPackets) break;

      const ip = row["src_ip"]; // IP de origem
      const length = parseInt(row["length"]); // Tamanho do pacote

      // Ignora registros incompletos ou inválidos
      if (!ip || isNaN(length)) continue;

      // Inicializa o registro para o IP, se necessário
      if (!ipStats[ip]) {
        ipStats[ip] = { total: 0, count: 0 };
      }

      // Soma o tamanho do pacote e incrementa o contador
      ipStats[ip].total += length;
      ipStats[ip].count += 1;
      processed++;
    }

    // Calcula a média para cada IP que tenha pelo menos minPackets pacotes
    const result = Object.entries(ipStats)
      .filter(([, stats]) => stats.count >= minPackets)
      .map(([ip, stats]) => ({
        ip,
        size: parseFloat((stats.total / stats.count).toFixed(2)), // média com 2 casas decimais
      }));

    return result;
  } catch (error) {
    // Em caso de erro, loga no console e retorna um array vazio
    console.error("Erro ao calcular tamanho médio por IP:", error);
    return [];
  }
}
`;
