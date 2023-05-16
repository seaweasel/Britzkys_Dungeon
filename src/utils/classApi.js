export const getClassInfo = async () => {
  const response = await fetch('https://api.open5e.com/classes')
  const data = await response.json()
  return data.results
};

export const getClassLevels = async (classIndex) => {
  const response = await fetch(`https://www.dnd5eapi.co/api/classes/${classIndex}/levels`);
  const data = await response.json()
  return data
}