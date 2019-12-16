import React from 'react'
import styled from 'styled-components'

const Difficulty = ({ handleDifficulty, difficulty }) => {

  const getNthChild = (difficulty) => {
    switch (difficulty) {
      case 'VeryEasy':
        return 1
      case 'Easy':
        return 2
      case 'Medium':
        return 3
      case 'Hard':
        return 4
      default:
        return 1
    }
  }

  const Difficulty = styled.p`
    span
      {&:hover {color: darkorange;}
      {&:nth-child(${getNthChild(difficulty)}) 
        {border: 2px solid #BADA55}
        {padding: 3px}
      }
  `
  return <Difficulty>
    <span onClick={handleDifficulty}>Très facile</span>
    <span onClick={handleDifficulty}> Facile</span>
    <span onClick={handleDifficulty}> Moyen</span>
    <span onClick={handleDifficulty}> Difficile</span>
  </Difficulty>
}

export default Difficulty
