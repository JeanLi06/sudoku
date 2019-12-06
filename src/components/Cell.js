import React from 'react'
import styled from 'styled-components'

//Définit une case de la grille de Sudoku, en générant une bodure
// pour séparer les régions. Index de 0 à 80.
const Cell = ({
                square_index, square_value, getCoordonates, getValue,
                clickedSquareHandler, getClickedSquare,
                validRows, validColumns, validZones
              }) => {

  const cellBackgroundColor = `#fedc10`
  const cellHoverColor = `#BADA55`
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

  const Cell = styled.button`
    width: 30px;
    height: 30px;
    vertical-align: bottom;
    padding: 0;
    display: inline-block;
    border: 1px solid dimgray;
    
  //Génération conditionnelle du style du bouton
  {border-bottom: ${hasBorderBottom()};
    
  {border-right: ${hasBorderRight()};
    
  {&:hover {background-color: ${isOverInputCell()};}
      
  background-color: ${isAnInputCell()}; 

  background-color: ${isClicked()};
   
  //Les choix utilisateurs ont été codés avec des valeurs négatives...
  (square_value < 0) && {
    font-family: Consolas, sans-serif;
    font-weight: bold;
    font-size: 19px;
    color: beige;}
`

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