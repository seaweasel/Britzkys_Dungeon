import React, { useState, useEffect } from 'react'
import { useCharacterData } from '../hooks/useCharacterData'
import { useAuth } from '../context/AuthContext'
import { useParams } from 'react-router-dom'
import ImagePaper from '../components/ImagePaper'
import { Box, Grid, TextField } from '@mui/material'
import { ResponsiveTypography } from '../components/ResponsiveTypography'

export const CharacterSheet = () => {
    const { authUser } = useAuth()
    const { characterId } = useParams()
    const userId = authUser.uid

    const { characterData, loading, error } = useCharacterData(userId, characterId)

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }
    
    if (!characterData) {
        return <div>No character data found</div>
    }
  return <>
    <Grid container spacing={2}>
        {/* Header Grid */}
        <Grid item xs={12}>
            <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                {/* Left Subgrid */}
                <Grid item xs={12} md={6}>
                    <ResponsiveTypography type='title' gutterbottom>
                        {characterData.name}
                    </ResponsiveTypography>
                    <TextField
                        label="Add Experience"
                        type="number"
                        value={expInput}
                        onChange={handleAddExp}
                        fullWidth
                    />
                </Grid>
                {/* Right Subgrid */}
                <Grid item xs={12} md={6}>
                    <ResponsiveTypography></ResponsiveTypography>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
  </>
}
