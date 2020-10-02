import React from 'react'
import './ScrollUpButton.scss'
import {ReactComponent as Arrow} from '../../assets/arrow-left1.svg'


export default function ScrollUpButton() {
    return (
        <div className="ScrollUpButton" onClick={() => window.scrollTo(0, 0)}>
            <Arrow />
        </div>
    )
}
