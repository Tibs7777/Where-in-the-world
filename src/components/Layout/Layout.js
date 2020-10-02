import React from 'react'
import './Layout.scss'
import {ReactComponent as Moon} from '../../assets/moon-o.svg'


const Layout = props => {

    return(
        <React.Fragment>
            <header className="Header">
                <div className="Header__inner">
                    <h1 className="Header__title">Where in the world?</h1>
                    <div className="Header__dark" onClick={props.toggleDark}>
                        <Moon className="Header__dark-icon" />
                        <span className="Header__dark-text">{props.dark ? "Light Mode" : "Dark Mode"}</span>
                    </div>
                </div>
            </header>
            {props.children}
        </React.Fragment>
    )
}

export default Layout