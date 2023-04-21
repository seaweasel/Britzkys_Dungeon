import React from 'react'
import { Typography } from '@mui/material';
import { CenteredBox } from '../components/CustomBoxes';
import AbilityScoresCards from '../components/AbilityScoresCards';
import { Box } from '@mui/system';
import { ResponsiveTypography } from '../components/ResponsiveTypography';


export const AbilityScores = () => {
  return (
    <>
    <CenteredBox>
    <ResponsiveTypography type="title">
        Roll your ability scores
    </ResponsiveTypography>
    </CenteredBox>
    <Box sx={{
      display:'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
    }}
    >
    <AbilityScoresCards />
    </Box>
    </>  
  )
}
