import React from 'react'

export const titleCase = (words) => {
    let wordsArr = words.split(' ')
    let newWordsArr = []
    

    for (let i = 0; i < wordsArr.length; i++) {
        let newWords = wordsArr[i].charAt(0).toUpperCase() + wordsArr[i].slice(1)
        newWordsArr.push(newWords)
    }
    return newWordsArr.join(' ')
}

export const createSpace = (word_with_underscore) => {
    let newWords = word_with_underscore.replace(/_/g, ' ')
    return titleCase(newWords)
}

const renderValue = (value) => {
  if (typeof value === 'string') {
    return createSpace(value);
  }
  if (Array.isArray(value)) {
    return value.join(', ');
  }
  if (typeof value === 'object') {
    if (value.hasOwnProperty('dice_count') && value.hasOwnProperty('dice_value')) {
      return `${value.dice_count}d${value.dice_value}`;
    } else {
      return (
        <ul>
          {Object.entries(value).map(([key, subValue]) => (
            <li key={key} style={{ listStyleType: 'none' }}>
              {createSpace(key)}: {renderValue(subValue)}
            </li>
          ))}
        </ul>
      );
    }
  }
  return value;
};





export const ClassSpecificInfo = ({ classSpecific = {} }) => {
  if (Object.entries(classSpecific).length === 0) {
    return null;
  }
  return (
    <div>
      <ul>
        {Object.entries(classSpecific).map(([key, value]) => (
          <li key={key} style={{ listStyleType: 'none' }}>
            {createSpace(key)}: {renderValue(value)}
          </li>
        ))}
      </ul>
    </div>
  );
};
