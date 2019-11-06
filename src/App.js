import React from 'react';
import './App.css';
import Square from "./Square";

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
        clickedSquare: ''
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

    render() {
        return (
            <div className="App">
                {this.state.board.map((square_value, square_index) => (
                    <Square square_value={square_value}
                            square_index={square_index}
                            key={square_index}
                            getCoordonates={this.getCoordonates}
                    />
                ))}
                <form action="">
                    <input type="text" defaultValue="-"/>
                    <input type="submit" value="Valider"/>
                </form>
            </div>
        )
    }
}

export default App;
