import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';

const label = { inputProps: { 'aria-label': 'Checkbox' } };

export default function CustomCheckBox() {
  return (
    <div>
      <Checkbox 
      {...label} 
      icon={<CheckBoxOutlineBlankRoundedIcon />} 
      checkedIcon={<CheckBoxRoundedIcon />} 
      />
    </div>
  );
}
