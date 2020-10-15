import React, { useState, useEffect, useCallback} from 'react'
import CountryList from '../../components/CountryList/CountryList'
import Input from '../../components/Input/Input'
import { useHistory, useLocation, Route, Redirect } from 'react-router-dom'
import Country from '../../components/Country/Country'
import ScrollUpButton from '../../components/ScrollUpButton/ScrollUpButton'
import { useDispatch, useSelector } from 'react-redux'
import * as actionTypes from '../../store/actions'


const Countries = props => {

    const [countries, setCountries] = useState(null)
    // const [falseCountries, setFalseCountries] = useState(null)
    const [filteredCountries, setFilteredCountries] = useState(null)
    const [showScrollButton, setShowScrollButton] = useState(false)
    const [filter, setFilter] = useState()
    const history = useHistory()
    const location = useLocation()
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState("")
    const dispatch = useDispatch()
    const falseCountries = useSelector(state => state.falseCountries)


    useEffect(() => {



        if(!falseCountries){
        fetch('https://restcountries.eu/rest/v2/all?fields=alpha3Code;borders;capital;currencies;flag;languages;latlng;name;nativeName;population;region;subregion;topLevelDomain')
        // fetch('https://restcountries.eu/rest/v2/all')
        .then(res => res.json())
        .then(res => {
        dispatch({type: actionTypes.INIT_COUNTRIES, falseCountries: res})
            if (location.pathname === "/countries"){
                setCountries(falseCountries)
            } else {
                let fetchedCountries = res.map(country => {
                    if("/countries/" + country.name === location.pathname) {
                        return {
                            ...country,
                            full: true
                        }
                    }
                    else {
                        return {
                            ...country,
                            full: false
                        }
                    }
                })
                setCountries(fetchedCountries)
            }
        })
    } else if (!countries) {
        if (location.pathname === "/countries"){
            setCountries(falseCountries)
        } else {
            let newCountries = falseCountries.map(country => {
                if("/countries/" + country.name === location.pathname) {
                    return {
                        ...country,
                        full: true
                    }
                }
                else {
                    return {
                        ...country,
                        full: false
                    }
                }
            })
            setCountries(newCountries)
        }
    }
    }, [location.pathname, countries, dispatch, falseCountries])


    const updateFull = useCallback(name => {
        let arr;
        if(name){
            history.push("/countries/" + name)
        arr = countries.map(country => {
            if(country.name === name) {
                return {
                    ...country,
                    full: true
                }
            } else {
                return {
                    ...country,
                    full: false
                }
            }
        })
        setCountries(arr)
        } else {
            history.push('/countries')
                arr = countries.map(country => {
                    return {
                        ...country,
                        full: false
                    }
                })
                setCountries(arr)
        }
    }, [countries, history])


    //history handler
    useEffect(() => {
        const listener = history.listen((location, action) => {
            // let fullCountry = document.querySelector('.Country--full')
            // let movingCountry = document.querySelector('.Country--moving')
            if(location.pathname === "/countries"){
                setCountries(falseCountries)
            } else if(falseCountries && action === "POP") {
                let newCountries = falseCountries.map(country => {
                    if("/countries/" + country.name === location.pathname) {
                        return {
                            ...country,
                            full: true
                        }
                    }
                    else {
                        return {
                            ...country,
                            full: false
                        }
                    }
                })
                setCountries(newCountries)
            }
        });
        return(() => {
            document.body.classList.remove("body--noscroll")
            listener()
        })
    }, [falseCountries, history])

    const changeFilter = useCallback((filter) => {
        setFilter(filter)
        if(filter && falseCountries) {
            let filteredCountries = falseCountries.filter(country => {
                 return country.region === filter
            })
            setCountries(filteredCountries)
            setFilteredCountries(filteredCountries)
         } else {
            setCountries([...falseCountries])
            setFilteredCountries(null)
         }
    }, [falseCountries])

    
    const handleScroll = useCallback(() => {
        if(window.scrollY > 1000) {
            setShowScrollButton(true)
        } else {
            setShowScrollButton(false)
        }
    }, [])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return(() => {
            window.removeEventListener("scroll", handleScroll)
        })
    }, [handleScroll])




    let route = null;
    let pathnameCountryIndex = null
    let redirect = null;

    if(location.pathname !== "/countries" && countries) {
        pathnameCountryIndex = countries.findIndex(country => {
            return "/countries/" + country.name === location.pathname
        })
        if(pathnameCountryIndex === -1) {
            redirect = true
        }
    }

    if(pathnameCountryIndex > (page * 10) - 1) {
        route = <Route pathname="/countries/:countryname" render={() => {
            return <Country country={countries[pathnameCountryIndex]} falseCountries={falseCountries} countries={countries} updateFull={updateFull} full/>
        }} />
    }

    return (
        <React.Fragment>
            {redirect ? <Redirect to="/countries"/> : null}
            {route}
            <Input changeFilter={changeFilter} 
                   filter={filter} 
                   setPage={setPage} 
                   search={search} 
                   setSearch={setSearch} 
                   countries={countries} 
                   setCountries={setCountries} 
                   falseCountries={falseCountries}
                   filteredCountries={filteredCountries}/>
            <CountryList countries={countries} updateFull={updateFull} falseCountries={falseCountries} page={page} setPage={setPage}/>
            {showScrollButton ? <ScrollUpButton resetScroll={() => setPage(1)}/> : null}
        </React.Fragment>
    )
}

export default Countries