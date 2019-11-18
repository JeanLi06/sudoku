import React from 'react';
import 'uniqid';
import './App.css';
import Square from "./Square/Square";
import Input from "./Input/Input";

class App extends React.Component {
    //Un grille de sudoku facile et valide
    state = {
        board: [
            2, null, 9, null, 5, null, null, 1, 8,
            6, null, 3, null, null, 4, 9, 5, null,
            4, null, null, null, null, 8, null, null, null,

            null, null, null, null, 1, 3, null, 2, 6,
            8, null, null, 5, null, 7, null, null, 4,
            9, 1, null, 8, 4, null, null, null, null,

            null, null, null, 4, null, null, null, null, 1,
            null, 6, 8, 7, null, null, 3, null, 9,
            1, 2, null, null, 3, null, 5, null, 7
        ],
        clickedSquare: null, //la case qui vient d'être cliquée
        chosenSquares: [], //l'historique des cases choisies {index, valeur}
        clickedUserNumber: null
    };

    // Remplace la valeur dans la board, à l'index présent dans le state par la valeur transmise,
    // met à jour l'historique des cases, et efface le clickedSquare
    setValueAtSquare = (value) => {
        if (!isNaN(value) && this.state.clickedSquare !== null) {
            let board = [...this.state.board];
            board[this.state.clickedSquare] = value;
            this.setState({board: board});
            let chosenSquares = [...this.state.chosenSquares];
            chosenSquares.push({
                index: this.state.clickedSquare,
                value: value
            });
            this.setState({chosenSquares: chosenSquares});
            this.setState({clickedSquare: null});
            console.log(chosenSquares);

        }
    };

    // Change la valeur sur la grille, aux coordonnees x,y
    setValueAtCoord = (x, y, value) => {
        // On fait une copie de la board pour ne pas la modifier directement
        let board = [...this.state.board];
        board[0] = value;
        this.setState({board: board});
    };

    //Récupère les coordonnéees de la case que l'on a cliquée
    getCoordonates = (square_index) => {
        // console.log(square_index);
        // console.log({
        //     x: square_index % 9,
        //     y: Math.floor(square_index / 9)
        // });
    };

    //Récupère la valeur de la case dont on donne l'index
    getValue = (square_index) => {
        return this.state.board[square_index];
    };

    //Retourne l'index de la case cliquée, stockée dans le state
    getClickedSquare = () => {
        return this.state.clickedSquare;
    };

    // Génère une ID unique, avec concaténation de l'index (pour les keys de liste). Utilise le module npm uniqid
    generateUniqueID = (index) =>{
        var uniqid = require('uniqid');
        return uniqid(index);
    };

    clickedSquareHandler = (square_index) => {
        if (this.getValue(square_index) === null) {
            this.setState({clickedSquare: square_index});
            return square_index;
        } else {
            this.setState({clickedSquare: null});
            return null;
        }
    };

    render() {
        return <>
            <h1>Sudoku</h1>
            <p>Clické : {this.state.clickedSquare}</p>
            <div className="Board">
                {this.state.board.map((square_value, square_index) => (
                    <Square square_value={square_value}
                            square_index={square_index}
                            key={this.generateUniqueID(square_index)}
                            getCoordonates={this.getCoordonates}
                            getValue={this.getValue}
                            clickedSquareHandler={this.clickedSquareHandler}
                            getClickedSquare={this.getClickedSquare}
                    />
                ))}
            </div>
            <div>
                <Input setValueAtSquare={this.setValueAtSquare}/>
            </div>
        </>
    }
}

export default App;
