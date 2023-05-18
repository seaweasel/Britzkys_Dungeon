import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { getAlignment } from '../utils/alignmentApi';
import { ResponsiveTypography } from '../components/ResponsiveTypography';
import { AlingmentImageList } from '../components/AlingmentImageList';


export default function AlignmentTable() {
  const [alignments, setAlignments] = useState([])

  useEffect(() => {
    async function fetchAlignments() {
      const alignmentData = await getAlignment()
      setAlignments(alignmentData)
    }

    fetchAlignments()
  }, [])

  const getAlignmentDescription = (title) => {
    const alignment = alignments.find(
      (alignment) => alignment.name.toLowerCase() === title.toLowerCase()
    );
    return alignment ? alignment.description : '';
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ResponsiveTypography type='title'>Choose your Alignment </ResponsiveTypography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <AlingmentImageList itemData={itemData} description={getAlignmentDescription} alignments={alignments} />
      </Box>
    </>
  );
}

const itemData = [
    {
        img: '/images/alignment/lawful-good.jpg',
        title: 'Lawful good'
    },
    {
        img: '/images/alignment/neutral-good.jpg',
        title: 'Neutral good'
    },
    {
        img: '/images/alignment/chaotic-good.jpg',
        title: 'Chaotic good'
    },
    {
        img: '/images/alignment/lawful-neutral.jpg',
        title: 'Lawful neutral'
    },
    {
        img: '/images/alignment/neutral.jpg',
        title: 'Neutral'
    },
    {
        img: '/images/alignment/chaotic-neutral.jpg',
        title: 'Chaotic Neutral'
    },
    {
        img: '/images/alignment/lawful-evil.jpg',
        title: 'Lawful Evil'
    },
    {
        img: '/images/alignment/neutral-evil.jpg',
        title: 'Neutral Evil'
    },
    {
        img: '/images/alignment/chaotic-evil.jpg',
        title: 'Chaotic Evil'
    },
]