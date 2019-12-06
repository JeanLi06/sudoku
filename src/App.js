import React from 'react'
import 'uniqid'
import './App.css'

import Victory from './components/Victory'
import Cell from './components/Cell'
import Input from './components/Input'

//Les valeurs choisies par l'utilisateur sont représentées avec des nombre négatifs dans board
//solvedBoard est la solution de la grille précalculée.
class App extends React.Component {
  //Un grille de sudoku facile et valide
  state = {
    board: [
      //Original line :
      // 2, null, 9, null, 5, null, null, 1, 8,
      //For debugging: choose 7 for empty cell of first line
      2, null, 9, 3, 5, 6, 4, 1, 8,
      //
      6, null, 3, null, null, 4, 9, 5, null,
      4, null, null, null, null, 8, null, null, null,

      null, null, null, null, 1, 3, null, 2, 6,
      8, null, null, 5, null, 7, null, null, 4,
      9, 1, null, 8, 4, null, null, null, null,

      null, null, null, 4, null, null, null, null, 1,
      null, 6, 8, 7, null, null, 3, null, 9,
      1, 2, null, null, 3, null, 5, null, 7
    ],
    solvedBoard: [
      2, 7, 9, 3, 5, 6, 4, 1, 8,
      6, 8, 3, 1, 7, 4, 9, 5, 2,
      4, 5, 1, 2, 9, 8, 6, 7, 3,
      7, 4, 5, 9, 1, 3, 8, 2, 6,
      8, 3, 2, 5, 6, 7, 1, 9, 4,
      9, 1, 6, 8, 4, 2, 7, 3, 5,
      3, 9, 7, 4, 8, 5, 2, 6, 1,
      5, 6, 8, 7, 2, 1, 3, 4, 9,
      1, 2, 4, 6, 3, 9, 5, 8, 7
    ],
    zones: [
      [0, 1, 2, 9, 10, 11, 18, 19, 20],
      [3, 4, 5, 12, 13, 14, 21, 22, 23],
      [6, 7, 8, 15, 16, 17, 24, 25, 26],
      [27, 28, 29, 36, 37, 38, 45, 46, 47],
      [30, 31, 32, 39, 40, 41, 48, 49, 50],
      [33, 34, 35, 42, 43, 44, 51, 52, 53],
      [54, 55, 56, 63, 64, 65, 72, 73, 74],
      [57, 58, 59, 66, 67, 68, 75, 76, 77],
      [60, 61, 62, 69, 70, 71, 78, 79, 80]
    ],
    clickedSquare: null, //la case qui vient d'être cliquée
    chosenSquares: [], //l'historique des cases choisies {index, valeur}
    clickedUserNumber: null, //La valeur choisie
    validRows: [],
    validColumns: [],
    validZones: []
  }

  testValidity = () => {
    this.testColumns()
    this.testRows()
    this.testZones()
  }

  // génère un tableau des colonnes valides
  testColumns = () => {
    let validColumns = []
    for (let column = 0; column < 9; column++) {
      if (this.isColumnValid(column)) {
        validColumns.push(column)
      }
      this.setState(this.state.validColumns = validColumns)
    }
  }

  // génère un tableau des lignes valides
  testRows = () => {
    console.log('testRows')
    let validRows = []
    for (let row = 0; row < 9; row++) {
      if (this.isRowValid(row)) {
        validRows.push(row)
      }
    }
    this.setState({validRows: validRows})
  }

  // génère un tableau des zones valides
  testZones = () => {
    let validZones = []
    for (let zone = 0; zone < 9; zone++) {
      if (this.isZoneValid(zone)) {
        validZones.push(zone)
      }
      this.setState(this.state.validZones = validZones)
    }
    // console.log(this.state.validZones)
    // return this.state.validZones
  }

  // Remplace la valeur dans la board, à l'index présent dans le state par la valeur transmise,
  // met à jour l'historique des cases (chosenSquares), et efface le numéro du clickedSquare
  //La valeur choisie est stockée avec une valeur négative, pour la différenciée d'avec les valeurs d'origine.
  setValueAtSquare = (event, value) => {
    if (value === 'X') {
      let board = [...this.state.board]
      board[this.state.clickedSquare] = null
      let chosenSquares = [...this.state.chosenSquares]
      chosenSquares.pop()
      this.setState({ chosenSquares: chosenSquares })
      this.setState({ board: board })
    } else if
    (!isNaN(value) && this.state.clickedSquare !== null) {
      let board = [...this.state.board]
      board[this.state.clickedSquare] = value * -1
      this.setState({ board: board })
      let chosenSquares = [...this.state.chosenSquares]
      chosenSquares.push({
        index: this.state.clickedSquare,
        value: value * -1
      })
      this.setState({ chosenSquares: chosenSquares })
    }
    //Comme setState est appelé de manière asychrone, il faut faire les test en callback
    this.setState({ clickedSquare: null }, this.testValidity)
  }

  // Change la valeur sur la grille, aux coordonnees x,y
  setValueAtCoord = (x, y, value) => {
    // On fait une copie de la board pour ne pas la modifier directement
    let board = [...this.state.board]
    board[0] = value
    this.setState({ board: board })
  }

  //Récupère les coordonnéees de la case que l'on a cliquée
  getCoordonates = (square_index) => {
    // console.log(square_index);
    // console.log({
    //     x: square_index % 9,
    //     y: Math.floor(square_index / 9)
    // });
  }

  //Récupère la valeur de la case dont on donne l'index
  getValue = (square_index) => {
    return this.state.board[square_index]
  }

  //Retourne l'index de la case cliquée, stockée dans le state
  getClickedSquare = () => {
    return this.state.clickedSquare
  }

  // Génère une key unique, avec concaténation de l'index (pour les keys de liste). Utilise le module npm uniqid
  generateUniqueKey = (index) => {
    var uniqid = require('uniqid')
    return uniqid(index)
  }

  //Retourne true si une array fournie est valide
  // c.a.d. éléments uniques de 1 à 9
  //On teste ainsi, une zone, une colonne ou une ligne
  isArrayFromSudokuValid = (array_to_test) => {
    // On récupère les valeurs de cette zone, en les passant  en absolu, et les null en 0
    let values_in_array = array_to_test.map(item => item === null ? 0 : Math.abs(item))
    //On enlève les répétitions (dans un Set, les valeurs sont uniques...)
    const unique_values_in_zone = [...new Set(values_in_array)]
    // On réduit la zone à une somme des ses éléments
    let reduced_array = unique_values_in_zone.reduce((accumulator, currentValue) =>
      accumulator + currentValue)
    //    Si la somme des éléments uniques est égal à 45, la zone est valide (1+2+3...+9)
    return reduced_array === 45
  }

  /*Teste si une des 9 zones est valide (que des chiffres uniques 1-9)
  1|2|3
  4|5|6
  7|8|9
  */
  isZoneValid = (zone_number) => {
    //9 zones (0-8), répérées avec le square_index
    //On sélectionne la zone choisie
    let zone_to_test = this.state.zones[zone_number]
    return this.isArrayFromSudokuValid(zone_to_test)
  }

  // retourne true si une ligne est valide c.a.d. éléments uniques de 1 à 9
  isRowValid = (row_number) => {
    //    On génère un tableau des square_index correspondants à la ligne (0-8)
    let rowToTest = []
    for (let i = 0; i <= 8; i++) {
      rowToTest.push(this.state.board[i + row_number * 9])
    }
    return this.isArrayFromSudokuValid(rowToTest)
  }

  // retourne true si une colonne est valide c.a.d. éléments uniques de 1 à 9
  isColumnValid = (column_number) => {
    //    On génère un tableau des square_index correspondants à la colonne (0-8)
    let columnToTest = []
    for (let i = 0; i <= 8; i++) {
      columnToTest.push(this.state.board[i * 9 + column_number])
    }
    return this.isArrayFromSudokuValid(columnToTest)
  }

  // Pour tester si on a gagné, on teste toutes les zonnes
  isBoardSolved = () => {
    let won = []
    for (let zone_number = 0; zone_number < 9; zone_number++) {
      won.push(this.isZoneValid(zone_number))
    }
    return won.every(zone => zone === true)
  }

  clickedSquareHandler = (square_index) => {
    //On ne peut changer qu'un case vide, ou autorisée (valeur stockée < 0 )
    if (this.getValue(square_index) === null || this.getValue(square_index) < 0) {
      this.setState({ clickedSquare: square_index })
      return square_index
    } else {
      this.setState({ clickedSquare: null })
      return null
    }
  }

  //Retourne true si valeur du square a été choisie (<0), sinon il s'agit
  //d'une valeur d'origine non modifiable
  isChoosen = (square_value) => {
    if (square_value < 0) {
      return true
    }
    if (square_value > 0) {
      return false
    }
  }

  solveBoard = () => {
    let board = { ...this.state }
    board['board'].map((value, index) =>
      value != null ? board['solvedBoard'][index] * -1 : -1
    )
    this.setState(board)
  }

  render () {
    return <>
      <h1>Sudoku</h1>
      <p>Restants : {this.state.board.filter(item => item === null).length}</p>
      {this.isBoardSolved() && <Victory/>}
      <p>Zones Valides : {this.state.validZones.length}</p>
      <p>Colonnes valides : {this.state.validColumns.length} — Lignes Valides : {this.state.validRows.length} </p>

      <div className="Board">
        {this.state.board.map((square_value, square_index) => (
          <Cell square_value={square_value}
                square_index={square_index}
                key={this.generateUniqueKey(square_index)}
                getCoordonates={this.getCoordonates}
                getValue={this.getValue}
                isChoosen={this.isChoosen}
                clickedSquareHandler={this.clickedSquareHandler}
                getClickedSquare={this.getClickedSquare}
          />
        ))}
      </div>
      <div>
        <Input
          setValueAtSquare={this.setValueAtSquare}
          testRows={this.testRows}
        />
      </div>
      <button
        style={{
          backgroundColor: 'darkorange',
          color: 'white',
          padding: '5px'
        }}
        onClick={this.solveBoard}>
        Résoudre !
      </button>
    </>
  }
}

export default App