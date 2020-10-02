import React, { useRef, useState, useEffect} from 'react'
import './Country.scss'
import {ReactComponent as ArrowLeft} from '../../assets/arrow-left1.svg'


const Country = props => {

    const country = useRef(null)
    const [clicked, setClicked] = useState(false)
    const { full } = props

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
        country.current.classList.remove("Country--full")
        document.body.classList.remove("body--noscroll")
    }

    const resetStyle = () => {
        country.current.style.transform = null
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
            if(country.current.offsetTop - window.scrollY - 88 > 0) {
                country.current.style.transform = `translate(-${country.current.offsetLeft - leftOffset}px, -${country.current.offsetTop - window.scrollY - 86}px)`
            } else {
                country.current.style.transform = `translate(-${country.current.offsetLeft - leftOffset}px, ${window.scrollY - country.current.offsetTop + 86}px)`
            }
        }
    }, [clicked, full])



    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const extractNames = (arr) => {
        let currencies = arr.map(currency => {
            return currency.name
        })
        return currencies.join(', ')
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
    }

    return(
            <div className="Country" ref={country} onClick={toggleClicked} onTransitionEnd={resetStyle}>
                <button className="Country__back Country__box" onClick={(e) => backButton(e)}><ArrowLeft />Back</button>
                <img src={`${props.country.flag}`} alt={`Flag of ${props.country.name}`} className="Country__flag"/>
                <div className="Country__text">
                    <h3 className="Country__name">{props.country.name}</h3>
                    <div className="Country__stats">
                        <div className="Country__details">
                            <div className="Country__info Country__info--full"><span className="Country__info-title">Native Name:</span> {props.country.nativeName}</div>
                            <div className="Country__info"><span className="Country__info-title">Population:</span> {numberWithCommas(props.country.population)}</div>
                            <div className="Country__info"><span className="Country__info-title">Region:</span> {props.country.region}</div>
                            <div className="Country__info Country__info--full"><span className="Country__info-title">Sub Region</span> {props.country.subregion}</div>
                            <div className="Country__info"><span className="Country__info-title">Capital:</span> {props.country.capital}</div>
                        </div>
                        <div className="Country__details">
                            <div className="Country__info Country__info--full"><span className="Country__info-title">Top Level Domain:</span> {props.country.topLevelDomain}</div>
                            <div className="Country__info Country__info--full"><span className="Country__info-title">Currencies:</span> {extractNames(props.country.currencies)}</div>
                            <div className="Country__info Country__info--full"><span className="Country__info-title">Languages</span> {extractNames(props.country.languages)}</div>
                        </div>
                    </div>
                    <div className="Country__details">
                        <div className="Country__info Country__info--full"><span className="Country__info-title">Border Countries:</span></div>
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