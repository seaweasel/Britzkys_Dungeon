import React, { useState, useEffect } from 'react'
import axios from 'axios'

const fetchSpells = async () => {
  const baseUrl = 'https://api.open5e.com/spells/';
  const totalPages = 17
  const pageUrls = Array.from({length: totalPages }, (_, i) => `${baseUrl}?format=json&page=${i + 1}`)

  try {
    const allPagesData = await Promise.all(pageUrls.map(url => axios.get(url)))
    const allSpells = allPagesData.flatMap(pageData => pageData.data.results)
    return allSpells
  } catch (error) {
    console.error('Error fetching spells:', error);
    return []
  }
}

const useSpells = () => {
    const [spells, setSpells] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAndSetSpells = async () => {
            setLoading(true);
            const fetchedSpells = await fetchSpells()
            setSpells(fetchedSpells)
            setLoading(false)
        }
        
        fetchAndSetSpells()

    }, []);

    return {spells, loading}
};

export default useSpells