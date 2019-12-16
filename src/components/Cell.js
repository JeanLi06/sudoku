import React from 'react'
import styled from 'styled-components'

//Définit une case de la grille de Sudoku, en générant une bodure
// pour séparer les régions. Index de 0 à 80.
const Cell = ({
                cell_index, cell_value, getCoordonates, getValue,
                clickedCellHandler, getClickedCell
              }) => {

  const cell_background_color = `#fedc10`
  const cell_hover_color = `#BADA55`
  const zone_border_color = `solid 3px grey`

  const isClicked = () => {
    return cell_index === getClickedCell() ? cell_hover_color : null
  }

  /* Si la case est modifiable, on colorie */
  const isAnInputCell = () => {
    return cell_value === null || cell_value <= 0 ? cell_background_color : null
  }

  //   Changement de couleur : que sur les cases modifiables
  const isOverInputCell = () => {
    return cell_value === null || cell_value <= 0 ? cell_hover_color : null
  }

  const hasBorderBottom = () => {
    return ((cell_index >= 18 && cell_index <= 26) ||
    (cell_index >= 45 && cell_index <= 53) ? zone_border_color : null)
  }

  const hasBorderRight = () => {
    return (cell_index - 2) % 9 === 0 || (cell_index - 5) % 9 === 0 ? zone_border_color : null
  }

  const Cell = styled.button`
    width: 30px;
    height: 30px;
    vertical-align: bottom;
    padding: 0;
    display: inline-block;
    border: 1px solid dimgray;
    font-weight: bold;
    font-size: 18px;
    font-family: Montserrat;
    
  //Génération conditionnelle du style du bouton
  {border-bottom: ${hasBorderBottom()};
    
  {border-right: ${hasBorderRight()};
    
  {&:hover {background-color: ${isOverInputCell()};}
      
  background-color: ${isAnInputCell()}; 

  background-color: ${isClicked()};
   
  //Les choix utilisateurs ont été codés avec des valeurs négatives...
  (cell_value < 0) && {
    font-family: Consolas, sans-serif;
    font-weight: bold;
    font-size: 19px;
    color: beige;}
`

  return <Cell
    id={cell_index}
    onClick={() => {
      getCoordonates(cell_index)
      getValue(cell_value)
      clickedCellHandler(cell_index)
    }}
  >
    {(cell_value !== null && Math.abs(cell_value)) || cell_value === 0}
  </Cell>
}

export default Cell