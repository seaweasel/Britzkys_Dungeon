import React, { useState } from 'react'
import { Table, TableBody, TableRow, TableCell, Box } from '@mui/material';
import { getRaceImage } from '../utils/getImage';
import ImagePaper from './ImagePaper'
import TraitAccordions from './TraitAccordions';
import { CenteredColumn } from './CustomBoxes';
import { CustomModal } from './CustomModal';
import{ useCharacter } from '../context/CharacterContext'
import { AddButton } from './AddButton';
import { ResponsiveTypography } from './ResponsiveTypography';
import { useTheme } from '@mui/system';

export default function RaceModal({ race, url, fetchRaceInfo, fetchTraitInfo }) {
    const [open, setOpen] = useState(false);
    const [raceInfo, setRaceInfo] = useState(null) // state variable for race information 
    const [raceInfoItems, setRaceInfoItems] = useState([]);
    const [traitsWithInfo, setTraitsWithInfo] = useState([])
    const theme = useTheme()

    const handleOpen = async () => {
        const info = await fetchRaceInfo(url); // Fetch race information by using race.url
        setRaceInfo(info); // Store the race  information in the state variable

        //fetch trait information for each trait and store it in an array
        const fetchedTraitsWithInfo = await Promise.all(info.traits.map(async (trait) => {
          const traitInfo = await fetchTraitInfo(trait.url);
          return {...trait, ...traitInfo };
        }));
        setTraitsWithInfo(fetchedTraitsWithInfo)
        
        // store the race info in an array so that it can be easily displayed later
        const raceInfoItems = [
          {key: 'Alignment', value: info.alignment},
          {key: 'Age', value: info.age},
          {key: 'Speed', value: info.speed},
          {key: 'Size', value: info.size},
          {key: 'Language', value: info.languageDesc},
          {key: 'Bonus', value: info.abilityBonuses},
          {
            key: 'Traits',
            value: (
              <ul>
                {fetchedTraitsWithInfo.map((trait, i) => (
          <li key={i} style={{ listStyleType: 'none' }}>
          <TraitAccordions traitInfo={trait} />
                  </li>
                ))}
              </ul>
            ),
          },
        ];
        console.log(raceInfoItems)
        setOpen(true);
        setRaceInfoItems(raceInfoItems);
      };


    const handleClose = () => {
        setOpen(false);
    };

    const { updateCharacter, character } = useCharacter()

    // function to get the ability score modifier 
    const modifier = (abilityScore) => {
      let num = abilityScore - 10
      let result = Math.floor(num / 2)
      return result
    }

    const handleAddRace = () => {
      // Update the character context with the new race and its details
      updateCharacter({ race: race, raceDetails: raceInfo });
      handleClose();
    };
    
    
    const raceImageUrl = getRaceImage(race);

    const RaceImagePaper = (props) => (
      <div style={{ 
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
         }}>
      <ImagePaper {...props} />

    </div>
    );

  return (
    <CenteredColumn>
          <RaceImagePaper 
          src={raceImageUrl} 
          alt={race}
          onClick={handleOpen}
          title={race}
          />
        <CustomModal
          open={open}
          onClose={handleClose}
          aria-labelledby="race-modal-title"
          aria-describedby="race-modal-description"
        >
          <Box
            sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
          >
          <ResponsiveTypography type="title" align="center" id="race-modal-title">{race}</ResponsiveTypography>
          </Box>
          {raceInfo && (
            <div> 
              <ResponsiveTypography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
              <Table 
                aria-label={`{race.toLowerCase()}-info`} 
              >
                <TableBody>
                  {raceInfoItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row" align="center">
                        <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center'

                        }}
                        >
                        <ResponsiveTypography type="title">{item.key}:</ResponsiveTypography>
                        </Box>
                      <ResponsiveTypography>
                        {Array.isArray(item.value) ? (
                          <ul style={{textDecoration: 'none'}}>
                            {item.value.map((subitem, i) => {
                              if (subitem.name && subitem.bonus) {
                                return (
                                  <li key={i} style={{ listStyleType: 'none' }}>
                                  <ResponsiveTypography>
                                    {subitem.name} increases by {subitem.bonus}
                                    </ResponsiveTypography> 
                                  </li>
                                );
                              } else {
                                return<li key={i} style={{ listStyleType: 'none' }}>

                                  <ResponsiveTypography>
                                    {subitem}
                                  </ResponsiveTypography> 
                                  </li>
                                    }
                                  })}
                                </ul>
                              ) : (
                                item.value
                              )}
                              </ResponsiveTypography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>  
                </ResponsiveTypography>
              </div>
            )}
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <AddButton onClick={handleAddRace} style={{ marginTop: '2em', display: 'flex', flexDirection: 'column' }}>
                Add Race
              </AddButton>
            </div>
          </CustomModal>
      </CenteredColumn>
  )
}
