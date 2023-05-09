import React from 'react';
import { useCharacter } from '../context/CharacterContext';

export const HPCard = () => {
  const { class: characterClass, abilityScores } = useCharacter();

  const calculateHP = () => {
    const hitDie = characterData.hit_dice.slice(2);
    const conModifier = abilityScores.Con.modifier; // Accessing the Constitution modifier

    return parseInt(hitDie, 10) + conModifier;
  };

  return <div>HP: {calculateHP()}</div>;
};
