import React, { useState, useEffect } from 'react'
import { CustomPopover } from './CustomPopover'
import { Button, Typography } from '@mui/material'


export const WeaponSelect = () => {
    const [weapons, setWeapons] = useState([])
    const [weapon, setWeapon] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null)

    useEffect(() => {
        const getWeapons = async () => {
            const response = await fetch('https://api.open5e.com/weapons/') 
            const data = await response.json()
            console.log('Weapon Data: ', data) 
        }
        setWeapons(data.results)

        getWeapons()
    }, [])

    const handleWeaponClick = (event, weapon) => {
      setAnchorEl(event.currentTarget);
      setWeapon(weapon)
    }
    const handlePopoverClose = () => {
      setAnchorEl(null)
      setWeapon(null)
    }
    const open = Boolean(anchorEl);

    const weaponContent = weapon && [
      `Name: ${weapon.name}`,
      `Category: ${weapon.category}`,
      `Cost: ${weapon.cost}`,
      `Damage: ${weapon.damage_dice} ${weapon.damage_type}`,
      `Weight: ${weapon.weight}`,
      `Properties: ${weapon.properties.join(', ')}`
    ];

    return (
      <>
      {weapons.map((weapon) => (
        <Button
          key={weapon.slug}
          onClick={(event) => handleWeaponClick(event, weapon)}
        >
          {weapon.name}
        </Button>
      ))}
      <CustomPopover  
        anchorEl={anchorEl}
        handlePopoverClose={handlePopOverClose}
        content={weaponContent}
      />
      </>
    )
}
