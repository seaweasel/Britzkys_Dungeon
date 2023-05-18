import React, { useState, useEffect, useContext } from 'react'
import ImagePaper from '../components/ImagePaper'
import { Box } from '@mui/material'
import { CustomModal } from '../components/CustomModal'
import { useCharacter } from '../context/CharacterContext'
import { ResponsiveTypography } from '../components/ResponsiveTypography'
import { SnackbarContext } from '../context/SnackbarContext' 
import { CustomSlider } from '../components/CustomSlider'
import { BackgroundsTable } from '../components/BackgroundsTable'


export const Backgrounds = () => {
    const [backgrounds, setBackgrounds] = useState([])
    const [background, setBackground] = useState(null)
    const [openBackground, setOpenBackground] = useState(false)
    const { openSnackbar } = useContext(SnackbarContext)

    useEffect(() => {
        const getBackgrounds = async () => {
            const response = await fetch('https://api.open5e.com/backgrounds')
            const data = await response.json()

            const backgroundData = data.results.map((background) =>({
              ...background,
              img: `images/backgrounds/${background.slug}.jpg`,
              title: background.name,
              description: background.desc,
              skillProf: background.skill_proficiencies,
              toolProf: background.tool_proficiencies,
              languages: background.languages,
              equipment: background.equipment,
              features: background.feature,
              featureDescription: background.feature_desc,
            }))
            setBackgrounds(backgroundData)
        }
        
        getBackgrounds()
    }, [])

    const handleOpenBackground = (background) => {
      console.log('Background Data: ', background)
      //destructure assignment to remove the extra fields
      const { desc, features, feature_description, ...newBackground} = background
      setBackground(newBackground)
      setOpenBackground(true)
    }
    const handleCloseBackground = () => {
      setOpenBackground(false)
    }
    const { updateCharacter } = useCharacter()

    const handleAddBackground = () => {
      updateCharacter({ background: background })
      openSnackbar(`${background.name} selected!`, 'success')
      handleCloseBackground()
    }


  return (
    <>
    <Box sx={{display: 'flex', justifyContent: 'center'}}>
    <ResponsiveTypography type='title'>Choose your Background</ResponsiveTypography>
    </Box>
    <Box sx={{width: '100%'}}>
    <CustomSlider>
    {backgrounds.map((background) => (
      <ImagePaper
      key={background.slug}
      src={background.img}
      title={background.title}
      onClick={() => handleOpenBackground(background)}
      />
    ))}
    </CustomSlider>
     </Box>
     <CustomModal
      open={openBackground}
      onClose={handleCloseBackground}
      background={background}
      image={background && background.img}
      title={background && background.title}
      buttonName={'Add Background'}
      buttonOnClick={handleAddBackground}
     >
  {background && (
        <>
          <BackgroundsTable background={background} />
        </>
         )}
        </CustomModal>
  
    </>
  )
}
