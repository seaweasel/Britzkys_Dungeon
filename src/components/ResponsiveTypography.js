import React from 'react'
import { Typography, useMediaQuery, useTheme } from '@mui/material'

export const ResponsiveTypography = ({ type = 'basic', ...props }) => {
    const theme = useTheme()
    const isXs = useMediaQuery(theme.breakpoints.down('xs'));
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));

    const getVariant = () => {
        if (type === 'title'){
            return isXs || isSm ? 'h5' : 'h4'
        }
        
        return isXs || isSm ? 'body2' : 'body1'
    }

    const getStyle = () => {
      if (type === 'background'){
        return {
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          padding: 5,
          borderRadius: 10
        }
      }
    }

  return (
    <Typography variant={getVariant()} style={getStyle()} {...props} />
  )
}
