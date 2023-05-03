import React, { useState, useContext } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { TextField, Box } from '@mui/material';
import { AddButton } from '../components/AddButton'
import { useCharacter } from '../context/CharacterContext';
import { useAuth } from '../context/AuthContext';
import { ResponsiveTypography } from '../components/ResponsiveTypography';
import { SnackbarContext } from '../context/SnackbarContext';

export const CharacterName = () => {
    const [characterName, setCharacterName] = useState('')
    const { authUser } = useAuth()
    const { openSnackbar } = useContext(SnackbarContext)

    const handleCharacterNameChange = (event) => {
        setCharacterName( event.target.value)
      }
      const { updateCharacter, character } = useCharacter()
    
    const handleAddName = async () => {
    //check if the character name is already taken for the current user
    const charactersRef = collection(db, 'users', authUser.uid, 'characters')
    const q = query(charactersRef, where('userId', '==', authUser.uid), where('name', '==', characterName))
  
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
      console.log('Character name already taken')
      alert('this character name is already taken. Please choose another one.')
      return
    }
    //if the name is not taken, update the character context
    console.log('Updating Character Context')
    updateCharacter({name: characterName});
    openSnackbar(`Your characters name is ${characterName}`, 'success')
    setCharacterName('')
}
  return (
    <>
        <Box
            sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
            }} 
        >
            <ResponsiveTypography type='title'>Enter Character Name</ResponsiveTypography>
        </Box>
        <Box
            sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems:'center',
            gap: '4em'
            }}
        >
            <TextField
                label="Character Name"
                required
                name="characterName"
                id="characterName"
                autoComplete="character-name"
                onChange={handleCharacterNameChange}
                value={characterName}
            />
            <AddButton onClick={handleAddName} >
                Add Name
            </AddButton>
        </Box>
    </>
  )
}
