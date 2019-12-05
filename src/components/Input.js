import React from 'react'
import styled from 'styled-components'

const List = styled.ul`
  padding: 0;
`
const ListItem = styled.li`
  display: inline-block;
  
`
const UserChoice = styled.button`
  cursor: pointer;
  min-height: 30px;
  min-width: 30px;
  &:hover { background-color: chartreuse};
`
const isInValidRow = (validRows) => {
  console.log('validrows ', validRows)
}

//Gestion de la valeur choisie par l'utilisateur
const Input = ({ setValueAtSquare, testValidity, validRows }) => {
  return <List
    onClick={(event) => {
      const userValueChoice = event.target.innerHTML
      setValueAtSquare(userValueChoice)
    }}
    onMouseUp={() => {
      testValidity()
      isInValidRow(validRows)
    }}
  >
    {['X', 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => {
      return <ListItem key={item}>
        <UserChoice>{item}</UserChoice>
      </ListItem>
    })}
  </List>
}

export default Input