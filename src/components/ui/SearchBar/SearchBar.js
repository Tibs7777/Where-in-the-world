import React from 'react'
import './SearchBar.scss'
import {ReactComponent as SearchIcon} from '../../../assets/search.svg'
import SearchResults from '../SearchResults/SearchResults'


export default function SearchBar(props) {

    let classes = "Search"
    if(props.extraClasses) {
        classes += ` ${props.extraClasses}`
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
    }

    // const onBlurHandler = () => {
    //     search.current.classList.remove("Search--focus")
    // }

    // const onFocusHandler = () => {
    //     search.current.classList.add("Search--focus")
    // }

    let results = null
    if(props.searchResults) {
        results = <SearchResults searchResults={props.searchResults}
                    onSubmitHandler={props.onSubmitHandler}
                    mouseOverHandler={props.mouseOverHandler}
                    resultIndex={props.resultIndex}/>
    }

    return (
        <form className={classes} onSubmit={props.onSubmitHandler ? (e) => props.onSubmitHandler(e, props.value) : (e) => onSubmitHandler(e)}>
            <SearchIcon />
            <input type="text" 
                   placeholder="Search for a country..." 
                   className="Search__input" 
                   onChange={(e) => props.onChangeHandler(e)} 
                   value={props.value} 
                   onKeyDown={props.keyDownHandler ? (e) => props.keyDownHandler(e) : null}
                   onBlur={props.onBlurHandler ? props.onBlurHandler : null}/>    
            {results}
        </form>
    )
}
