import React, { useState, useEffect, useContext } from 'react'
import { Table, TableBody, TableRow, TableCell, Typography, Box } from '@mui/material';
import { CenteredBox } from '../components/CustomBoxes'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { CustomSlider } from '../components/CustomSlider'
import ImagePaper from '../components/ImagePaper'
import { getSkills } from '../utils/skillApi'
import { useCharacter } from '../context/CharacterContext';
import { AddButton } from '../components/AddButton';
import { CustomModal } from '../components/CustomModal';
import { LevelDropdown } from '../components/LevelDropdown';
import { ResponsiveTypography } from '../components/ResponsiveTypography';
import { SnackbarContext } from '../context/SnackbarContext';




export const Classes = () => {
  const [openClass, setOpenClass] = useState(false);
  const [skills, setSkills] = useState([])
  const [classItems, setClassItems] = useState([])
  const [classData, setClassData] = useState(null)
  const { updateCharacter, character } = useCharacter()
  const { openSnackbar } = useContext(SnackbarContext)

  
  const { authUser } = useAuth();
  const navigate = useNavigate();

  if (!authUser) {
    navigate('signin')
  }
//get skills
  useEffect(() => {
    const fetchSkills = async () => {
      const fetchedSkills = await getSkills()
      console.log('Skill Info: ', fetchedSkills)
      setSkills(fetchedSkills)
    };
    
    fetchSkills();
  }, [])
//get classes
  const getClassInfo = async () => {
    const response = await fetch('https://api.open5e.com/classes');
    const data = await response.json();
    return data.results;
  };
//get levels
  const getClassLevels = async (classIndex) => {
    const response = await fetch(`https://www.dnd5eapi.co/api/classes/${classIndex}/levels`);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const getClassData = async () => {
      const classInfo = await getClassInfo();
      const classData = await Promise.all(
        classInfo.map(async (classItem) => {
          const classLevels = await getClassLevels(classItem.slug);
          const imageUrl = `images/classes/${classItem.slug}.jpg`;
  
          return {
            ...classItem,
            img: imageUrl,
            levels: classLevels,
          };
        })
      );
  
      console.log('Combined Class data: ', classData);
      setClassItems(classData);
    };
  
    getClassData();
  }, []);  
  

  const handleOpenClass = (classes) => {
    console.log(classes)
    setClassData(classes)
    setOpenClass(true)
  }
  
  const handleCloseClass = () => {
      setOpenClass(false);
  }

  const calculateHP = () => {
    console.log('con modifier', character.abilityScores.CON.modifier)
    const hitDie = classData.hit_dice.slice(2);
    const conModifier = character.abilityScores.CON.modifier; // Accessing the Constitution modifier

    return parseInt(hitDie, 10) + conModifier;
  };

  const handleAddClass = () => {
    const hitPoints = calculateHP()
    updateCharacter({ class: classData, level: 1, experience: 0, hp: hitPoints });
    openSnackbar(`${classData.name} selected!`, 'success')
    handleCloseClass();
  };
  return (
    <>
    <CenteredBox>
      <ResponsiveTypography type='title'>Choose your Class</ResponsiveTypography>
    </CenteredBox>
    <Box sx={{ width: '100%'}}>
      <CustomSlider>
      {classItems.map((classItem) => (
        <ImagePaper
        key={classItem.slug} 
        src={classItem.img}
        alt={classItem.name}
        onClick={() => handleOpenClass(classItem)}
        title={classItem.name}
        />
      ))}
      </CustomSlider>
    </Box>

      
    <CustomModal
      open={openClass}
      onClose={handleCloseClass}
      aria-labelledby="race-modal-title"
      aria-describedby="race-modal-description"
      title={classData && classData.name}
      image={classData && classData.img}
    >
      {classData && (
          <>
        <div> 
          <Typography variant="body2">
            <Table>
              <TableBody>
                <TableRow >
                  <TableCell component="th" scope="row" align="center">
                  <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  >
                    <ResponsiveTypography type="title">Hit Die: </ResponsiveTypography>
                    <ResponsiveTypography>Constant: {classData.hit_dice}</ResponsiveTypography>
                    <ResponsiveTypography>First level: {classData.hp_at_1st_level}</ResponsiveTypography>
                    <ResponsiveTypography>Higher levels: {classData.hp_at_higher_levels}</ResponsiveTypography>                  
                  </Box>
                  </TableCell>
                </TableRow>
                <TableRow >
                  <TableCell component="th" scope="row" align="center">
                  <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  >
                    <ResponsiveTypography type="title">Armor Proficiencies: </ResponsiveTypography>
                    <ResponsiveTypography>{classData.prof_armor}</ResponsiveTypography>
                  </Box>
                  </TableCell>
                </TableRow>
                <TableRow >
                  <TableCell component="th" scope="row" align="center">
                  <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  >
                    <ResponsiveTypography type="title">Weapon Proficiencies:</ResponsiveTypography>
                    <ResponsiveTypography>{classData.prof_weapons}</ResponsiveTypography>
                  </Box>
                  </TableCell>
                </TableRow>
                <TableRow >
                  <TableCell component="th" scope="row" align="center">
                  <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  >
                  <ResponsiveTypography type="title">Equipment:</ResponsiveTypography>
                  <ResponsiveTypography>{classData.equipment}</ResponsiveTypography>
                  </Box>
                  </TableCell>
                </TableRow>
                <TableRow >
                  <TableCell component="th" scope="row" align="center">
                  <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  >
                  <ResponsiveTypography type="title">Level Info: </ResponsiveTypography>
                  <LevelDropdown classLevels={classData.levels} />
                  </Box>
                  </TableCell>
                </TableRow>           
            </TableBody>
          </Table>
          </Typography>
        </div>           
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
              >          <AddButton onClick={handleAddClass} style={{ marginTop: '2em', display: 'flex', flexDirection: 'column' }}>
            Add Class
          </AddButton>
        </Box>
        </>
      )}
    </CustomModal>
  </>    
  )
}
