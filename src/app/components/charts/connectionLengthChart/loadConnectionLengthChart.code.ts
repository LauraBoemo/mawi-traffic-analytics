export const code = `
export async function loadConnectionLengthComparison(
  url: string,
  maxEntries = 10000,
  threshold = 10
): Promise<Array<{ type: string; count: number }>> {
  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) throw new Error('Erro ao carregar o JSON')
    const data = await res.json()
    const map: Record<string, number> = data.duracao_conexoes || {}
  let short = 0
  let long = 0
  Object.values(map)
    .slice(0, maxEntries)
    .forEach(v => {
      if (Number(v) <= threshold) {
        short++
      } else {
        long++
      }
    })
    return [
      { type: 'Curtas', count: short },
      { type: 'Longas', count: long }
    ]
  } catch (e) {
    console.error('Erro ao carregar duracao de conexoes:', e)
    return []
  }
}
`
