import React, { useState, useEffect, useCallback} from 'react'
import './Home.scss'
import { Link, useHistory } from 'react-router-dom'
import SearchBar from '../../components/ui/SearchBar/SearchBar'
import { useDispatch, useSelector } from 'react-redux'
import * as actionTypes from '../../store/actions'
import FlagBanner from '../../components/ui/FlagBanner/FlagBanner'
import { checkMatches, shuffleArray} from '../../utils/Utils'


export default function Home() {

    const history = useHistory()
    const dispatch = useDispatch()
    const falseCountries = useSelector(state => state.falseCountries)
    const [search, setSearch] = useState("")
    const [flags, setFlags] = useState([])
    const [searchResults, setSearchResults] = useState(null)
    const [resultIndex, setResultIndex] = useState(-1)
    const [savedSearch, setSavedSearch] = useState(null)


    useEffect(() => {
        // Put this beginning logic into the init countries action
        if(!falseCountries){
        fetch('https://restcountries.eu/rest/v2/all')
        .then(res => res.json())
        .then(res => {
        dispatch({type: actionTypes.INIT_COUNTRIES, falseCountries: res})
        let newFlags = res.map(country => {
            return {flag: country.flag, name: country.name}
        })
        shuffleArray(newFlags)
        setFlags(newFlags)
        })
    } else {
        let arr = [...falseCountries]
        shuffleArray(arr)
        setFlags(arr)
    }
    }, [falseCountries, dispatch])

    // const debouncedChange = useCallback(debounce(value => setSearchResults(value), 100), [])

    useEffect(() => {
        let arr;
        if(falseCountries && search && resultIndex <= -1) {
            arr = checkMatches(falseCountries, search, "population")
            if(arr.length) {
                setSearchResults(arr)
                // debouncedChange(arr)
            } else {
                setSearchResults(null)
                // debouncedChange(arr)
            }
        } else if (falseCountries && search && resultIndex > -1) {
            return
        }
        else if (falseCountries) {
            setSearchResults(arr)
            // debouncedChange(arr)
        }
    }, [falseCountries, search, resultIndex])




    const onSubmitHandler = (e, value) => {
        e.preventDefault()
        let path = falseCountries.find(country => {
            return country.name.toLowerCase() === value.toLowerCase()
        })
        if (path){
        history.push(`/countries/${path.name}`)
        }
        else {
            history.push('/countries')
        }
    }




    //may want a reducer to handle this for state reliability
    const keyDownHandler = (e) => {
        if(searchResults && e.keyCode === 40) {
            if(!savedSearch) {
                setSavedSearch(search)
            }
            setResultIndex(prevState => {
                if (prevState === Math.min(4, searchResults.length - 1)) {
                    return -1
                } else {
                    return Math.min(prevState + 1, 4)
                }
            })
            if(resultIndex === Math.min(4, searchResults.length - 1)) {
                setSearch(savedSearch)
                setSavedSearch(null)
            } else {
                setSearch(searchResults[Math.min(resultIndex + 1, 4)].name)
            }
        } else if(searchResults && e.keyCode === 38) {
            if(!savedSearch) {
                setSavedSearch(search)
            }
            e.preventDefault()
            setResultIndex(prevState => {
                if (prevState === -1) {
                    return Math.min(4, searchResults.length - 1)
                } else {
                    return Math.max(prevState - 1, -1)
                }
            })
            if(resultIndex === 0) {
                setSearch(savedSearch)
                setSavedSearch(null)
            } else if(resultIndex === -1){
                setSearch(searchResults[Math.min(4, searchResults.length - 1)].name)
            } else {
                setSearch(searchResults[Math.max(resultIndex - 1, -1)].name)
            }
        }
    }

    const mouseOverHandler = (index) => {
        setResultIndex(index)
    }

    const onBlurHandler = () => {
        setResultIndex(-1)
    }



    const onChangeHandler = useCallback((e) => {
        setSearch(e.target.value)
        setResultIndex(-1)
        setSavedSearch(null)
    }, [])





    //need to clean up doing rendering work in a container
    return (
        <div className="Home">
            <div className="Flags-container">
                <FlagBanner flags={flags}/>
            </div>
            <div className="Home__content">
                <h1 className="Home__title">Where in the World?</h1>
                <div className="Home__search">
                    <SearchBar extraClasses="marg-bottom-medium" 
                               onChangeHandler={(e) => onChangeHandler(e)} 
                               value={search} 
                               onSubmitHandler={onSubmitHandler} 
                               keyDownHandler={keyDownHandler} 
                               searchResults={searchResults}
                               mouseOverHandler={mouseOverHandler}
                               resultIndex={resultIndex}
                               onBlurHandler={onBlurHandler} />
                </div>
                <span className="Home__text marg-bottom-medium">or...</span>
                <Link to="/countries"><button className="Home__button">View All Countries</button></Link>
            </div>
        </div>
    )
}