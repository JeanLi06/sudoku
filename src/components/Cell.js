import React from 'react'
import styled, { css } from 'styled-components'
import { arrowFunctionExpression } from '@babel/types'

//Définit une case de la grille de Sudoku, en générant une bodure
// pour séparer les régions. Index de 0 à 80.
const Cell = ({
                  square_index, square_value, getCoordonates, getValue,
                  clickedSquareHandler, getClickedSquare, isRowValid
                }) => {

  const cellBackgroundColor = `#BADA55`
  const cellHoverColor = `chartreuse`
  const zoneBordercolor = `solid 3px grey`

  const isClicked = () => {
    return square_index === getClickedSquare() ? cellHoverColor : null
  }

  /* Si la case est modifiable, on colorie */
  const isAnInputCell = () => {
    return square_value === null || square_value < 0 ? cellBackgroundColor : null
  }

  //   Changement de couleur : que sur les cases modifiables
  const isOverInputCell = () => {
    return square_value === null || square_value < 0 ? cellHoverColor : null
  }

  const hasBorderBottom = () => {
    return ((square_index >= 18 && square_index <= 26) ||
    (square_index >= 45 && square_index <= 53) ? zoneBordercolor : null)
  }

  const hasBorderRight = () => {
    return (square_index - 2) % 9 === 0 || (square_index - 5) % 9 === 0 ? zoneBordercolor : null
  }
  //Génération conditionnelle du style du bouton
  const Cell = styled.button`
    width: 25px;
    height: 25px;
    vertical-align: bottom;
    padding: 0;
    display: inline-block;
    
  {border-bottom: ${hasBorderBottom()};
    
    {border-right: ${hasBorderRight()};
    
 { &:hover {background-color: ${isOverInputCell()};}
      
  background-color: ${isAnInputCell()}; 

   background-color: ${isClicked()};
   
  //Les choix utilisateurs ont été codés avec des valeurs négatives...
  (square_value < 0) && {
    font-family: Consolas, sans-serif;
    font-weight: bold;
    font-size: 19px;
    color: beige;}
    

`
  // let button_style = ['Square']
  // if ((square_index >= 18 && square_index <= 26) ||
  //   (square_index >= 45 && square_index <= 53)) {
  //   button_style.push('span-row')
  // }
  // if ((square_index - 2) % 9 === 0 || (square_index - 5) % 9 === 0) {
  //   button_style.push('span-column')
  // }
  // /* Si la case ne contient rien, on peut autorise la couleur au survol */
  // if (square_value === null || square_value < 0) {
  //   button_style.push('allowed-hover')
  // }
  // //Les choix utilisateurs ont été codés avec des valeurs négatives...
  // if (square_value < 0) {
  //   button_style.push('chosen-square')
  // }
  // if (square_index === getClickedSquare()) {
  //   button_style.push('clicked-square')
  // }
  // button_style = button_style.join(' ')

  return <Cell
    id={square_index}
    onClick={() => {
      getCoordonates(square_index)
      getValue(square_value)
      clickedSquareHandler(square_index)
    }}
  >
    {square_value !== null ? Math.abs(square_value) : null}
  </Cell>
}

export default Cell