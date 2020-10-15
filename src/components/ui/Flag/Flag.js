import React from 'react'
import { Link } from 'react-router-dom'
import './Flag.scss'

export default function Flag(props) {
    return <Link to={`/countries/${props.name}`}><img src={props.img} alt="Flag" className="Flag"/></Link>
}
