export const code = `
export async function loadThroughput(url: string): Promise<Array<{ id: string; value: number }>> {
  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) throw new Error('Erro ao carregar o JSON')
    const data = await res.json()
    const map: Record<string, number> = data.throughput_por_conexao || {}
    return Object.entries(map).map(([id, value]) => ({ id, value: Number(value) }))
  } catch (e) {
    console.error('Erro ao carregar throughput:', e)
    return []
  }
}
`
