import React, { createContext, useState, useContext, useEffect } from 'react'
import { useCharacterData } from '../hooks/useCharacterData'
import { useAuth } from './AuthContext'

const CharacterContext = createContext()

export const CharacterProvider = ({children}) => {
    const { authUser } = useAuth()
    const userId = authUser?.uid
    const [character, setCharacter] = useState({})
    const [characterId, setCharacterId] = useState(null)
    const [ baseAbilityScores, setBaseAbilityScores] = useState({})


    const {characterData, loading } = useCharacterData(userId, characterId)

    useEffect(() => {
        if (!loading && characterData) {
            setCharacter(characterData)
        }
    }, [characterData, loading])

    const updateCharacter = (newData) => {
        console.log('Updating character with data:', newData)
        setCharacter(prevCharacter =>({ ...prevCharacter, ...newData }))
        if (newData.baseAbilityScores) {
            setBaseAbilityScores(newData.baseAbilityScores)
        }
    }

    const removeCharacter = () => {
        setCharacter({})
        setCharacterId(null)
      }

      useEffect(() => {
        if (characterId === null) {
          setCharacter({})
          setBaseAbilityScores({})
        }
      }, [characterId])
  
    return (
        <CharacterContext.Provider value={{ character, characterId, setCharacterId, updateCharacter, removeCharacter }}>
            {children}
        </CharacterContext.Provider>
  )
}

export const useCharacter = () => useContext(CharacterContext)