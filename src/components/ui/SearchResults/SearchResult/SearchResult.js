import React from 'react'

export default function SearchResult(props) {

    let classes = "SearchResult"
    if(props.selected) {
        classes += " SearchResult--selected"
    }
    // console.log(props.clicked)
    return (
        <li className={classes} onClick={() => console.log(1)} onMouseOver={props.mouseOverHandler}>{props.children}</li>
    )
}
