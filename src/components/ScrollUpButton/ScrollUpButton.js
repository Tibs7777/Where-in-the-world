import React from 'react'
import './ScrollUpButton.scss'
import {ReactComponent as Arrow} from '../../assets/arrow-left1.svg'


export default function ScrollUpButton(props) {

    const clickHandler = () => {
        window.scrollTo(0, 0);
        if(props.resetScroll) {
            props.resetScroll()
        }
    }

    return (
        <div className="ScrollUpButton" onClick={clickHandler}>
            <Arrow />
        </div>
    )
}
