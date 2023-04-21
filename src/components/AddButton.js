import React from 'react'
import StoneButton from './StoneButton'

export const AddButton = ({children, onClick, disabled, ...props}) => {
  return (
    <StoneButton onClick={onClick} disabled={disabled} {...props}>
        {children}
    </StoneButton>
  )
}
