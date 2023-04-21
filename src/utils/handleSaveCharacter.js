import React from 'react'
import { doc, setDoc, collection, updateDoc} from 'firebase/firestore'
import { db } from './firebase';


export const handleSaveCharacter = async (
    authUser,
    character,
    characterId,
    navigate
) => {
    if (!authUser) return;
    try {
      console.log('Saving character:', character);
      //get user
      const userId = authUser.uid;
      const userRef = doc(db, 'users', userId);
  
      if (characterId) {
        //Update the existing character document
        const characterRef = doc(userRef, 'characters', characterId);
        await updateDoc(characterRef, character);
      } else {
        //create the character document under the users characters subcollection
        const characterRef = doc(collection(userRef, 'characters'));
        await setDoc(characterRef, character);
      }
  
    // Redirect to the /viewcharacters page
    navigate('/viewcharacters');
    
    // Log the saved data
    console.log("Character data saved to the database:", character);
    } catch (error) {
      console.error('Error saving character:', error);
    }
  };
