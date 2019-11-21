import React from "react";
import './Square.css';

//Définit une case de la grille de Sudoku, en générant une bodure
// pour séparer les régions. Index de 0 à 80.
const Square = ({
                    square_index, square_value, getCoordonates, getValue,
                    clickedSquareHandler, getClickedSquare, isRowValid
                }) => {
    //Génération conditionnelle du style du span (génération des zones)
    let span_style = ['span-square'];
    if ((square_index >= 18 && square_index <= 26) ||
        (square_index >= 45 && square_index <= 53)) {
        span_style.push('span-row');
    }
    if ((square_index - 2) % 9 === 0 || (square_index - 5) % 9 === 0) {
        span_style.push('span-column');
    }
    span_style = span_style.join(' ');

    //Génération conditionnelle du style du bouton
    let button_style = ['Square'];
    /* Si la case ne contient rien, on peut autorise la couleur au survol */
    if (square_value === null || square_value < 0) {
        button_style.push('allowed-hover');
    }
    if (square_value < 0) {
        //Les choix utilisateurs ont été codés avec des valeurs négatives...
        button_style.push('chosen-square');
    }
    if (square_index === getClickedSquare()) {
        button_style.push('clicked-square');
    }
    button_style = button_style.join(' ');

    return <span className={span_style}>
        <button className={button_style}
                id={square_index}
                onClick={() => {
                    getCoordonates(square_index);
                    getValue(square_value);
                    clickedSquareHandler(square_index);
                }}
        >
            {square_value !== null ? Math.abs(square_value) : null}
        </button>
        </span>;
};

export default Square;