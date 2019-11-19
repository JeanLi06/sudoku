import React from 'react';
import 'uniqid';
import './App.css';
import Square from "./Square/Square";
import Input from "./Input/Input";

//Les valeurs choisies par l'utilisateur sont représentées avec des nombre négatifs dans board
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
        zones : [
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
        clickedUserNumber: null
    };

    // Remplace la valeur dans la board, à l'index présent dans le state par la valeur transmise,
    // met à jour l'historique des cases, et efface le clickedSquare
    //La valeur choisie est stockée avec une valeur négative, pour la différenciée d'avec les valeurs d'origine.
    setValueAtSquare = (value) => {
        if (!isNaN(value) && this.state.clickedSquare !== null) {
            let board = [...this.state.board];
            board[this.state.clickedSquare] = value * -1;
            this.setState({board: board});
            let chosenSquares = [...this.state.chosenSquares];
            chosenSquares.push({
                index: this.state.clickedSquare,
                value: value * -1
            });
            this.setState({chosenSquares: chosenSquares});
            this.setState({clickedSquare: null});
            // console.log(chosenSquares);
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

    // Génère une key unique, avec concaténation de l'index (pour les keys de liste). Utilise le module npm uniqid
    generateUniqueKey = (index) => {
        var uniqid = require('uniqid');
        return uniqid(index);
    };

    /*Teste si une des 9 zones est valide (que des chiffres uniques 1-9)
    1|2|3
    4|5|6
    7|8|9
    */

    isZoneValid = (zone_number) => {
        //9 zones (0-8), répérées avec le square_index
        //On sélectionne la zone choisie
        let zone_to_test = this.state.zones[zone_number];
        return this.isArrayFromSudokuValid(zone_to_test);
    };

    //Permet de tester si une ligne, une colonne, ou une zone est valide
    // c.a.d. éléments uniques de 1 à 9
    isArrayFromSudokuValid = (array_to_test) => {
        // On récupère les valeurs de cette zone
        let values_in_zone = array_to_test.map((value) => Math.abs(this.state.board[value]));
        //On enlève les répétitions (dans un Set, les valeurs sont uniques...)
        const unique_values_in_zone = [...new Set(values_in_zone)];
        // On réduit la zone à un produit des ses éléments
        let reduced_zone = unique_values_in_zone.reduce((accumulator, currentValue) => accumulator + currentValue);
        //    Si la somme des éléments uniques est égal à 45, la zone est valide (1+2+3...+9)
        console.log(reduced_zone);
        return reduced_zone === 45;
    };

    clickedSquareHandler = (square_index) => {
        //On ne peut changer qu'un case vide, ou autorisée (valeur stockée < 0 )
        if (this.getValue(square_index) === null || this.getValue(square_index) < 0) {
            this.setState({clickedSquare: square_index});
            return square_index;
        } else {
            this.setState({clickedSquare: null});
            return null;
        }
    };

    //Retourne true si valeur du square a été choisie (<0), sinon il s'agit
    //d'une valeur d'origine non modifiable
    isChoosen = (square_value) => {
        // console.log(square_value);
        if (square_value < 0) {
            console.log('true');
            return true;
        }
        if (square_value > 0) {
            console.log('false');
            return false;
        }
    };

    render() {
        this.isZoneValid(4);
        return <>
            <h1>Sudoku</h1>
            <p>Restants : {this.state.board.filter(item => item === null).length}</p>
            <div className="Board">
                {this.state.board.map((square_value, square_index) => (
                    <Square square_value={square_value}
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
                <Input setValueAtSquare={this.setValueAtSquare}/>
            </div>
        </>
    }
}

export default App;