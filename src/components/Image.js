import React from 'react'
import { Paper, Box, Typography } from '@mui/material'


export const Image = ({type, slug, alt, sx, title}) => {
  const imageUrl = `/images/${type}/${slug}.jpg`

  return <>
    <Paper
      elevation={24}
      sx={{
        ...sx,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 2,
        boxShadow: '1em 1em 1em rgba(0,0,0,.7)',
        border: '2px solid black',
        margin: '2em 0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img
          src={imageUrl}
          alt={alt}
          style={{
            width: "100%",
            height: "100%",
          }}
        />     
    <Box
      sx={{
        position: 'absolute',
        backgroundColor: title? 'rgba(0, 0, 0, 0.4)' : 'none',
        padding: '4px 8px',
        right: 0,
        left: 0,
        bottom: 0,
      }}
    >
      <Typography align="center" fontSize={14}>
        {title}
      </Typography>
    </Box>
    </Paper>
  </>
}
