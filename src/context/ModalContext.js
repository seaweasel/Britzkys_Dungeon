import React, { createContext, useState, useContext } from 'react'

const ModalContext = createContext()

export const useModal = () => {
    const context = useContext(ModalContext)
    if(!context) {
        throw new Error ('useModal must be used within a ModalProvider')
    }
    return context
}

export const ModalProvider = ({ children }) => {
    const [modalState, setModalState] = useState({});

    const openModal = () => {
        setModalState(true) 
    }

    const closeModal = () => {
        setModalState(false)
    }

    return (
        <ModalContext.Provider value ={{ modalState, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    )
}