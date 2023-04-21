import React, {useState} from 'react'
import { useCharacter } from '../context/CharacterContext'
import { TextField, Box} from '@mui/material';
import { useNavigate } from 'react-router-dom'
import StoneButton from '../components/StoneButton'
import { UpdateCharacterButton } from '../components/UpdateCharacterButton'
import { ResponsiveTypography } from '../components/ResponsiveTypography';

export const UpdateCharacter = ({ onCancel}) => {
    const { character } = useCharacter()
    const [updatedCharacter, setUpdatedCharacter] = useState(character)
    const navigate = useNavigate()


    const handleChange = (event) => {
        setUpdatedCharacter({ ...updatedCharacter, name: event.target.value })
    }

    const handleClick = () => {
        navigate('/viewcharacters')
    }

    const onCharacterUpdate = () => {
        console.log("onCharacterUpdate called"); // Log here
        handleClick()
        navigate('/viewcharacters')
    }


  return (
        <>
        <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '5rem'
        }}
        >
        <ResponsiveTypography type='title'>Enter your new name</ResponsiveTypography>
          <TextField
            label="Character Name"
            required
            id="characterName"
            autoComplete="character-name"
            onChange={handleChange}
          />
            <Box 
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 5
                }}
            >
                <UpdateCharacterButton
                    updatedCharacter={updatedCharacter} 
                    onCharacterUpdate={onCharacterUpdate}
                    >  
                </UpdateCharacterButton>
                <StoneButton
                onClick={handleClick}
                >
                Cancel
                </StoneButton>
            </Box>
        </Box>
    </>   
    )
}
