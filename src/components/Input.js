import React from 'react'
import styled from 'styled-components'

const List = styled.ul`
  padding: 0;
`
const UserChoice = styled.button`
  font-family: Montserrat;
  cursor: pointer;
  min-height: 30px;
  min-width: 30px;
  &:hover { background-color: chartreuse};
`
const ListItem = styled.li`
  display: inline-block;
`
//Gestion de la valeur choisie par l'utilisateur
const Input = ({ setValueAtCell, testRows }) => {
  return <List
    onClick={(event) => {
      const userValueChoice = event.target.innerHTML
      setValueAtCell(event, userValueChoice)

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