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
  &:hover { background-color: chartreuse};
`

//Gestion de la valeur choisie par l'utilisateur
const Input = ({ setValueAtSquare }) => {
  return <List onClick={(event) => {
    const userValueChoice = event.target.innerHTML
    setValueAtSquare(userValueChoice)
  }}>
    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => {
      return <ListItem key={item}>
        <UserChoice>{item}</UserChoice>
      </ListItem>
    })}
  </List>
}

export default Input