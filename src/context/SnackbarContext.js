import React, { createContext, useState} from 'react'

export const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const [snackbarSeverity, setSnackbarSeverity] = useState('success')

    const openSnackbar = (message, severity = 'success') => {
        setSnackbarMessage(message)
        setSnackbarSeverity(severity)
        setSnackbarOpen(true)
    }

    const closeSnackbar = () => {
        setSnackbarOpen(false)
    }

    return (
        <SnackbarContext.Provider
            value={{
                snackbarOpen,
                snackbarMessage,
                snackbarSeverity,
                openSnackbar,
                closeSnackbar,
            }}
        >
            {children}
        </SnackbarContext.Provider>
    )
}