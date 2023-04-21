import React, { createContext, useState, useContext } from 'react'

//create the context for character items
const CharacterItemsContext = createContext()

export const CharacterItemsProvider = ({children}) => {
    const [characterItem, setCharacterItem] = useState({})
    const [characterItemId, setCharacterItemId] = useState(null)

    const addItem = (newItem) => {
        console.log('Adding Item:', newItem)
        setCharacterItem(prevCharacterItem => ({ ...prevCharacterItem, ...newItem}))
    }

    const removeItem = () => {
        setCharacterItem({})
        setCharacterItemId(null)
    }

    return (
        <CharacterItemsContext.Provider 
        value={{ 
            characterItem,
            characterItemId,
            setCharacterItem, 
            setCharacterItemId, 
            addItem, 
            removeItem  
            }}
        >
            {children}
        </CharacterItemsContext.Provider>
    )
}

export const useCharacterItems = () => useContext(CharacterItemsContext)