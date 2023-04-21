import React, { useEffect, useState } from 'react'
import { doc, getDoc, collection, query, onSnapshot } from 'firebase/firestore'
import { db } from '../utils/firebase'

export const useCharacterData = (userId, characterId = null) => {
    const [characterData, setCharacterData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)


    useEffect(() => {
        if (!userId) return

        const fetchCharacterData = async () => {
            setLoading(true);
            
            if (characterId) {
                try {
                    //refrence the character document
                    const characterRef = doc(db, "users", userId, "characters", characterId)
    
                    //fetch character data
                    const characterSnap = await getDoc(characterRef)
    
                    if (characterSnap.exists()) {
                        setCharacterData(characterSnap.data())
                    } else {
                        console.log( "No character found with the provided ID")
                        setError(new Error("No character found with the provided ID"))
                    }
                } catch (error) {
                    console.error('Error fetching character data:', error)
                    setError(error)
                } finally {
                    setLoading(false)
                }
            } else {
            //fetch all characters
            const characterQuery = query(
                collection(db, 'users', userId, 'characters'),
            );
    
            const unsubscribe = onSnapshot(
                characterQuery,
                (querySnapshot) => {
                    const characters = [];
                    querySnapshot.forEach((doc) => {
                        console.log('Document data:', doc.data()); // Add this line
                        characters.push({ id: doc.id, ...doc.data() })
                    })
                    setCharacterData(characters)
                    setLoading(false)
                },
                (error) => {
                    setError(error)
                    setLoading(false)
                }
            )
            return () => unsubscribe()
        }

        const refetch = () => {
            fetchCharacterData()
        }
        
    }
            fetchCharacterData()
        }, [userId, characterId])
    
        return { characterData, loading, error }
}
