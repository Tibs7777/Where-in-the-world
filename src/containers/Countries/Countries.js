import React, { useState, useEffect, useCallback} from 'react'
import CountryList from '../../components/CountryList/CountryList'
import Input from '../../components/Input/Input'
import { useHistory, useLocation, Route, Redirect } from 'react-router-dom'
import Country from '../../components/Country/Country'
import ScrollUpButton from '../../components/ScrollUpButton/ScrollUpButton'


const Countries = props => {

    const [countries, setCountries] = useState(null)
    const [falseCountries, setFalseCountries] = useState(null)
    const [filteredCountries, setFilteredCountries] = useState(null)
    const [showScrollButton, setShowScrollButton] = useState(false)
    const [filter, setFilter] = useState()
    const history = useHistory()
    const location = useLocation()
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState("")


    useEffect(() => {
        if(!countries){
        fetch('https://restcountries.eu/rest/v2/all')
        .then(res => res.json())
        .then(res => {
            let fetchedCountries;
            fetchedCountries = res.map(country => {
                return {
                    ...country,
                    full: false
                }
            })
                setFalseCountries(fetchedCountries)
            if (location.pathname === "/"){
                setCountries(fetchedCountries)
            } else {
                fetchedCountries = res.map(country => {
                    if("/" + country.name === location.pathname) {
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
    }
    }, [location.pathname, countries])





    const updateFull = useCallback(name => {
        let arr;
        if(name){
            history.push("/" + name)
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
            history.push('/')
                arr = countries.map(country => {
                    return {
                        ...country,
                        full: false
                    }
                })
                setCountries(arr)
        }
    }, [countries, history])

    useEffect(() => {
        let fullCountry = document.querySelector('.Country--full')
        let movingCountry = document.querySelector('.Country--moving')
        if(location.pathname === "/" && countries && (fullCountry || movingCountry)){
            setCountries(falseCountries)
            if(fullCountry) {
                fullCountry.classList.remove('Country--full')
            } else if(movingCountry) {
                movingCountry.classList.remove('Country--moving')
                movingCountry.style.transform = null
            }
            document.body.classList.remove("body--noscroll")
            updateFull()
        }
    }, [location.pathname, falseCountries, countries, updateFull])

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

    if(location.pathname !== "/" && countries) {
        pathnameCountryIndex = countries.findIndex(country => {
            return "/" + country.name === location.pathname
        })
        if(pathnameCountryIndex === -1) {
            redirect = true
        }
    }

    if(pathnameCountryIndex > (page * 10) - 1) {
        console.log(pathnameCountryIndex)
        route = <Route pathname="/Estonia" render={() => {
            return <Country country={countries[pathnameCountryIndex]} falseCountries={falseCountries} countries={countries} updateFull={updateFull} full/>
        }} />
    }

    return (
        <React.Fragment>
            {redirect ? <Redirect to="/"/> : null}
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
            {showScrollButton ? <ScrollUpButton /> : null}
            {route}
        </React.Fragment>
    )
}

export default Countries