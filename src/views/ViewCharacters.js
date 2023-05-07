import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCharacterData } from '../hooks/useCharacterData';
import { useNavigate } from 'react-router-dom';
import ImagePaper from '../components/ImagePaper';
import CharacterCards from '../components/CharacterCards';
import { Box } from '@mui/material';
import { ResponsiveTypography } from '../components/ResponsiveTypography';

export const ViewCharacters = () => {
  const { authUser, loading } = useAuth();
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const { characterData, loading: characterLoading } = useCharacterData(userId || '');

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!authUser) {
      navigate('/signin');
    } else {
      setUserId(authUser.uid);
    }
  }, [authUser, navigate, loading]);


  return (
    <>
      {loading || characterLoading ? (
        <div className='load-container'>
          <ImagePaper
            src={'/images/human.png'}
          />
          <div>Loading...</div>
        </div>
      ):(
        <>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <ResponsiveTypography type="title">
            Your Characters
          </ResponsiveTypography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '2em'
          }}
        >
        {characterData &&
          characterData.map((character) => (
            <>
              <CharacterCards character={character} />
            </>
          ))}
          </Box>
          </>
      )}
  </>
  )
}
