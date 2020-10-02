import React, { useState, useRef } from 'react'
import './Input.scss'
import {ReactComponent as SearchIcon} from '../../assets/search.svg'
import {ReactComponent as ChevronDown} from '../../assets/chevron-small-down.svg'
import DropdownOption from './DropdownOption/DropdownOption'


const Search = (props) => {

    const [dropdownOpen, setDropdownOpen] = useState(false)
    const filter = useRef(null)
    const container = useRef(null)
    const clear = useRef(null)

    // let dropdownClasses = "Filter Filter--z1"
    // if(dropdownOpen) {
    //     dropdownClasses += " Filter--open"
    // }

    // let clearClasses = "Filter__clear"
    // if(props.filter) {
    //     clearClasses += "Filter__clear--active"
    // }
    
    const toggleDropdown = () => {
        setDropdownOpen(prevState => !prevState)
            if(!dropdownOpen){
                filter.current.classList.add('Filter--open')
                filter.current.classList.add('Filter--z1')
                container.current.classList.remove('"Filter__dropdown-container--noclick"')
            } else {
                filter.current.classList.remove('Filter--open')
                container.current.classList.add('"Filter__dropdown-container--noclick"')
            }
    }

    const selectFilter = (filter) => {
        props.changeFilter(filter)
        clear.current.classList.add("Filter__clear--active")
        toggleDropdown()
        props.setPage(1)
        props.setSearch("")
    }

    const removeFilter = () => {
        clear.current.classList.remove("Filter__clear--active")
        props.setPage(1)
        props.changeFilter()
        props.setSearch("")
    }

    const swapZIndex = () => {
        if(!dropdownOpen) {
            filter.current.classList.remove('Filter--z1')
        }
    }

    const inputChangeHandler = (e) => {
        props.setSearch(e.target.value)
        let value = e.target.value.toLowerCase()
        const filterDuplicates = (arr1, arr2) => {
            arr1.forEach((item) => {
                let i = arr2.findIndex(iItem => {
                     return item.alpha3Code === iItem.alpha3Code
                 })
                 if(i !== -1) {
                     arr2.splice(i, 1)
                 }
             })
        }
        const checkMatches = (arr) => {
            let startsWith = arr.filter(country => {
                return country.name.toLowerCase().startsWith(value)
            })
            let includes = arr.filter(country => {
                return country.name.toLowerCase().includes(value)
            })
            filterDuplicates(startsWith, includes)
            let halfMatches = includes.filter((country, i) => {
                if(!country.name.includes(" ")) return false
                let split = country.name.toLowerCase().split(' ')
                return split.find(str => {
                    return str.startsWith(value)
                })
            })
            filterDuplicates(halfMatches, includes)
            let finalResults = [...startsWith, ...halfMatches, ...includes]
            return finalResults
        }
        let arr;
        if(props.filteredCountries) {
           arr = checkMatches(props.filteredCountries)
        } else {
           arr = checkMatches(props.falseCountries)
        }
        props.setPage(1)
        props.setCountries(arr)
    }

    return(
        <div className="Input">
            <form className="Search">
                <SearchIcon />
                <input type="text" placeholder="Search for a country..." className="Search__input" onChange={(e) => inputChangeHandler(e)} value={props.search}/>
            </form>
            <div className="Filter" ref={filter}>
                <div className="Filter__clear" onClick={removeFilter} ref={clear}></div>
                <div className="Filter__body"  onClick={toggleDropdown}>
                    <h4 className="Filter__title">{props.filter ? props.filter : "Filter by region"}</h4>
                    <ChevronDown />
                </div>
                <div className="Filter__dropdown-container" ref={container}>
                    <ul className="Filter__dropdown" onTransitionEnd={swapZIndex}>
                        <DropdownOption setFilter={selectFilter}>Africa</DropdownOption>
                        <DropdownOption setFilter={selectFilter}>Americas</DropdownOption>
                        <DropdownOption setFilter={selectFilter}>Asia</DropdownOption>
                        <DropdownOption setFilter={selectFilter}>Europe</DropdownOption>
                        <DropdownOption setFilter={selectFilter}>Oceania</DropdownOption>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Search)