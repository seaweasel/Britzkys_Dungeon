import React, { useState, useEffect } from 'react'
import ImagePaper from '../components/ImagePaper'
import { Box, Typography, Table, TableBody, TableCell, TableRow } from '@mui/material'
import { CustomModal } from '../components/CustomModal'
import { AddButton } from '../components/AddButton'
import { useCharacter } from '../context/CharacterContext'
import { ResponsiveTypography } from '../components/ResponsiveTypography'


export const Backgrounds = () => {
    const [backgrounds, setBackgrounds] = useState([])
    const [background, setBackground] = useState(null)
    const [openBackground, setOpenBackground] = useState(false)

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
    const { updateCharacter, character } = useCharacter()

    const handleAddBackground = () => {
      updateCharacter({ background: background })
      handleCloseBackground()
    }


  return (
    <>
    <Box sx={{display: 'flex', justifyContent: 'center'}}>
    <ResponsiveTypography type='title'>Choose your Background</ResponsiveTypography>
    </Box>
    <Box sx={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2}}>
    {backgrounds.map((background) => (
      <ImagePaper
      key={background.slug}
      src={background.img}
      title={background.title}
      onClick={() => handleOpenBackground(background)}
      />
    ))}
     </Box>
     <CustomModal
      open={openBackground}
      onClose={handleCloseBackground}
      background={background}
     >
  {background && (
        <>
      <Typography variant="h3" align="center">{background.title}</Typography>
        <div> 
          <Typography variant="body1">
            <Table>
              <TableBody>
                <TableRow >
                  <TableCell component="th" scope="row" align="left">
                  <Typography variant="h4">Description:</Typography>
                  </TableCell>
                  <TableCell align="right">
                  <Typography variant="body2">{background.description}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow >
                  <TableCell component="th" scope="row" align="left">
                  <Typography variant="h4">Skill Proficiencies: </Typography>
                  </TableCell>
                  <TableCell align="right">
                  <Typography variant="body2">{background.skillProf}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow >
                  <TableCell component="th" scope="row" align="left">
                  <Typography variant="h4">Languages:</Typography>
                  </TableCell>
                  <TableCell align="right">
                  <Typography variant="body2">{background.languages}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow >
                  <TableCell component="th" scope="row" align="left">
                  <Typography variant="h4">Features:</Typography>
                  </TableCell>
                  <TableCell align="right">
                  <Typography variant="body2">{background.feature}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow >
                  <TableCell component="th" scope="row" align="left">
                  <Typography variant="h4">Feature Description:</Typography>
                  </TableCell>
                  <TableCell align="right">
                  <Typography variant="body2">{background.featureDescription}</Typography>
                  </TableCell>
                </TableRow>
            </TableBody>
          </Table>
          </Typography>
        </div>
        </>
         )}
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <AddButton onClick={handleAddBackground} style={{ marginTop: '2em', display: 'flex', flexDirection: 'column' }}>
            Choose
          </AddButton>
        </div>
        </CustomModal>
  
    </>
  )
}
