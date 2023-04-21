import React from 'react'
import StoneButton from './StoneButton'
import { useAuth } from '../context/AuthContext'
import { db } from '../utils/firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { useCharacter } from '../context/CharacterContext'

export const UpdateCharacterButton = ({updatedCharacter, redirectTo, onCharacterUpdate}) => {
    const {authUser} = useAuth()
    const { character, updateCharacter } = useCharacter()
    const navigate = useNavigate()
    const userId = authUser.uid

    const handleUpdateCharacter = async () => {
        console.log("handleUpdateCharacter called"); // Add this log
        if (!authUser){
            console.log("Missing authUser");
            return
        } 


    try {
        const characterToUpdate = updatedCharacter || character
        console.log('Updating character:', characterToUpdate)
        console.log('Initial UserId: ', userId)
        
        //get user
        const userRef = doc(db, 'users', userId);
        console.log('UserId: ', userRef)
        
        //Update the existing character document
        const characterRef = doc(userRef, "characters", characterToUpdate.id);
        console.log('CharacterID: ', characterRef)

        await updateDoc(characterRef, {name: characterToUpdate.name})
        console.log("Character updated")
        

        //update the local character context
        await updateCharacter(characterToUpdate);

        if (onCharacterUpdate) {
            console.log("Calling onCharacterUpdate");
            onCharacterUpdate()
        } else {
            console.log("onCharacterUpdate is not defined"); // Add this log

        }

    }catch (error) {
        console.error( 'Error updating character:', error)
        }
    }
    
  return (
    <StoneButton onClick={handleUpdateCharacter}>Update Character</StoneButton>
  )  
}

