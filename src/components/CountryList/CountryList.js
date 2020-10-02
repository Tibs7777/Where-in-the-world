import React, { useEffect, useCallback } from 'react'
import './CountryList.scss'
import Country from '../Country/Country'



const CountryList = props => {

    let country = null
    const {setPage} = props

    // if(props.countries) {
    //     country = props.countries.map((country, index) => {
    //             if(country.full) {
    //                 return <Country country={country} falseCountries={props.falseCountries} countries={props.countries} key={country.alpha3Code} updateFull={props.updateFull} index={index} full/>
    //             }
    //         return <Country country={country} falseCountries={props.falseCountries} countries={props.countries} key={country.alpha3Code} updateFull={props.updateFull} index={index}/>
    //     })
    // }

    if(props.countries) {
        let arr = []
        arr = props.countries.slice(0, props.page * 10)
        country = arr.map(country => {
            if(country.full) {
                return <Country country={country} falseCountries={props.falseCountries} countries={props.countries} key={country.alpha3Code} updateFull={props.updateFull} full/>
            }
            return <Country country={country} falseCountries={props.falseCountries} countries={props.countries} key={country.alpha3Code} updateFull={props.updateFull}/>
        })
    }

    const handleScroll = useCallback(() => {
        if((window.innerHeight + document.documentElement.scrollTop) >= document.documentElement.offsetHeight - 450) {
            setPage(prevState => prevState + 1)
        }
    }, [setPage])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return(() => {
            window.removeEventListener("scroll", handleScroll) 
        })
    }, [handleScroll])

    return(
        <div className="CountryList">
            {country}
        </div>
    )
}


export default CountryList

// return prevProps.countries === nextProps.countries && prevProps.updateFull === nextProps.updateFull && prevProps.countries === nextProps.countries