import React from 'react';
import { Grid, IconButton, Box } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

export const CustomCloseButton = ({ onClose, children }) => {
  return (
    <Grid container>
      <Grid item xs={11} sm={10} md={11}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent={{ xs: 'center', sm: 'start', md: 'center' }}
          width="100%"
        >
          {children}
        </Box>
      </Grid>
      <Grid item xs={1} sm={2} md={1}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          width="100%"
        >
          <IconButton onClick={onClose} color="error">
            <CancelIcon fontSize="medium" />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  );
};
