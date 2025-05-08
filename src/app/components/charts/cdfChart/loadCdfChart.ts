import { csvParse } from "d3-dsv";
import { url, maxPoints } from "../mainValues";

export async function loadPacketSizeCDF(): Promise<Array<{ size: number; cdf: number }>> {
  /**
   * Calcula a Função de Distribuição Acumulada (CDF) do tamanho dos pacotes.
   * A CDF representa a proporção acumulada de pacotes até um determinado tamanho.
   * 
   * @returns Um array de objetos { size, cdf }, onde:
   *  - size: tamanho do pacote em bytes
   *  - cdf: proporção acumulada até esse tamanho (entre 0 e 1)
  */
  try {
    // Requisição do CSV contendo os pacotes de rede
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Erro ao carregar o arquivo: ${response.statusText}`);
    }

    // Converte o CSV em texto e depois em array de objetos (linhas)
    const text = await response.text();
    const rawData = csvParse(text);

    // Verifica se a coluna 'length' está presente
    if (!("length" in rawData[0])) {
      throw new Error("Coluna 'length' não encontrada no CSV.");
    }

    const sizes: number[] = []; // Lista dos tamanhos dos pacotes

    // Extrai os tamanhos de pacotes (até 10.000 amostras válidas)
    for (const row of rawData) {
      if (sizes.length >= 10000) break;

      const size = parseInt(row["length"]);
      if (!isNaN(size)) sizes.push(size); // Ignora valores inválidos
    }

    // Ordena os tamanhos em ordem crescente
    sizes.sort((a, b) => a - b);

    const total = sizes.length; // Total de pacotes considerados
    const cdfData: { size: number; cdf: number }[] = [];

    // Calcula a CDF: posição / total, com 4 casas decimais
    for (let i = 0; i < total; i++) {
      const size = sizes[i];
      const cdf = parseFloat(((i + 1) / total).toFixed(4));
      cdfData.push({ size, cdf });
    }

    // Reduz a densidade de pontos, se necessário, para evitar sobrecarga visual
    if (cdfData.length > maxPoints) {
      const step = Math.floor(cdfData.length / maxPoints);
      return cdfData.filter((_, i) => i % step === 0).slice(0, maxPoints);
    }

    return cdfData;
  } catch (error) {
    // Em caso de erro, exibe mensagem e retorna lista vazia
    console.error("Erro ao calcular CDF:", error);
    return [];
  }
}
