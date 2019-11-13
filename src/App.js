import React from 'react';
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
        clickedSquare: '',
        inputValue: 'Valeur'
    };

    // Change la valeur sur la grille, aux coordonnees x,y
    setValueAtCoord = (x, y) => {
        // On fait une copie de la board pour ne pas la modifier directement
        let board = [...this.state.board];
        board[0] = 33;
        this.setState({board: board});
    };

    //Récupère les coordonnéees de la case que l'on a cliquée
    getCoordonates = (square_index) => {
        console.log(square_index);
        console.log({
            x: square_index % 9,
            y: Math.floor(square_index / 9)
        });
    };

    //Récupère la valeur de la case cliquée, et la passe à l'input
    getValue = (square_value) => {
        console.log(square_value);
    };

    clickedSquareHandler = () => {
        console.log("Evènement: ");
    };

    render() {
        return (
            <div>
                <h1>Sudoku</h1>
                <div className="Board">
                    {this.state.board.map((square_value, square_index, event) => (
                        <Square square_value={square_value}
                                square_index={square_index}
                                key={square_index}
                                getCoordonates={this.getCoordonates}
                                getValue={this.getValue}
                                clickedSquareHandler={this.clickedSquareHandler}
                        />
                    ))}
                </div>
                <div>
                    <Input value={this.state.inputValue}/>
                </div>
            </div>
        )
    }
}

export default App;
