import React, { useRef, useState, useEffect} from 'react'
import './Country.scss'
import {ReactComponent as ArrowLeft} from '../../assets/arrow-left1.svg'


const Country = props => {

    /*
    In order to support animating between paths, each country recieves a full prop to determine whether or not to be fullscreen. The reason it's done this way is so each 
    country knows whether or not its full on render without having to figure it out itself. Each country independently checking the url every time it changes to see whether or 
    not they need to go full seems less efficient than having each country be told what it needs to do in order to stop countries checking for re renders unless they really 
    need to, given there can be up to 250 on screen at once.
    */

    const country = useRef(null)
    const [clicked, setClicked] = useState(false)
    const { full } = props
    const flag = useRef(null)
    const container = useRef(null)


    const toggleClicked = () => {
        if(!country.current.classList.contains("Country--full")) {
            setClicked(true)
            props.updateFull(props.country.name, props.index)
        }
    }

    const backButton = (e) => {
        e.stopPropagation()
        setClicked(false)
        props.updateFull()
        // country.current.classList.remove("Country--full")
        // document.body.classList.remove("body--noscroll")
    }

    const resetStyle = () => {
        country.current.style.transform = null
        flag.current.style.transform = null
        flag.current.style.top = null
        country.current.classList.add("Country--full")
        country.current.classList.remove("Country--moving")
    }

    useEffect(() => {
        if(!clicked && full) {
            document.body.classList.add("body--noscroll")
            country.current.classList.add("Country--full")
        } else if(clicked && full) {
            document.body.classList.add("body--noscroll")
            country.current.classList.add("Country--moving")
            //leftOffset is used to offset the behaviour when animating the flag increasing in size. If the flags width/height doesn't animate this isn't needed.
            let leftOffset = 0
            if (window.innerWidth >= 768) {
                leftOffset = 25
            } 
            if (window.innerWidth >= 1440) {
                leftOffset = 75
            }
            if(country.current.offsetTop - window.scrollY - 88 >= 0) {
                country.current.style.transform = `translate(-${country.current.offsetLeft - leftOffset}px, -${country.current.offsetTop - window.scrollY - 86}px)`
            } else {
                console.log(2)
                country.current.style.transform = `translate(-${country.current.offsetLeft - leftOffset}px, ${window.scrollY - country.current.offsetTop + 86}px)`
            }
            flag.current.style.transform = `translate(-50%, 0%)`
            flag.current.style.top = "0"

        } else if(!full && (country.current.classList.contains("Country--full") || country.current.classList.contains("Country--moving"))) {
            resetStyle()
            country.current.classList.remove("Country--full")
            document.body.classList.remove("body--noscroll")
        }
    }, [clicked, full])



    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const extractValues = (arr) => {
        let values = arr.map(value => {
            return value.name
        })
        return values.join(', ')
    }

    const extractBorders = () => {
        let borders = []
        for(const item of props.country.borders) {
           let i = props.falseCountries.findIndex(country => {
                return country.alpha3Code === item
            })
            borders.push(props.falseCountries[i].name)
        }
        return borders
    }

    let borders = null;
    if (props.full) {
        borders = extractBorders().map(country => {
            return <button className="Country__box" key={`border: + ${country}`}>{country}</button>
        })
        if(borders.length === 0) {
            borders = null
        }

    }

    return(
            <div className="Country" ref={country} onClick={toggleClicked} onTransitionEnd={resetStyle}>
                <button className="Country__back Country__box" onClick={(e) => backButton(e)}><ArrowLeft />Back</button>
                <div className="Country__flag-container" ref={container}>
                    <img src={`${props.country.flag}`} alt={`Flag of ${props.country.name}`} className="Country__flag" ref={flag}/>
                </div>
                <div className="Country__text">
                    <h3 className="Country__name">{props.country.name}</h3>
                    <div className="Country__stats">
                        <div className="Country__details">
                            <div className="Country__info Country__info--full"><span className="Country__info-title">Native Name:</span> {props.country.nativeName}</div>
                            <div className="Country__info"><span className="Country__info-title">Population:</span> {numberWithCommas(props.country.population)}</div>
                            <div className="Country__info"><span className="Country__info-title">Region:</span> {props.country.region}</div>
                            <div className="Country__info Country__info--full"><span className="Country__info-title">Sub Region:</span> {props.country.subregion}</div>
                            <div className="Country__info"><span className="Country__info-title">Capital:</span> {props.country.capital}</div>
                        </div>
                        <div className="Country__details">
                            <div className="Country__info Country__info--full"><span className="Country__info-title">Top Level Domain:</span> {props.country.topLevelDomain}</div>
                            <div className="Country__info Country__info--full"><span className="Country__info-title">Currencies:</span> {extractValues(props.country.currencies)}</div>
                            <div className="Country__info Country__info--full"><span className="Country__info-title">Languages:</span> {extractValues(props.country.languages)}</div>
                        </div>
                    </div>
                    <div className="Country__details">
                        <div className="Country__info Country__info--full"><span className="Country__info-title">{borders ? "Border Countries:" : "No border countries"}</span></div>
                        <div className="Country__boxes">
                            {borders}
                        </div>
                    </div>
                </div>
            </div>
    )
}


export default React.memo(Country, (prevProps, nextProps) => {
    return prevProps.full === nextProps.full && prevProps.countries.length === nextProps.countries.length && prevProps.falseCountries === nextProps.falseCountries
})