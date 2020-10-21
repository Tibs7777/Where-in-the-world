import React from 'react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import './Flag.scss'

export default function Flag(props) {
   const flag = useRef(null)

//    const setAnim = () => {
//        flag.current.style.transform= `translateX(${document.querySelector('.Flags').offsetWidth - window.innerWidth}px)`
//    }
    // useEffect(() => {
    //     console.log(document.querySelector('.Flags').offsetWidth)
    //     flag.current.style.transform= `translateX(${document.querySelector('.Flags').offsetWidth - window.innerWidth}px)`
    // }, [])


    // const transitionEndHandler = (e) => {
        // if(e.propertyName === "transform") {
        //     console.log('resetting')
        //     flag.current.style.transition = "none"
        //     flag.current.style.transform= `translateX(0)`
        //     setAnim()
        // }
    // }



    return <Link to={`/countries/${props.name}`}><img src={props.img} alt="Flag" className="Flag" ref={flag} /></Link>
}
