import React from 'react';
import { Modal, Typography } from '@mui/material';
import StoneButton from './StoneButton';
import { StyledModalBox } from './CustomBoxes';
import { CustomModal } from '../components/CustomModal';


export default function SkillModal({ skillInfo, open, handleClose }) {

    return (
        <>
        <CustomModal
          open={open}
          onClose={handleClose}
          aria-labelledby="skill-modal-title"
          aria-describedby="skill-modal-description"
        >
            {skillInfo && (
              <>
                <Typography variant="body1" align="center" gutterBottom>
                  Name: {skillInfo.name}
                </Typography>
                <Typography variant="body1" align="center">
                  Description: {skillInfo.description}
                </Typography>
              </>
            )}
        </CustomModal>
      </>
    );
  }