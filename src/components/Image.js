import React from 'react'
import { Paper } from '@mui/material'

export const Image = ({src, alt, sx}) => {
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
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background: `url(${src}) no-repeat center`,
            backgroundSize: '100% 100%',
          }}
        ></div>
    </Paper>
  </>
}
