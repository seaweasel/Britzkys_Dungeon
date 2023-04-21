const baseUrl = 'https://www.dnd5eapi.co'

export const getAbilityScores = async () => {
    try{
        const response = await fetch(`${baseUrl}/api/ability-scores`)
        const data = await response.json()

        const abilityScores = await Promise.all(
            data.results.map(async (abilityScore) => {
                const response = await fetch(`${baseUrl}${abilityScore.url}`)
                const info = await response.json()
                return {
                    name: abilityScore.name,
                    url: abilityScore.url,
                    fullName: info.full_name,
                    description: info.desc.join('\n'),
                    skills: info.skills.map((skill) => ({
                        name: skill.name,
                        url: skill.url
                    }))
                }
            })
        )
        return abilityScores 
    } catch (error) {
        console.error(error)
        throw new Error('Failed to fetch ability scores')
    }
};
