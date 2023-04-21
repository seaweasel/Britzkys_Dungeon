import React from 'react'
import { useCharacter } from '../context/CharacterContext';
import { doc, setDoc, collection, updateDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { useAuth } from '../context/AuthContext'
import StoneButton from './StoneButton';
import { useNavigate } from 'react-router-dom';

export const SaveCharacterButton = ({ redirectTo }) => {
    const { authUser } = useAuth()
    const { character, characterId, removeCharacter } = useCharacter();
    const navigate = useNavigate()

    const userId = authUser.uid

   const handleSaveCharacter = async (authUser, character, characterId, removeCharacter, redirectTo, navigate) => {
      if(!authUser) return;
        try {
          console.log('Saving character:', character)
          //get user
          const userRef = doc(db, 'users', userId);

          if (characterId) {
            //Update the existing character document
            const characterRef = doc(userRef, 'characters', characterId)
            await updateDoc(characterRef, character)
          } else {
            //create the character document under the users characters subcollection
            const characterRef = doc(collection(userRef, 'characters'))
            await setDoc(characterRef, character)
          }

          if (redirectTo){
            navigate(redirectTo)
          }
          removeCharacter()

        } catch (error) {
            console.error('Error saving character:', error)
          }
          
      }

  return (
   <StoneButton
    sx={{
      padding:10
    }} 
   onClick={handleSaveCharacter}
   >
    Save Character
   </StoneButton>
  )
}
