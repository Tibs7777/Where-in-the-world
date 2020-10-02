import React from 'react'


const DropdownOption = props => {

   return <li className="Filter__option" onClick={() => props.setFilter(props.children)}>{props.children}</li>
}

export default DropdownOption