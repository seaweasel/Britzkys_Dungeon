const baseUrl = 'https://www.dnd5eapi.co'

export const getSkills = async () => {
    try {
        const response = await fetch(`${baseUrl}/api/skills`)
        const data = await response.json();

        const skillUrls = data.results.map((skill) => ({
            name: skill.name,
            url: skill.url 
        }));
        return skillUrls

    }catch (error) {
        console.error(error);
        throw new Error('Failed to get the skills')
    }
}

//get skill info
export const getSkillInfo = async (skillUrl) => {
    try {
        const response = await fetch (`${baseUrl}${skillUrl}`)
        const data = await response.json() 
        
   
        
        const skillInfo = {
            name: data.name,
            description: data.desc[0],
            abilityScore: data.ability_score.name 
        }
        return skillInfo
    } catch (error) {
        console.error(error)
        throw new Error('Failed to get skill info')
    }


}


