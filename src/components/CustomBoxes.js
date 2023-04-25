import Box from '@mui/material/Box'
import { styled } from '@mui/system' 


//box for modal
export const StyledModalBox = styled(Box)(({ theme }) => ({
  width: 'fit-content',
  color: 'white',
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  border: '2px solid #000',
  boxShadow: theme.shadows[10],
  paddingTop: theme.spacing(4),
  margin: 0,
  overflowY: 'auto',
  maxHeight: '50em',
  maxWidth: '50em',
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  
}));


// box for centered row flex wrap 
export const WrapBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  justifyContent: 'center',
  width: '100%',
  gap: '1em',
}));


// basic flex centered box
export const CenteredBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const CenteredColumn = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItmes: 'center',
  justifyContent: 'center',

}))

export const FormBox = styled(Box)(({ theme }) => ({
      marginTop: '12em',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'rgb(120, 0, 0, 0.7)',
      borderRadius: 10,
      border: '2px solid #c1121f',
      padding: 2,
}));

export const FlexEndBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  width: '100%',
}));


