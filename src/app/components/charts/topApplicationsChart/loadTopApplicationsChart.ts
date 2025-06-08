export async function loadTopApplications(
  url: string,
  maxEntries = 10
): Promise<Array<{ port: string; count: number }>> {
  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) throw new Error('Erro ao carregar o JSON')
    const data = await res.json()
    const map: Record<string, number> = data.top_aplicacoes_portas || {}
    const entries = Object.entries(map)
      .map(([port, count]) => ({ port, count: Number(count) }))
      .sort((a, b) => b.count - a.count)
    return entries.slice(0, maxEntries)
  } catch (e) {
    console.error('Erro ao carregar top aplicações:', e)
    return []
  }
}
