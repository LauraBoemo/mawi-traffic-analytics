export const code = `
export async function loadElephantFlows(
  url: string,
  maxEntries = 10000
): Promise<Array<{ id: string; bytes: number }>> {
  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) throw new Error('Erro ao carregar o JSON')
    const data = await res.json()
    const map: Record<string, number> = data.fluxos_elefantes || {}
    return Object.entries(map)
      .slice(0, maxEntries)
      .map(([id, bytes]) => ({ id, bytes: Number(bytes) }))
  } catch (e) {
    console.error('Erro ao carregar fluxos elefantes:', e)
    return []
  }
}
`
