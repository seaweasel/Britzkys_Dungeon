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
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false)
    }

    return (
        <ModalContext.Provider value ={{ modalOpen, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    )
}