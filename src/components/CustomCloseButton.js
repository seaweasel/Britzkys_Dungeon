import React from 'react'
import { Grid, IconButton } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'

export const CustomCloseButton = ({onClose, children}) => {
  return ( 
    <Grid container>
      <Grid item xs={11}>
        {children}
      </Grid>
      <Grid item xs={1} sx={{textAlign: 'right'}}>
        <IconButton
          onClick={onClose}
          color="error"
        >
          <CancelIcon fontSize="large" />
        </IconButton>
      </Grid>
    </Grid>


  )
}
