import React from 'react'
import 'uniqid'
import './App.css'

import Victory from './components/Victory'
import Cell from './components/Cell'
import Input from './components/Input'
import { getSudoku } from 'fake-sudoku-puzzle-generator'

//Les valeurs choisies par l'utilisateur sont représentées avec des nombre négatifs dans board
class App extends React.Component {
  //Un grille de sudoku facile et valide
  state = {
    initialBoard: [
      // 6, 0, 3, 0, 0, 4, 9, 5, 0,
      // 2, 0, 9, 0, 5, 0, 0, 1, 8,
      // 4, 0, 0, 0, 0, 8, 0, 0, 0,
      //
      // 0, 0, 0, 0, 1, 3, 0, 2, 6,
      // 8, 0, 0, 5, 0, 7, 0, 0, 4,
      // 9, 1, 0, 8, 4, 0, 0, 0, 0,
      //
      // 0, 0, 0, 4, 0, 0, 0, 0, 1,
      // 0, 6, 8, 7, 0, 0, 3, 0, 9,
      // 1, 2, 0, 0, 3, 0, 5, 0, 7
    ],
    board: [],
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
    clickedCell: null, //la case qui vient d'être cliquée
    chosenCells: [], //l'historique des cases choisies {index, valeur}
    clickedUserNumber: null, //La valeur choisie
    validRows: [],
    validColumns: [],
    validZones: []
  }

  async componentDidMount () {
    await this.generateBoard()
    let initialBoardCopy = [...this.state.initialBoard]
    //on initialise une copie de la grille initiale
    this.setState({ board: initialBoardCopy }, this.testValidity)
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
      this.setState({ validColumns: validColumns })
    }
  }

  // génère un tableau des lignes valides
  testRows = () => {
    let validRows = []
    for (let row = 0; row < 9; row++) {
      if (this.isRowValid(row)) {
        validRows.push(row)
      }
    }
    this.setState({ validRows: validRows })
  }

  // génère un tableau des zones valides
  testZones = () => {
    let validZones = []
    for (let zone = 0; zone < 9; zone++) {
      if (this.isZoneValid(zone)) {
        validZones.push(zone)
      }
    }
    this.setState({ validZones: validZones })
  }

  // Remplace la valeur dans la board, à l'index présent dans le state par la valeur transmise,
  // met à jour l'historique des cases (chosenCells), et efface le numéro du clickedCell
  //La valeur choisie est stockée avec une valeur négative, pour la différenciée d'avec les valeurs d'origine.
  setValueAtCell = (event, value) => {
    if (value === 'X') {
      let board = [...this.state.board]
      board[this.state.clickedCell] = null
      let chosenCells = [...this.state.chosenCells]
      chosenCells.pop()
      this.setState({ chosenCells: chosenCells })
      this.setState({ board: board })
    } else if
    ((!isNaN(value) || value === 0) && this.state.clickedCell !== null) {
      let board = [...this.state.board]
      board[this.state.clickedCell] = value * -1
      this.setState({ board: board })
      let chosenCells = [...this.state.chosenCells]
      chosenCells.push({
        index: this.state.clickedCell,
        value: value * -1
      })
      this.setState({ chosenCells: chosenCells })
    }
    //Comme setState est appelé de manière asychrone, il faut faire les test en callback
    this.setState({ clickedCell: null }, this.testValidity)
  }

  // Change la valeur sur la grille, aux coordonnees x,y
  setValueAtCoord = (x, y, value) => {
    // On fait une copie de la board pour ne pas la modifier directement
    let board = [...this.state.board]
    board[0] = value
    this.setState({ board: board })
  }

  //Récupère les coordonnéees de la case que l'on a cliquée
  getCoordonates = (cell_index) => {
    // console.log(cell_index);
    // console.log({
    //     x: cell_index % 9,
    //     y: Math.floor(cell_index / 9)
    // });
  }

  //Récupère la valeur de la case dont on donne l'index
  getValue = (cell_index) => {
    return this.state.board[cell_index]
  }

  //Retourne l'index de la case cliquée, stockée dans le state
  getClickedCell = () => {
    return this.state.clickedCell
  }

  // Génère une key unique, avec concaténation de l'index (pour les keys de liste). Utilise le module npm uniqid
  generateUniqueKey = (index) => {
    var uniqid = require('uniqid')
    return uniqid(index)
  }

  //Retourne true si une array fournie est valide
  // c.a.d. éléments uniques de 1 à 9
  //On peut tester ainsi une zone, une colonne ou une ligne
  isArrayFromSudokuValid = (array_to_test) => {
    // On récupère les valeurs de cette zone, en les passant  en absolu, et les null en 0
    let values_in_array = array_to_test.map(item => (item === null || item === 0) ? 0 : Math.abs(item))
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
    //9 zones (0-8), répérées avec le cell_index
    //On sélectionne la zone choisie
    let zone_values = []
    let zone_to_test = this.state.zones[zone_number]
    for (let i = 0; i < 9; i++) {
      zone_values.push(Math.abs(this.state.board[zone_to_test[i]]))
    }
    return this.isArrayFromSudokuValid(zone_values)
  }

  // retourne true si une ligne est valide c.a.d. éléments uniques de 1 à 9
  isRowValid = (row_number) => {
    //    On génère un tableau des cell_index correspondants à la ligne (0-8)
    let rowToTest = []
    for (let i = 0; i <= 8; i++) {
      rowToTest.push(this.state.board[i + row_number * 9])
    }
    return this.isArrayFromSudokuValid(rowToTest)
  }

  // retourne true si une colonne est valide c.a.d. éléments uniques de 1 à 9
  isColumnValid = (column_number) => {
    //    On génère un tableau des cell_index correspondants à la colonne (0-8)
    let columnToTest = []
    for (let i = 0; i <= 8; i++) {
      columnToTest.push(this.state.board[i * 9 + column_number])
    }
    return this.isArrayFromSudokuValid(columnToTest)
  }

  // Pour tester si on a gagné, on teste toutes les zonnes
  isBoardSolved = () => {
    let won = []
    for (let zone_number = 0; zone_number <= 8; zone_number++) {
      won.push(this.isZoneValid(zone_number))
    }
    return won.every(zone => zone === true)
  }

  clickedCellHandler = (cell_index) => {
    //On ne peut changer qu'un case vide, ou autorisée (valeur stockée < 0 )
    if (this.getValue(cell_index) === null || this.getValue(cell_index) <= 0) {
      this.setState({ clickedCell: cell_index })
      return cell_index
    } else {
      this.setState({ clickedCell: null })
      return null
    }
  }

  //Retourne true si valeur du cell a été choisie (<0), sinon il s'agit
  //d'une valeur d'origine non modifiable
  isChoosen = (cell_value) => {
    if (cell_value < 0) {
      return true
    }
    if (cell_value > 0) {
      return false
    }
  }

  generateBoard = () => {
    let newBoard = getSudoku('VeryEasy').flat()
    this.setState({ initialBoard: newBoard })
    this.setState({ board: newBoard }, () => this.testValidity())
  }

  solveBoard = () => {
    //pour test
    //On met en forme la board pour la passer à l'API (sous-tableaux pour les lignes)
    let initialBoardCopy = [...this.state.initialBoard]
    let boardToSolve = []
    initialBoardCopy = initialBoardCopy.map(item => item === null ? 0 : item)
    while (initialBoardCopy.length > 8) boardToSolve.push(initialBoardCopy.splice(0, 9))
    this.solveBoardWithAPI(boardToSolve)
  }

  //retourne un tableau dont les valeurs ont été mélangées aléatoirement
  // getShuffledArray = arr => {
  //   const newArr = arr.slice()
  //   for (let i = newArr.length - 1; i > 0; i--) {
  //     const rand = Math.floor(Math.random() * (i + 1));
  //     [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]]
  //   }
  //   return newArr
  // }

  solvedBoardFromAPI = (response) => {
    let state = { ...this.state }
    let boardSolved = []
    let boardFromAPI = response.flat()
    for (let index = 0; index <= 80; index++) {
      //TODO enlever le null
      //On génère la nouvelle grille, en gardant les cases vides initiales modifiables,
      // et les cases initiales non-modifiables
      boardSolved.push((state['initialBoard'][index] === null ||
        state['initialBoard'][index] === 0) ? boardFromAPI[index] * -1 : state['initialBoard'][index])
    }
    this.setState({ board: boardSolved }, () => this.testValidity())
  }

  solveBoardWithAPI = (boardToSolve) => {
    const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`, '')

    const encodeParams = (params) =>
      Object.keys(params)
        .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
        .join('&')

    const data = { board: boardToSolve }

    fetch('https://sugoku.herokuapp.com/solve', {
      method: 'POST',
      body: encodeParams(data),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then(response => this.solvedBoardFromAPI(response.solution))
      .catch(console.warn)
  }

  render () {
    return <>
      <h1>Sudoku</h1>
      <p>Restants : {this.state.board.filter(item => (item === null || item === 0)).length}</p>
      <p>Zones Valides : {this.state.validZones.length}</p>
      <p>Colonnes valides : {this.state.validColumns.length} — Lignes Valides : {this.state.validRows.length} </p>

      <div className="Board">
        {this.state.board.map((cell_value, cell_index) => (
          <Cell cell_value={cell_value}
                cell_index={cell_index}
                key={this.generateUniqueKey(cell_index)}
                getCoordonates={this.getCoordonates}
                getValue={this.getValue}
                isChoosen={this.isChoosen}
                clickedCellHandler={this.clickedCellHandler}
                getClickedCell={this.getClickedCell}
          />
        ))}
      </div>
      <div>
        <Input
          setValueAtCell={this.setValueAtCell}
          testRows={this.testRows}
        />
      </div>
      <div>
        <button
          style={{
            backgroundColor: 'darkorange',
            color: 'white',
            padding: '5 10px',
            fontSize: '18px',
            marginRight: '10px'
          }}
          onClick={this.generateBoard}>
          Générer
        </button>
        {!this.isBoardSolved() && <button
          style={{
            backgroundColor: '#fedc10',
            padding: '5 10px',
            fontSize: '18px',
            marginLeft: '10px'
          }}
          onClick={this.solveBoard}>
          Résoudre !
        </button>}
        </div>
        {this.isBoardSolved() && <Victory/>}
      </>
      }
      }

      export default App