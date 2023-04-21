import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getAbilityScores } from '../utils/abilityScoresApi';
import { getSkillInfo } from '../utils/skillApi'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import { useCharacter } from '../context/CharacterContext';
import { CustomPopover } from './CustomPopover';

export default function AbilityScoresCards() {
  //store ability scores
  const [abilityScores, setAbilityScores] = useState([])
  //store dice rolls for ability scores
  const [rollResults, setRollResults] = useState({})
  //store the name of the expanded card
  const [expandedCard, setExpandedCard] = useState(null)
  //track the number of rolls
  const [rolls, setRolls] = useState(0)
  //track the skill popover
  const [selectedSkill, setSelectedSkill] = useState(null)

    const {authUser} = useAuth()

    const navigate = useNavigate()

    if (!authUser) {
      navigate('signin')
    }

    //open the skill modal
    const openSkillPopover = async (event, skill) => {
      const skillUrl = skill.url;
      const skillInfo = await getSkillInfo(skillUrl);
      setSelectedSkill({ anchorEl: event.currentTarget, skillInfo });
    };

    //close the skill modal
    const closeSkillPopover = () => {
      setSelectedSkill(null)
    }

    //get ability score data
    useEffect(() => {
      async function fetchAbilityScores() {
        const abilityScoreData = await getAbilityScores()
        setAbilityScores(abilityScoreData)
      }

      fetchAbilityScores()
    }, [])

    //function to roll dice for ability score
    const generateAbilityScore = () => {
      
      let numbers = [];

      while (numbers.length < 4) {
          numbers.push(Math.floor(Math.random() * 6) + 1)
      }

      const minIndex = numbers.indexOf(Math.min(...numbers));
      numbers.splice(minIndex, 1);

      const total = numbers.reduce((accumulator, currentValue) => accumulator + currentValue);

      return total
    }
    
    // function to get the ability score modifier 
    const modifier = (abilityScore) => {
      let num = abilityScore - 10
      let result = Math.floor(num / 2)
      return result
  }

    const { updateCharacter, character } = useCharacter()

    const handleRollClick = async (abilityScoreName) => {
      const result = generateAbilityScore()
      const abilityScoreModifier = modifier(result)
      setRollResults({ ...rollResults, [abilityScoreName]: {score: result, modifier: abilityScoreModifier} })
        // Update the character object with the new ability score and modifier value
      const updatedCharacter = {
        ...character,
        abilityScores: { 
          ...character.abilityScores,
          [abilityScoreName]: {
            score: result,
            modifier: abilityScoreModifier
          },
        },
      }

      // Log the current and updated character objects
      console.log('Current character:', character);
      console.log('Updated character:', updatedCharacter);
      // Save the updated character to the database
      await updateCharacter(updatedCharacter);

      setRolls(rolls + 1)
    }

    
    
    const handleLearnMoreClick = (name) => {
      if (expandedCard === name) {
        setExpandedCard(null);
      } else {
        setExpandedCard(name);
      }
    };

  return (
      <>
<CustomPopover
  anchorEl={selectedSkill ? selectedSkill.anchorEl : null}
  handlePopoverClose={closeSkillPopover}
  content={
    selectedSkill
      ? [
          `Name: ${selectedSkill.skillInfo.name}`,
          `Description: ${selectedSkill.skillInfo.description}`,
        ]
      : []
  }
/>


          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1em',
          }}>
        {abilityScores.map((abilityScore, index) => (
          <Box key={abilityScore.name}>
          <Card sx={{
             maxWidth: 345,
             backgroundColor: 'rgb(0, 48, 73, .7)'
             }}>
            <CardContent>
              <Typography gutterBottom variant="h6">
                {abilityScore.fullName}
              </Typography>
              <Typography variant="body">
                {abilityScore.name}{' '}
                {rollResults[abilityScore.name] && (
                  <>
                  <Typography variant="body1">
                    {rollResults[abilityScore.name].score}
                  </Typography>
                  <Typography variant="body2">
                  {" "}
                  (Mod: {rollResults[abilityScore.name].modifier})
                </Typography>
                  </>
                )}
              </Typography>
              {expandedCard === abilityScore.name && (
                <>
                  <Typography variant="body2" component="p">
                    {abilityScore.description}
                  </Typography>
                  <Typography variant="body2" component="p">
                    <strong>Skills:</strong>
                  </Typography>
                  <ul>
                    {abilityScore.skills.map((skill) => (
                      <Button
                        size="large"
                        onClick={(event) => openSkillPopover(event, skill)}
                        sx={{
                          color: '#fdf0d5',
                          '&:hover': {
                            backgroundColor: '#669bbc',
                          },
                        }}
                      >
                        {skill.name}
                      </Button> 
                    ))}
                  </ul>
                </>
              )}
            </CardContent>
            <CardActions>
              {!rollResults[abilityScore.name] && (
                <Button 
                size="small" 
                onClick={() => handleRollClick(abilityScore.name)}
                sx={{
                  color: '#fdf0d5',
                  '&:hover':{
                    backgroundColor: '#c1121f'
                  } 
                }}
                >
                  Roll
                </Button>
              )}
              <Button 
              size="small" 
              onClick={() => handleLearnMoreClick(abilityScore.name)}
              sx={{
                color: '#fdf0d5',
                '&:hover':{
                  backgroundColor: '#669bbc'
                } 
              }}
              >
                Learn More
              </Button>
            </CardActions>
          </Card>
          </Box>
        ))}
      </Box>
    </>
  );
}