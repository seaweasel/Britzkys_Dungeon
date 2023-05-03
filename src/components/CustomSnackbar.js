import React, { useContext } from 'react'
import { Snackbar, Alert } from '@mui/material'
import { SnackbarContext } from '../context/SnackbarContext'

const CustomSnackbar = () => {
    const { snackbarOpen, snackbarMessage, snackbarSeverity, closeSnackbar } = useContext(SnackbarContext)

    const handleClose = (event, reason) => {
        if (reason ==='clickaway') {
            return
        }
        closeSnackbar()
    }

  return (
    <Snackbar   
      open={snackbarOpen}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{vertical:'bottom', horizontal: 'left'}}
    >
        <Alert onClose={handleClose} severity={snackbarSeverity} sx={{width: '100%'}}>
            {snackbarMessage}
        </Alert>
    </Snackbar>
  ) 
}

export default CustomSnackbar