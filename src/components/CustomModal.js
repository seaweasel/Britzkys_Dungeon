import React from 'react';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import { CustomCloseButton } from './CustomCloseButton';
import { StyledModalBox } from './CustomBoxes';
import { ResponsiveTypography } from './ResponsiveTypography';
import ImagePaper from './ImagePaper';
import { AddButton } from './AddButton';

export const CustomModal = ({
    open,
    onClose,
    ariaLabelledby,
    ariaDescribedby,
    children,
    title,
    image,
    buttonName, 
    buttonOnClick
}) => {

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx:{
          ...StyledModalBox.props,
          backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
          url(/images/modal-background.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }
      }}
    >
        <Box sx={{ position: 'relative'}}>
          {title && (
            <Box 
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              position: 'sticky',
              top: 0,
              left: 0,
              zIndex: 10,
              backgroundImage: `
              linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
              url(/images/modal-background.jpg)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              borderBottom: '2px solid black',
              marginBottom: 'none',
            }}
            >
                <ImagePaper
                 sx={{
                  height: 100,
                  width: 100
                 }}
                 src={image}
                />               
                <ResponsiveTypography type="title" align="center" id="title">{title}</ResponsiveTypography>
                <CustomCloseButton onClose={onClose} />
              </Box>
          )}
            {children}
        </Box>
        <Box                
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'sticky',
            bottom: 0,
            padding: '1em',
            borderTop: '2px solid black',
            backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
            url(/images/modal-background.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}>
          <AddButton onClick={buttonOnClick} style={{ marginTop: '2em', display: 'flex', flexDirection: 'column' }}>{buttonName}</AddButton>
        </Box>
    </Dialog>
  )
}
