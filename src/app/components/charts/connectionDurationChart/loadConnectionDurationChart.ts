export async function loadConnectionDurations(url: string): Promise<Array<{ id: string; duration: number }>> {
  try {
    const response = await fetch(url, { cache: "no-store" })
    if (!response.ok) throw new Error("Erro ao carregar o JSON")
    const data = await response.json()
    const map: Record<string, number> = data.duracao_conexoes || {}
    return Object.entries(map).map(([id, duration]) => ({ id, duration: Number(duration) }))
  } catch (error) {
    console.error("Erro ao carregar duração das conexões:", error)
    return []
  }
}
