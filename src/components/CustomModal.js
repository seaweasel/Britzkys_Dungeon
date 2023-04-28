import React from 'react';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import { CustomCloseButton } from './CustomCloseButton';
import { StyledModalBox } from './CustomBoxes';
import { ResponsiveTypography } from './ResponsiveTypography';
import ImagePaper from './ImagePaper';

export const CustomModal = ({
    open,
    onClose,
    ariaLabelledby,
    ariaDescribedby,
    children,
    title,
    image
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
              justifyContent: 'center',
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
            }}
            >
              <Box sx={{width: '100%', display:'flex', justifyContent: 'center'}}>
                <ImagePaper
                 height={150}
                 width={150}
                 src={image}
                />
                </Box>
                <ResponsiveTypography type="title" align="center" id="title">{title}</ResponsiveTypography>
                <CustomCloseButton onClose={onClose} />
              </Box>
          )}
            {children}
        </Box>
    </Dialog>
  )
}
