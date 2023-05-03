import React, { useState, useEffect, useContext } from 'react';
import { Typography, Box, ImageListItem, ImageList } from '@mui/material';
import { getAlignment } from '../utils/alignmentApi';
import { AddButton } from '../components/AddButton';
import { useCharacter } from '../context/CharacterContext';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ResponsiveTypography } from '../components/ResponsiveTypography';
import { SnackbarContext } from '../context/SnackbarContext';


export default function AlignmentTable() {
  const theme = useTheme()
  const [alignments, setAlignments] = useState([])
  const [flippedImage, setFlippedImage] = useState(null)
  const [selectedAlignment, setSelectedAlignment] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { openSnackbar } = useContext(SnackbarContext)
  
  const medium = useMediaQuery(theme.breakpoints.down('md'))
  const small = useMediaQuery(theme.breakpoints.between('xs', 'sm'))
  

  useEffect(() => {
    async function fetchAlignments() {
      const alignmentData = await getAlignment()
      setAlignments(alignmentData)
    }

    fetchAlignments()
  }, [])

  const getAlignmentDescription = (title) => {
    const alignment = alignments.find(
      (alignment) => alignment.name.toLowerCase() === title.toLowerCase()
    );
    return alignment ? alignment.description : '';
  }

  const { updateCharacter } = useCharacter()

  const handleAddAlignment = async () => {
    if (selectedAlignment) {
      updateCharacter({alignment: selectedAlignment });
      openSnackbar(`${selectedAlignment.name} selected!`, 'success' )
      setIsButtonDisabled(true); // Disable the button after updating the character
    }
  };

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
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ResponsiveTypography type='title'>Choose your Alignment </ResponsiveTypography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
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
                  <Typography variant="body2" sx={{ textAlign: 'center' }}>
                    {getAlignmentDescription(item.title)}
                  </Typography>
                  <AddButton onClick={handleAddAlignment}>
                    Choose
                  </AddButton>
                  </Box>
                </Box>
              </Box>
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </>
  );
}

const itemData = [
    {
        img: '/images/alignment/lawful-good.jpg',
        title: 'Lawful good'
    },
    {
        img: '/images/alignment/neutral-good.jpg',
        title: 'Neutral good'
    },
    {
        img: '/images/alignment/chaotic-good.jpg',
        title: 'Chaotic good'
    },
    {
        img: '/images/alignment/lawful-neutral.jpg',
        title: 'Lawful neutral'
    },
    {
        img: '/images/alignment/neutral.jpg',
        title: 'Neutral'
    },
    {
        img: '/images/alignment/chaotic-neutral.jpg',
        title: 'Chaotic Neutral'
    },
    {
        img: '/images/alignment/lawful-evil.jpg',
        title: 'Lawful Evil'
    },
    {
        img: '/images/alignment/neutral-evil.jpg',
        title: 'Neutral Evil'
    },
    {
        img: '/images/alignment/chaotic-evil.jpg',
        title: 'Chaotic Evil'
    },
]