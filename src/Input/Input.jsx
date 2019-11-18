import React from "react";
import './Input.css'

//Gestion de la valeur de la case cliquée
const input = ({setValueAtSquare}) => {
    const ulUserChoice = {
        padding: '0'
    };
    const liStyle = {
        display: 'inline-block'
    };
    const buttonStyle = {
        cursor: 'pointer'
    };
    return <ul className="Input" style={ulUserChoice}
               onClick={(event) => {
                   const userValueChoice = event.target.innerHTML;
                   setValueAtSquare(userValueChoice);
               }}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => {
            return <li key={item}
                       style={liStyle}>
                <button style={buttonStyle}>{item}</button>
            </li>
        })}
    </ul>;
};

export default input;