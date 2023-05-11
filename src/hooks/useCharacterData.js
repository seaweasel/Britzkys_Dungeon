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

                    //set up a real-time listener
                    const unsubscribe = onSnapshot(
                        characterRef,
                        (docSnapshot) => {
                            setLoading(false)
                            setCharacterData(docSnapshot.data())
                        },
                        (error) => {
                            setLoading(false)
                            setError(error)
                        }
                    )

                    //clean up listener on component unmount
                    return () => {
                        unsubscribe()
                    }
                } catch (error) {
                    console.error('Error fetching character data:', error)
                    setError(error)
                } finally {
                    setLoading(false)
                }
            } else {
            //fetch all characters
            const userRef = doc(db, 'users', userId)
            const characterQuery = query(
                collection(userRef, 'characters'),
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
