import React from 'react'
import './Layout.scss'
import {ReactComponent as Moon} from '../../assets/moon-o.svg'
import {ReactComponent as Sun} from '../../assets/sun.svg'
import { Link } from 'react-router-dom'


const Layout = props => {

    return(
        <React.Fragment>
            <header className="Header">
                <div className="Header__inner">
                    <h1 className="Header__title"><Link to="/">Where in the world?</Link></h1>
                    <div className="Header__dark" onClick={props.toggleDark}>
                        {props.dark ? <Sun className="Header__dark-icon" /> : <Moon className="Header__dark-icon" />}
                        <span className="Header__dark-text">{props.dark ? "Light Mode" : "Dark Mode"}</span>
                    </div>
                </div>
            </header>
            {props.children}
        </React.Fragment>
    )
}

export default Layout