import React, { useState, useEffect } from 'react'
import { useCharacterData } from '../hooks/useCharacterData'
import { useAuth } from '../context/AuthContext'
import { useParams } from 'react-router-dom'
import ImagePaper from '../components/ImagePaper'
import { Box, Button, Grid, TextField } from '@mui/material'
import { ResponsiveTypography } from '../components/ResponsiveTypography'
import { db } from '../utils/firebase'
import { doc, updateDoc } from 'firebase/firestore'

export const CharacterSheet = () => {
    const { authUser } = useAuth()
    const { characterId } = useParams()
    const [userId, setUserId] = useState(null)
    const { characterData, loading, error } = useCharacterData(userId, characterId)
    const [exp, setExp] = useState(0)

    useEffect(() => {
        if (authUser) {
            setUserId(authUser.uid)
        }
    }, [authUser])

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }
    
    if (!characterData) {
        return <div>No character data found</div>
    }

    const handleAddExperience = async () => {
        const newExperience = parseInt(exp) + characterData.experience
        try {
            const characterRef = doc(db, 'usuers', userId, 'characters', characterId)
            await updateDoc(characterRef, {
                experience: newExperience
            })
            setExp(0)
        } catch (error) {
            console.error('Error updating character experience:', error)
        }
    }

  return <>
    <Grid container spacing={2}>
        {/* Header Grid */}
        <Grid item xs={12}>
            <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                {/* Left Subgrid */}
                <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',

                      }}
                    >
                    <ResponsiveTypography type='title' gutterbottom>
                        {characterData.name}
                    </ResponsiveTypography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-around'
                      }}
                    >
                        <TextField
                            label="Add Experience"
                            type="number"
                            value={exp}
                            onChange ={(e) => setExp(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddExperience}
                        >
                            Submit
                        </Button>                    
                    </Box>
                    <ResponsiveTypography>Total Exp: {characterData.experience}</ResponsiveTypography>
                </Grid>
                {/* Right Subgrid */}
                <Grid item xs={12} md={6}>
                    <ResponsiveTypography>Level{characterData.level}{characterData.class.name}</ResponsiveTypography>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
  </>
}
