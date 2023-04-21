import React from 'react';
import { useCharacter } from './CharacterContext';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { useAuth } from '../components/AuthContext';
import StoneButton from './StoneButton';

export const DeleteCharacterButton = ({characterId}) => {
    const { authUser } = useAuth()
    const { character, updateCharacter } = useCharacter()
    const userId = authUser.uid;

    const handleDeleteCharacter = async () => {
        if (!characterId) {
            console.log('No character selected')
            return
        }
        try {
            console.log('Deleting character:', characterId)
            const characterRef = doc(db, 'users', userId, 'characters', characterId)
            await deleteDoc(characterRef)

            updateCharacter({})

            console.log('Character deleted:', characterId)
        } catch (error) {
            console.error('Error deleting character:', error)
        }
    }

  return (
    <StoneButton onClick={handleDeleteCharacter}>
      Delete Character
    </StoneButton>  )
}
