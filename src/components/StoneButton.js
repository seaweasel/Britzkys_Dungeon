import React from 'react'
import Button from '@mui/material/Button'

export default function StoneButton (props) {
  const { onClick, disabled, ...restProps } = props;
  return (
    <Button
        onClick={onClick}
        disabled={disabled}
        {...restProps}
        sx={{
          position: 'relative',
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2)), url(/images/button.jpg)`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          color: '#fdf0d5',
          border: '2px solid black',
          textDecoration: 'none',
          margin: '10px',
          fontSize: {
            xs: '0.8rem',
            sm: '1rem',
            md: '1rem',
            lg: '1em',
            xl: '1rem',
          },
          '&:hover': {
            color: '#ffa62b',
            textDecoration: 'none',
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            mixBlendMode: 'multiply',
            zIndex: '-1',
          },
        }}
    ></Button>
  )
}
