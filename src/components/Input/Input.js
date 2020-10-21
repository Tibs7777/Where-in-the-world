import React, { useState, useRef, useEffect } from 'react'
import './Input.scss'
import {ReactComponent as ChevronDown} from '../../assets/chevron-small-down.svg'
import DropdownOption from './DropdownOption/DropdownOption'
import SearchBar from '../ui/SearchBar/SearchBar'
import { checkMatches } from '../../utils/Utils'


const Search = (props) => {

    const [dropdownOpen, setDropdownOpen] = useState(false)
    const filter = useRef(null)
    const container = useRef(null)
    const clear = useRef(null)
    let {filteredCountries, falseCountries, setPage, setCountries, search} = props
    
    const toggleDropdown = (e) => {
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
    }

    const removeFilter = () => {
        clear.current.classList.remove("Filter__clear--active")
        props.setPage(1)
        props.changeFilter()
    }

    const swapZIndex = () => {
        if(!dropdownOpen) {
            filter.current.classList.remove('Filter--z1')
        }
    }

    const inputChangeHandler = (e) => {
        props.setSearch(e.target.value)
        if(!e.target.value) {
            setPage(1)
            setCountries(filteredCountries || falseCountries)
        }
    }

    useEffect(() => {
        let arr;
        if(filteredCountries && search) {
            arr = checkMatches(filteredCountries, search)
            setPage(1)
            setCountries(arr)
        } else if (falseCountries && search){
            arr = checkMatches(falseCountries, search)
            setPage(1)
            setCountries(arr)
        }
    }, [filteredCountries, falseCountries, setPage, setCountries, search])



    // const closeDropdown = () => {
    //     console.log(1)
    //     // if(!dropdownOpen){
    //         console.log('closing')
    //         setDropdownOpen(false)
    //         filter.current.classList.remove('Filter--open')
    //         container.current.classList.add('"Filter__dropdown-container--noclick"')
    //     // }
    // }

    // useEffect(() => {
    //         document.body.addEventListener("click", closeDropdown)
    //     return(() => {
    //         document.body.removeEventListener("click", closeDropdown)
    //     })
    //   }, [])


    return(
        <div className="Input">
            <SearchBar extraClasses="marg-bottom-small marg-right-medium" onChangeHandler={inputChangeHandler} value={props.search}/>
            <div className="Filter" ref={filter}>
                <div className="Filter__clear" onClick={removeFilter} ref={clear}></div>
                <div className="Filter__body"  onClick={(e) => toggleDropdown(e)}>
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