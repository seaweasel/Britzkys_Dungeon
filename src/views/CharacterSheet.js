import React, { useState, useEffect } from 'react'
import { useCharacterData } from '../hooks/useCharacterData'
import { useAuth } from '../context/AuthContext'
import { useParams } from 'react-router-dom'
import { Image } from '../components/Image'
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
            const characterRef = doc(db, 'users', userId, 'characters', characterId)
            await updateDoc(characterRef, {
                experience: newExperience
            })
            setExp(0)
        } catch (error) {
            console.error('Error updating character experience:', error)
        }
    }

  return <>
  <Box sx={{display: 'flex', justifyContent: 'center', minHeight: 'auto', paddingTop: 4,}}>
    <Grid container spacing={2} padding={2} maxWidth={1620} minWidth={320}>
        {/* Header Grid */}
        <Grid item xs={12} >
            <Grid container justifyContent="space-between" alignItems="stretch" spacing={2} >
                {/* Left Subgrid */}
                <Grid item xs={12} md={6}>
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, height: '100%', marginTop: 'auto', border: '2px solid black', padding: 1}}>
                        <ResponsiveTypography type='title' gutterbottom>
                            {characterData.name}
                        </ResponsiveTypography>
                        <Box sx={{display: 'flex', gap: 4}}>
                        <ResponsiveTypography type="background">Level: {characterData.level}</ResponsiveTypography>
                        <ResponsiveTypography type="background">Total Exp: {characterData.experience}</ResponsiveTypography>
                        </Box>
                        <TextField
                            label="Add Experience"
                            type="number"
                            value={exp}
                            onChange ={(e) => setExp(e.target.value)}
                            key={characterData.experience}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddExperience}
                        >
                            Submit
                        </Button> 
                    </Box>                      
                </Grid>
                {/* Right Subgrid */}
                <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', height: '100%', border: '2px solid black', padding: 1, gap: 2, margin: 'auto' }}>
                        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <ResponsiveTypography type="background">Class: </ResponsiveTypography>
                        <Image 
                          type={'classes'} 
                          slug={characterData.class.slug} 
                          alt={characterData.class.name}
                          title={characterData.class.name}
                          sx={{
                            width: 125,
                            height: 125
                          }} 
                        />
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <ResponsiveTypography type="background">Race:</ResponsiveTypography>
                            <Image
                              type={'races'}
                              slug={characterData.race.toLowerCase()}
                              alt={characterData.race}
                              title={characterData.race}
                              sx={{
                                width: 125,
                                height: 125
                              }}
                            />
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <ResponsiveTypography type="background">Alignment: </ResponsiveTypography>
                            <Image
                              type={'alignment'}
                              slug={characterData.alignment.name.toLowerCase()}
                              alt={characterData.alignment.name}
                              title={characterData.alignment.name}
                              sx={{
                                width: 125,
                                height: 125
                              }}
                            />
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <ResponsiveTypography type="background">Background: </ResponsiveTypography>
                        <Image
                          type={'backgrounds'}
                          slug={characterData.background.slug}
                          alt={characterData.background.name}
                          title={characterData.background.name}
                          sx={{
                            width: 125,
                            height: 125
                          }}
                        />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
  </Box>
  </>
}
