import { csvParse } from "d3-dsv";
import { url } from "../mainValues";

export async function loadHorizontalScanData(
  maxPackets = 10000
): Promise<Array<{ ip: string; destinations: number }>> {
  /**
   * Detecta IPs que se comunicam com muitos destinos únicos — típico de horizontal scans,
   * onde um atacante tenta acessar várias máquinas diferentes.
   * 
   * @param maxPackets - Número máximo de pacotes a serem processados.
   * @returns Um array de objetos { ip, destinations }, onde:
   *  - ip: endereço IP de origem
   *  - destinations: número de IPs de destino únicos com os quais esse IP se comunicou
  */
  try {
    // Requisição para buscar o conteúdo CSV
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Erro ao carregar o arquivo: ${response.statusText}`);
    }

    // Converte o CSV para texto e depois em array de objetos
    const text = await response.text();
    const rawData = csvParse(text);

    // Verifica se as colunas necessárias existem
    if (!("src_ip" in rawData[0]) || !("dst_ip" in rawData[0])) {
      throw new Error("CSV deve conter 'src_ip' e 'dst_ip'.");
    }

    // Mapeia cada IP de origem para um conjunto de destinos únicos
    const scanMap: Record<string, Set<string>> = {};
    let processed = 0;

    for (const row of rawData) {
      if (processed >= maxPackets) break;

      const src = row["src_ip"];
      const dst = row["dst_ip"];
      if (!src || !dst) continue; // Ignora linhas com dados incompletos

      // Cria um novo conjunto para o IP se ele ainda não existir
      if (!scanMap[src]) {
        scanMap[src] = new Set();
      }

      // Adiciona o IP de destino ao conjunto do IP de origem
      scanMap[src].add(dst);
      processed++;
    }

    // Converte os conjuntos em contagens e ordena por maior número de destinos
    const result = Object.entries(scanMap)
      .map(([ip, dstSet]) => ({
        ip,
        destinations: dstSet.size, // número de destinos únicos
      }))
      .sort((a, b) => b.destinations - a.destinations); // ordena do maior para o menor

    return result;
  } catch (error) {
    // Em caso de erro, loga e retorna lista vazia
    console.error("Erro ao detectar horizontal scan:", error);
    return [];
  }
}
