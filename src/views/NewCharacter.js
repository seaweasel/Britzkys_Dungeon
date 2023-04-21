import React, { useState, useEffect } from 'react'
import Races from './Races'
import { Classes } from './Classes'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { AbilityScores } from './AbilityScores'
import {  Box, Stepper, Step, StepLabel, Button } from '@mui/material'
import { useCharacter } from '../context/CharacterContext'
import AlignmentTable from './AlignmentTable'
import { Backgrounds } from './Backgrounds'
import { CharacterName } from './CharacterName'
import { ResponsiveTypography } from '../components/ResponsiveTypography'
import { handleSaveCharacter } from '../utils/handleSaveCharacter'




export const NewCharacter = () => {
  const [step, setStep] = useState(0)
   
  const { authUser, loading } = useAuth()
  const { character, characterId, removeCharacter } = useCharacter();
  const navigate = useNavigate()


  useEffect(() => {
    if (loading) {
      return;
    }

    if (!authUser) {
      navigate('/signin')
    } 
  
  }, [authUser, navigate, loading])

  //make sure all required fields are complete before rendering the save button
  const isCharacterComplete = () => {
    const requiredFields = [
      'name',
      'race',
      'class',
      'alignment',
      'background',
    ];
  
    const requiredAbilityScores = [
      'STR',
      'DEX',
      'CON',
      'INT',
      'WIS',
      'CHA',
    ];
  
    const characterFieldsComplete = requiredFields.every((field) => {
      const isComplete = character[field] !== undefined;
      if (!isComplete) {
        console.log(`Field '${field}' is not complete.`);
      }
      return isComplete;
    });
  
    const abilityScoresComplete = requiredAbilityScores.every((score) => {
      const isComplete = character.abilityScores && character.abilityScores[score] !== undefined;
      if (!isComplete) {
        console.log(`Ability score '${score}' is not complete.`);
      }
      return isComplete;
    });
  
    return characterFieldsComplete && abilityScoresComplete;
  };

  //Stepper for character builder
  const steps = [
    { label: 'Character Name', component: () => <CharacterName /> },
    { label: 'Ability Scores', component: () => <AbilityScores /> },
    { label: 'Race', component: () => <Races /> },
    { label: 'Class', component: () => <Classes /> },
    { label: 'Alignment', component: () => <AlignmentTable /> },
    { label: 'Background', component: () => <Backgrounds /> },
  ];

  //switch to render next button if current step is complete
  const isCurrentStepComplete = () => {
    
    const requiredAbilityScores = [
      'STR',
      'DEX',
      'CON',
      'INT',
      'WIS',
      'CHA',
    ];

    switch (step) {
      case 0:
        return character.name && character.name.trim() !== "";
      case 1:
        //check if all ability scores have been rolled
        return requiredAbilityScores.every(
          (score) => character.abilityScores && character.abilityScores[score] !== undefined
        );      
      case 2:
        return character.race !== undefined
      case 3:
        return character.class !== undefined
      case 4:
        return character.alignment !== undefined
      case 5:
        return character.background !== undefined
      default:
        return false
    }
  }

  const handleNext = () => {
    if (step < steps.length -1) setStep((prevStep) => prevStep + 1)
  };

  const handleBack = () => {
    if (step > 0) setStep((prevStep) => prevStep -1)
  }

  const handleFinish = async () => {
    const characterComplete = isCharacterComplete();
  
    if (characterComplete) {
      const success = await handleSaveCharacter(authUser, character, characterId, navigate);
      if (success) {
        removeCharacter();
      }
    } else {
      alert('Please complete all required fields before finishing.');
    }
  };

  const handleStepClick = (stepIndex) => {
    setStep(stepIndex)
  }
  
  useEffect(() => {
    console.log("Character updated in NewCharacter.js:", character);
  }, [character]);


  return (
    <>
    {loading ? (
      <div>Loading...</div>
    ) : (
      <>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}
      >
        <ResponsiveTypography type='title'>Create a New Character</ResponsiveTypography>
      </Box>
      <Stepper activeStep={step} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={step.label} sx={{ cursor: 'pointer' }}>
            <StepLabel onClick={() => handleStepClick(index)}
>
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      {step >= 0 && step < steps.length && <>{steps[step].component()}</>}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', m: 5 }}>
        {step > 0 && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleBack}
          >
            Back
          </Button>
        )}
        {step < steps.length - 1 && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleNext}
            disabled={!isCurrentStepComplete()}
          >
            Next
          </Button>
        )}
        {step === steps.length - 1 && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleFinish}
          >
            Finish
          </Button>
        )}
      </Box>
      </>
    )}
    </>
  )
}
