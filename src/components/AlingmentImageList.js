import React, { useState, useContext } from 'react'
import { Box, ImageListItem, ImageList } from '@mui/material';
import { ResponsiveTypography } from './ResponsiveTypography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useCharacter } from '../context/CharacterContext';
import { SnackbarContext } from '../context/SnackbarContext';
import { AddButton } from '../components/AddButton';


export const AlingmentImageList = ({ itemData, description, alignments }) => {
    const [flippedImage, setFlippedImage] = useState(null)
    const [selectedAlignment, setSelectedAlignment] = useState(null);

    const theme = useTheme()
    const { updateCharacter } = useCharacter()
    const { openSnackbar } = useContext(SnackbarContext)



    const medium = useMediaQuery(theme.breakpoints.down('md'))


    const handleImageFlip = (item) => {
        //get the object for the selected alignment
        const selectedAlignmentData = alignments.find((alignment) => alignment.name.toLowerCase() === item.title.toLowerCase())
        console.log('Alignment Data: ', selectedAlignmentData)
        //toggle flipped state of image
        if (flippedImage === item.img) {
          setFlippedImage(null)
          setSelectedAlignment(null)
        } else {
          setFlippedImage(item.img)
          setSelectedAlignment(selectedAlignmentData)
        }
      }

      const handleAddAlignment = async () => {
        if (selectedAlignment) {
          updateCharacter({alignment: selectedAlignment });
          openSnackbar(`${selectedAlignment.name} selected!`, 'success' )
        }
      };


  return (
    <ImageList 
    sx={{ 
      width: 'auto', 
    }} 
    cols={medium ? 1 : 3} 
    rowHeight={300}
  >
    {itemData.map((item) => (
      <ImageListItem
        key={item.img}
        sx={{
          width: 300,
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 2,
          cursor: 'pointer',
          boxShadow: '1em 1em 1em rgba(0, 0, 0, .7)',
          border: '2px solid black',
          perspective: '1000px',
        }}
        onClick={() => handleImageFlip(item)}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            position: 'relative',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.6s',
            transform:
              flippedImage === item.img ? 'rotateY(180deg)' : '',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
            }}
          >
            <img
              src={`${item.img}`}
              alt={item.title}
              loading="lazy"
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
              <Box
                sx={{
                  position: 'absolute',
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  padding: '4px 8px',
                  right: 0,
                  left: 0,
                  bottom: 0
                }}
              >
                <ResponsiveTypography
                sx={{
                  display: 'flex',
                  justifyContent: 'center'
                }}
                >{item.title}</ResponsiveTypography>
            </Box>
            </Box>
            <Box
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: 'rotateY(180deg)',
                zIndex: 1
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
              <ResponsiveTypography sx={{ textAlign: 'center' }}>
                {description(item.title)}
              </ResponsiveTypography>
              <AddButton onClick={handleAddAlignment}>
                Choose
              </AddButton>
              </Box>
            </Box>
          </Box>
        </ImageListItem>
      ))}
    </ImageList>
  )
}
