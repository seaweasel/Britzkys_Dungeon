import React from 'react';
import { IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

export const CustomCloseButton = ({ onClose }) => {
  return (
          <IconButton onClick={onClose} color="error">
            <CancelIcon fontSize="small" />
          </IconButton>
  );
};
