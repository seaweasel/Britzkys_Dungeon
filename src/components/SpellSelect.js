import React, { useState, useEffect } from 'react'
import { CustomPopover } from './CustomPopover'

export const SpellSelect = () => {
    const[spells, setSpells] = useState([])
    const[spell, setSpell] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null)


    useEffect(() => {
        const getSpells = async () => {
            const allSpells = []
            let currentPage = 1

            while(true) {
                const response = await fetch(`https://api.open5e.com/spells/?page=${currentPage}`)
                const data = await response.json()
                allSpells.push(...data)

                if (!data.length) break
                currentPage++
            }

            setSpells(allSpells)
        }

        getSpells()
    }, [])

   
        
    }
  return (
    <div>SpellSelect</div>
  )
}
