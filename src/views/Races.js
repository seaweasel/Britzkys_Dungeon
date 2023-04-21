import React, { useState, useEffect } from 'react';
import { getRaces, getRaceInfo, getTraitInfo } from '../utils/raceApi';
import RaceModal from '../components/RaceModal'
import { Box } from '@mui/material';
import { CenteredBox } from '../components/CustomBoxes';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CustomSlider } from '../components/CustomSlider';
import { ResponsiveTypography } from '../components/ResponsiveTypography';



export default function Races() {
    // variable to make sure user is authenticated
    const { authUser } = useAuth();
    // variable for useNaviagte
    const navigate = useNavigate();

    //check if the user is authenticated
    if (!authUser) {
      //if not redirect to sign in page
      navigate('signin');
    }
    //useState hook to create and update a state variable for all races 
    //initialized as an empty array
    //races is the state variable
    //setRaces updates the value of the state variable
    const [races, setRaces] = useState([]);
    //useEffect hook to fetch data 
    useEffect(() => {
      //function to fetch all races from raceApi
      async function fetchRaces() {
        const raceData = await getRaces();
        //update races state variable
        setRaces(raceData);
      }

      fetchRaces();
        }, []);
    
    //function to get race info
    const fetchRaceInfo = async (raceUrl) => {
      const info = await getRaceInfo(raceUrl);
      return info
    }

    //function to get trait info
    const fetchTraitInfo = async (traitUrl) => {
      const info = await getTraitInfo(traitUrl);
      return info;
    }
  
  
  
  return (
    <>
      <CenteredBox>
      <ResponsiveTypography type='title'>
        Choose Race
      </ResponsiveTypography>
      </CenteredBox>
      <Box sx={{ width: '100%', height: '500px', overflow: 'hidden' }}>
      <CustomSlider>
        {races.map((race) => (
            <RaceModal
              key={race.name}
              race={race.name}
              url={race.url}
              fetchRaceInfo={fetchRaceInfo}
              fetchTraitInfo={fetchTraitInfo}
            />
        ))}
      </CustomSlider>
      </Box>
    </>
  );
}

