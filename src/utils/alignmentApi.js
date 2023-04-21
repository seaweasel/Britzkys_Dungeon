const baseUrl = 'https://www.dnd5eapi.co'

export const getAlignment = async () => {
    try {
        const response = await fetch(`${baseUrl}/api/alignments`)
        const data = await response.json()

        const alignments = Promise.all(
            data.results.map( async (alignment) => {
                const response = await fetch(`${baseUrl}${alignment.url}`)
                const info = await response.json()
                return {
                    name: alignment.name,
                    url: alignment.url,
                    description: info.desc
                }
            }) 
        ) 

      return alignments
    } catch (error) {
        console.error(error)
        throw new Error('Failed to get the alignments')
    }
}