import React, { useState, useEffect, useContext } from 'react'
import { CustomModal } from './CustomModal'
import { getClassInfo, getClassLevels } from '../utils/classApi'
import ImagePaper from './ImagePaper'
import { Box } from '@mui/system'
import { CustomSlider } from './CustomSlider'
import { ClassesTable } from './ClassesTable'
import { useCharacter } from '../context/CharacterContext';
import { SnackbarContext } from '../context/SnackbarContext';



export const ClassesModal = () => {
    const [open, setOpen] = useState(false)
    const [classInfo, setClassInfo] = useState([])
    const [selectedClass, setSelectedClass] = useState(null)
    const { updateCharacter, character } = useCharacter()
    const { openSnackbar } = useContext(SnackbarContext)


    const handleOpen = (currentClass) => {
        setSelectedClass(currentClass)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }



    useEffect(() => {
        const getClassData = async () => {
            const classInfo = await getClassInfo()
            const classData= await Promise.all(
                classInfo.map(async (classItem) => {
                    const classLevels = await getClassLevels(classItem.slug)
                    const imageUrl = `images/classes/${classItem.slug}.jpg`
                    return {
                        ...classItem,
                        img: imageUrl,
                        levels: classLevels,
                    }
                })
            )
            setClassInfo(classData)
        }
        getClassData()
    }, [])

    const calculateHP = () => {
        console.log('con modifier', character.abilityScores.CON.modifier)
        const hitDie = selectedClass.hit_dice.slice(2);
        const conModifier = character.abilityScores.CON.modifier; // Accessing the Constitution modifier
    
        return parseInt(hitDie, 10) + conModifier;
    };

    const handleAddClass = () => {
        const hitPoints = calculateHP()
        updateCharacter({ class: selectedClass, level: 1, experience: 0, hp: hitPoints });
        openSnackbar(`${selectedClass.name} selected!`, 'success')
        handleClose();
      };

  return (
    <>
    <Box sx={{width: '100%'}}>
        <CustomSlider>
            {classInfo.map((cls) => (
                <ImagePaper
                key={cls.slug}
                src={cls.img}
                alt={cls.name}
                onClick={() => handleOpen(cls)}
                title={cls.name}
                />
            ))}
        </CustomSlider>
    </Box>
    <CustomModal
        open={open}
        onClose={handleClose}
        title={selectedClass?.name}
        image={selectedClass?.img}
        buttonName={'Add Class'}
        buttonOnClick={handleAddClass}
    >
        {selectedClass && (<ClassesTable selectedClass={selectedClass} />)}   
    </CustomModal>
    </>
    )
}
