import React from "react";
import './Square.css';

//Définit une case de la grille de Sudoku, en générant une bodure
// pour séparer les régions. Index de 0 à 80.
const Square = ({square_index, square_value, getCoordonates, getValue, clickedSquareHandler, getClickedSquare}) => {
    return <span className={"span-square " +
    (((square_index >= 18 && square_index <= 26) ||
        (square_index >= 45 && square_index <= 53)
    ) ? 'span-row ' : '') +
    ((((square_index - 2) % 9 === 0 || (square_index - 5) % 9 === 0
    )) ? 'span-column' : '')
    }>
        {/* Si la case ne contient rien, on peut changer la couleur au survol */}
        <button className={"Square" +
        (square_value === null ? " allowed-hover" : '') +
        (square_index === getClickedSquare() ? " clicked-square" : '')
        }
                id={square_index}
                key={square_index}
                onClick={() => {
                    getCoordonates(square_index);
                    getValue(square_value);
                    clickedSquareHandler(square_index);
                }}
        >
            {square_value}
        </button>
        </span>;
};

export default Square;