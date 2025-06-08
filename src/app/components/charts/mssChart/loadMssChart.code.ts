export const code = `
export async function loadMssPerConnection(url: string): Promise<Array<{ id: string; mss: number }>> {
  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) throw new Error('Erro ao carregar o JSON')
    const data = await res.json()
    const map: Record<string, number> = data.mss_por_conexao || {}
    return Object.entries(map).map(([id, mss]) => ({ id, mss: Number(mss) }))
  } catch (e) {
    console.error('Erro ao carregar MSS:', e)
    return []
  }
}
`
