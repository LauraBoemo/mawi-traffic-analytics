export const code = `
export async function loadSegmentSizeDistribution(
  url: string,
  maxEntries = 10000
): Promise<Array<{ size: number; count: number }>> {
  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) throw new Error('Erro ao carregar o JSON')
    const data = await res.json()
    const arr: number[] = data.tamanhos_segmentos || []
    const map: Record<number, number> = {}
    for (const s of arr) {
      const v = Number(s)
      map[v] = (map[v] || 0) + 1
    }
    return Object.entries(map)
      .slice(0, maxEntries)
      .map(([size, count]) => ({ size: Number(size), count }))
  } catch (e) {
    console.error('Erro ao carregar distribuição de tamanhos:', e)
    return []
  }
}
`
