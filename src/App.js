import React from 'react';
import './App.css';

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
        let board = this.state.board.slice();

        board[0] = 33;
        this.setState({board: board});
    };

    //Récupère les coordonnéees de la case que l'on a cliquée
    getCoordonatesOfClickedSquare = (index) => {
        // console.log(index.index);
        console.log({
            x: index.index % 9,
            y: Math.ceil(index.index / 9) - 1
        });
    };

    render() {
        return (
            <div className="App">
                {this.state.board.map((item, index) =>
                    <span>
                        {/*<button className="square" id={index} onClick={this.getCoordonatesOfClickedSquare}>*/}
                        <button className="square" id={index}
                                onClick={() => this.getCoordonatesOfClickedSquare({index})}>
                    {item}
                    </button>
                    </span>
                )}
            </div>
        )
    }
}

export default App;
