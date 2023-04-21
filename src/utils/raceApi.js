const baseUrl = 'https://www.dnd5eapi.co'

//asynchronous function to return all of the races from dnd5eapi
export const getRaces = async () => {
    //account for errors
    try {
            // variable for the get request. wait for the response before continuing
            const response = await fetch(`${baseUrl}/api/races`);
            // variable for the response in json. Wait for the data before continuing
            const data = await response.json();
            //extract the list of race names from the response:
            const raceNames = data.results.map((race) => ({
                name: race.name,// store the races name
                url: race.url // store the races endpoint
            }));
            return raceNames;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to get the race');
    }

};

//asynchronous function to get all the info needed about the given race
export const getRaceInfo = async (raceUrl) => {
    //account for errors
    try{
        //variable for the get request based on the race url
        const response = await fetch(`${baseUrl}${raceUrl}`);
        //variable for the response in json
        const data = await response.json();
        
        
        //create an object to store race info
        const raceInfo = {
            alignment: data.alignment,
            age: data.age,
            speed: data.speed,
            size: data.size_description,
            languageDesc: data.language_desc,
            abilityBonuses: data.ability_bonuses.map(bonus => ({
                name: bonus.ability_score.name,
                bonus: bonus.bonus
            })),
            traits: data.traits.map(trait => ({
                name: trait.name,
                url: trait.url
            })),
        };
        return raceInfo;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to get race info');
    }

};

export const getTraitInfo = async (traitUrl) => {
    try {
        const response = await fetch(`${baseUrl}${traitUrl}`)
        const data = await response.json()

        const traitInfo = {
            name: data.name,
            description: data.desc
        };
        return traitInfo
    } catch (error) {
        console.error(error)
        throw new Error('Failed to get trait info')
    }
}






