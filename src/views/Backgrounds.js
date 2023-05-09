import React, { useState, useEffect, useContext } from 'react'
import ImagePaper from '../components/ImagePaper'
import { Box, Table, TableBody, TableCell, TableRow } from '@mui/material'
import { CustomModal } from '../components/CustomModal'
import { AddButton } from '../components/AddButton'
import { useCharacter } from '../context/CharacterContext'
import { ResponsiveTypography } from '../components/ResponsiveTypography'
import { SnackbarContext } from '../context/SnackbarContext' 
import { CustomSlider } from '../components/CustomSlider'


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
     >
  {background && (
        <>
        <div> 
          <ResponsiveTypography>
            <Table>
              <TableBody>
                <TableRow >
                  <TableCell component="th" scope="row" align="center">
                  <ResponsiveTypography type='title'>Description:</ResponsiveTypography>
                  <ResponsiveTypography>{background.description}</ResponsiveTypography>
                  </TableCell>
                </TableRow>
                <TableRow >
                  <TableCell component="th" scope="row" align="center">
                  <ResponsiveTypography type='title'>Skill Proficiencies: </ResponsiveTypography>
                  <ResponsiveTypography>{background.skillProf}</ResponsiveTypography>
                  </TableCell>
                </TableRow>
                <TableRow >
                  <TableCell component="th" scope="row" align="center">
                  <ResponsiveTypography type='title'>Languages:</ResponsiveTypography>
                  <ResponsiveTypography>{background.languages}</ResponsiveTypography>
                  </TableCell>
                </TableRow>
                <TableRow >
                  <TableCell component="th" scope="row" align="center">
                  <ResponsiveTypography type='title'>Features:</ResponsiveTypography>
                  <ResponsiveTypography>{background.feature}</ResponsiveTypography>
                  </TableCell>
                </TableRow>
                <TableRow >
                  <TableCell component="th" scope="row" align="center">
                  <ResponsiveTypography type='title'>Feature Description:</ResponsiveTypography>
                  <ResponsiveTypography>{background.featureDescription}</ResponsiveTypography>
                  </TableCell>
                </TableRow>
            </TableBody>
          </Table>
          </ResponsiveTypography>
        </div>
        </>
         )}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'sticky',
                  bottom: 0,
                  padding: '1em',
                  borderTop: '2px solid black',
                  backgroundImage: `
                  linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
                  url(/images/modal-background.jpg)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              >          <AddButton onClick={handleAddBackground} style={{ marginTop: '2em', display: 'flex', flexDirection: 'column' }}>
            Choose
          </AddButton>
        </Box>
        </CustomModal>
  
    </>
  )
}
