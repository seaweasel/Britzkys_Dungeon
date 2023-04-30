import React, { useState } from 'react'
import useSpells from '../hooks/useSpells'
import { ResponsiveTypography } from './ResponsiveTypography'
import Autocomplete from '@mui/material/Autocomplete';
import { Box, TextField } from '@mui/material'
import { CustomModal } from './CustomModal';
import { useModal } from '../context/ModalContext';

export const SpellSearch = () => {
  const { spells, loading } = useSpells()
  const {modalOpen, openModal, closeModal} = useModal()
  const [selectedSpell, setSelectedSpell] = useState('')
  const [spellNotFound, setSpellNotFound] = useState(false)

  const handleInputChange= (event, value) => {
    setSpellNotFound(false);

    const spell = spells.find(spell => spell.name.toLowerCase() === value.toLowerCase())

    if (spell) {
      setSelectedSpell(spell)
      openModal()
    } else {
      setSelectedSpell('')
      closeModal()
      if (value.trim()) {
        setSpellNotFound(true)
      }
    }
  }

  return (
    <>
    <Box
      sx={{
        height: 'auto',
        display:'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
    <ResponsiveTypography type='title'>Search for a spell</ResponsiveTypography>
    <Autocomplete
      options={spells}
      getOptionLabel={(option) => option.name}
      loading={loading}
      renderInput={(params) => 
        <TextField
          {...params}
          label="Search Spells" 
          variant="outlined"
          inputProps={{ ...params.inputProps, style: { width: '100%' } }}
        />}
      onInputChange={handleInputChange}
    />
    </Box>
    <CustomModal
      open={modalOpen}
      onClose={closeModal}
      aria-labelledby="spell-modal-title"
      aria-describedby="spell-modal-description"
    >
    {selectedSpell && (
      <>
      <Box
        key={selectedSpell.slug}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ResponsiveTypography type='title'>{selectedSpell.name}</ResponsiveTypography>
        <ResponsiveTypography type='title'>Description:</ResponsiveTypography>
        <ResponsiveTypography>{selectedSpell.desc}</ResponsiveTypography>
        <ResponsiveTypography type='title'>Higher Level:</ResponsiveTypography>
        <ResponsiveTypography>{selectedSpell.higher_level}</ResponsiveTypography>
        <ResponsiveTypography type='title'>Range:</ResponsiveTypography>
        <ResponsiveTypography>{selectedSpell.range}</ResponsiveTypography>
        <ResponsiveTypography type='title'>Material:</ResponsiveTypography>
        <ResponsiveTypography>{selectedSpell.material}</ResponsiveTypography>
        <ResponsiveTypography type='title'>Ritual:</ResponsiveTypography>
        <ResponsiveTypography>{selectedSpell.ritual}</ResponsiveTypography>
        <ResponsiveTypography type='title'>Duration:</ResponsiveTypography>
        <ResponsiveTypography>{selectedSpell.duration}</ResponsiveTypography>
        <ResponsiveTypography type='title'>Concentration:</ResponsiveTypography>
        <ResponsiveTypography>{selectedSpell.concentration}</ResponsiveTypography>
        <ResponsiveTypography type='title'>Casting Time:</ResponsiveTypography>
        <ResponsiveTypography>{selectedSpell.casting_time}</ResponsiveTypography>
        <ResponsiveTypography type='title'>Level:</ResponsiveTypography>
        <ResponsiveTypography>{selectedSpell.level}</ResponsiveTypography>
        <ResponsiveTypography type='title'>School:</ResponsiveTypography>
        <ResponsiveTypography>{selectedSpell.school}</ResponsiveTypography>
        <ResponsiveTypography type='title'>Class:</ResponsiveTypography>
        <ResponsiveTypography>{selectedSpell.dnd_class}</ResponsiveTypography>
        <ResponsiveTypography type='title'>Archtype:</ResponsiveTypography>
        <ResponsiveTypography>{selectedSpell.archtype}</ResponsiveTypography>
        <ResponsiveTypography type='title'>Circles:</ResponsiveTypography>
        <ResponsiveTypography>{selectedSpell.circles}</ResponsiveTypography>
      </Box>
      </>
    )}
    </CustomModal>
    </>
  )
}
