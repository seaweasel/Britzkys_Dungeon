import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useCharacter } from '../context/CharacterContext';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { useAuth } from '../context/AuthContext';
import { UpdateCharacter } from '../views/UpdateCharacter';
import ImagePaper from './ImagePaper';
import { useNavigate } from 'react-router-dom';

export default function CharacterCards({character}) {
  const { authUser } = useAuth()
  const { updateCharacter } = useCharacter()
  const userId = authUser.uid;
  const [updateName, setUpdateName] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [card, setCard] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchImageUrl = async () => {
      const url = await getImageUrl(String(character.race), String(character.class.name))
      setImageUrl(url)
    }
    fetchImageUrl()
  }, [character])

 
  // Convert the abilityScores object into an array
  const abilityScoresArray = character.abilityScores
    ? Object.entries(character.abilityScores).map(([key, value]) => ({
    name: key,
    ...value,
  }))
  : [];


  //delete character from database
  const handleDeleteCharacter = async (character) => {
    const characterId = character.id
    if (!characterId) {
        console.log('No character selected')
        return
    }
    try {
        console.log('Deleting character:', characterId)
        const characterRef = doc(db, 'users', userId, 'characters', characterId)
        await deleteDoc(characterRef)
  
        updateCharacter({})
  
        console.log('Character deleted:', characterId)
    } catch (error) {
        console.error('Error deleting character:', error)
    }
  }
  

//function to get image
const getImageUrl = async (race, className) => {
  const imageName = `${race.toLowerCase()}-${className.toLowerCase()}`;
  const imageExtensions = ['.jpg', '.png'];

  for (const ext of imageExtensions) {
    const imageUrl = `/images/combo/${imageName}${ext}`;

    try {
      const response = await fetch(imageUrl);
      if (response.ok) {
        return imageUrl;
      }
    } catch (error) {
      console.error(`Error fetching image for race: ${race}, class: ${className}`, error);
    }
  }

  console.error(`Image not found for race: ${race}, class: ${className}`);
  return "";
};



//revert to original state after clicking cancel
const cancelUpdateName = () => {
  setUpdateName(false)
}

  const handleNameChange = () => {
    updateCharacter(character)
    navigate('/updatecharacter')
  }

  const handleImageClick = () => {
    setCard(true)
  }
  const handleBackButton = () => {
    setCard(false)
  }

  const handleSelectButton = () => {
    navigate(`/charactersheet/${character.id}`)
  }

  return (
    <>
    {updateName ? (
        <UpdateCharacter onCancel={cancelUpdateName} />
    ) : card ? (
   <Card sx={{ maxWidth: 345 }}>
   <CardMedia
     sx={{ height: 300 }}
     image={imageUrl}
     title={character.name}
   />
   <CardContent>
     <Typography gutterBottom variant="h6">
       {character.name}
     </Typography>
     <Typography variant="body2">
       Race: {character.race}
     </Typography>
     <Typography variant="body2">
       Class: {character.class.name}
     </Typography>
     <Typography variant="body2">
       Alignment: {character.alignment.name}
     </Typography>
     <Typography variant="body2">
       Backgorund: {character.background.name}
     </Typography>
     {abilityScoresArray.map((abilityScore) => (
       <Typography key={abilityScore.name} variant="body2">
         {abilityScore.name}: {abilityScore.score} (Modifier: {abilityScore.modifier})
       </Typography>
     ))}
   </CardContent>
   <CardActions>
      <Button 
       size="small"
       onClick={() => {
        handleNameChange();
      }}
       sx={{
         color: '#fdf0d5',
         '&:hover':{
           backgroundColor: '#669bbc'
         } 
       }}
      >
      Name
      </Button>
      <Button 
       size="small"
       onClick={() => handleDeleteCharacter(character)}
       sx={{
         color: '#fdf0d5',
         '&:hover':{
           backgroundColor: '#c1121f'
         } 
       }}
      >
      Kill
      </Button>
      <Button 
       size="small"
       onClick={handleBackButton}
       sx={{
         color: '#fdf0d5',
         '&:hover':{
           backgroundColor: '#669bbc'
         } 
       }}
      >
      Back
      </Button>
      <Button 
       size="small"
       onClick={handleSelectButton}
       sx={{
         color: '#fdf0d5',
         '&:hover':{
           backgroundColor: '#669bbc'
         } 
       }}
     >Select</Button>
   </CardActions>
 </Card>
    ) : (
      <ImagePaper
        src={imageUrl}
        alt={character.name}
        onClick={handleImageClick}
        title={character.name}
      />
    )}
 
    </>
  );
}
