import React, { useState } from 'react'
import { ClassSpecificInfo } from './ClassSpecificInfo'
import { FormControl, MenuItem, Select, InputLabel, Typography, Box, Button } from '@mui/material';
import { CustomModal } from './CustomModal';
import { CustomPopover } from './CustomPopover';


export const LevelDropdown = ({classLevels}) => {
    const [selectedLevel, setSelectedLevel] = useState({})
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedFeature, setSelectedFeature] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null);

      const fetchFeatureData = async (featureUrl) => {
        const response = await fetch(`https://www.dnd5eapi.co${featureUrl}`);
        const data = await response.json();
        return data;
      };

      const handleClose = () => {
        setModalOpen(false)
      }

      const handleOpen = async (levelObj) => {
        
        const featureDataPromises = levelObj.features.map((feature) => 
        fetchFeatureData(feature.url)
        )
        const featureData = await Promise.all(featureDataPromises)
        setSelectedLevel({
          ...levelObj,
          features: featureData,
        })
        setModalOpen(true)
      }

      const handleChange = (event) => {
        const levelObj = classLevels.find((level) => level.level === event.target.value);
        handleOpen(levelObj);
      };
      
      const handleClick = (event, feature) => {
        console.log("clicked feature: ", feature)
        setAnchorEl(event.currentTarget)
        setSelectedFeature(feature)
      }

      const handlePopoverClose = () => {
        setAnchorEl(null)
      }

    return (
        <>
      {classLevels && Array.isArray(classLevels) && (
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="level-select">Select Level</InputLabel>
              <Select 
              value={selectedLevel}
              onChange={handleChange}
              label="Select Level"
              inputProps={{
                name: 'level',
                id: 'level-select',
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    backgroundColor: '#003049',
                  },
                },
              }}
              sx={{
                backgroundColor: '#003049',
              }}
              >
            <MenuItem disabled value="">
              <em>Select Level</em>
            </MenuItem>

                {classLevels.map((level, index) => (
                  <MenuItem key={`level${index}`} value={level.level}>
                    Level {level.level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> 
          )}

          {selectedLevel && selectedLevel.features && (
            <>
            <CustomModal
              open={modalOpen}
              onClose={handleClose}
              level={selectedLevel}
            >
              <Box>
                <Typography variant="body2">
                    Ability Score Bonus: {selectedLevel.ability_score_bonuses}
                    <br />
                    Proficiency Bonus: {selectedLevel.prof_bonus}
                    <br />
                    <br />
                    {selectedLevel.features.map((feature, featureIndex) => (
                      <Typography
                        variant="body2"
                        align="left" 
                        key={featureIndex}
                        > 
                        Features: 
                        <Button
                          size ="small"
                          onClick={(event) => handleClick(event, feature)}
                          sx={{
                            color: '#fdf0d5',
                            '&:hover':{
                              backgroundColor: '#669bbc'
                            } 
                          }}
                        > {feature.name}</Button>
                        <CustomPopover
                          anchorEl={anchorEl}
                          handlePopoverClose={handlePopoverClose}
                          content={selectedFeature && selectedFeature.desc ? selectedFeature.desc : []} 
                        />
                        </Typography>
                    ))}
                </Typography>
                <Typography variant="body2">
                  <ClassSpecificInfo classSpecific={selectedLevel.class_specific} />
                </Typography>
              </Box>
            </CustomModal>
            </>
          )}
        </>
      )
    }
