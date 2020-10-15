import React from 'react'
import './SearchResults.scss'
import SearchResult from './SearchResult/SearchResult'

export default function SearchResults(props) {


    return (
        <div className="SearchResults">
            {props.searchResults.map((country, index) => {
                if(index === props.resultIndex) {
                    return <li className="SearchResult SearchResult--selected" key={country.name} onMouseDown={(e) => props.onSubmitHandler(e, country.name)} onMouseOver={() => props.mouseOverHandler(index)}>{country.name}</li>
                } else {
                    return <li className="SearchResult" key={country.name} onClick={(e) => props.onSubmitHandler(e, country.name)} onMouseOver={() => props.mouseOverHandler(index)}>{country.name}</li>
                }
            }).slice(0, 5)}
        </div>
    )
}
