export async function loadMicrobursts(
  url: string,
  maxEntries = 10000
): Promise<Array<{ time: number; packets: number }>> {
  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) throw new Error('Erro ao carregar o JSON')
    const data = await res.json()
    const map: Record<string, number> = data.microbursts || {}
    return Object.entries(map)
      .slice(0, maxEntries)
      .map(([t, p]) => ({ time: Number(t), packets: Number(p) }))
  } catch (e) {
    console.error('Erro ao carregar microbursts:', e)
    return []
  }
}
