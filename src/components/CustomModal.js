import React from 'react';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import { CustomCloseButton } from './CustomCloseButton';
import { StyledModalBox } from './CustomBoxes';

export const CustomModal = ({
    open,
    onClose,
    ariaLabelledby,
    ariaDescribedby,
    children,
    background,
    level
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
        <Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end'
            }}>
              <CustomCloseButton onClose={onClose} />
            </Box>
            {children}
        </Box>
    </Dialog>
  )
}
