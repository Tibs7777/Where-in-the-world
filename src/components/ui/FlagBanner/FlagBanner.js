import React from 'react'
import Flag from '../Flag/Flag'
import './FlagBanner.scss'

function FlagBanner(props) {


    console.log("banner render")



    let flags = null
    let repeat = null

    if(props.flags.length > 0) {
        repeat = props.flags.slice(0, 20).map(flag => {
            return <Flag img={flag.flag} name={flag.name} key={flag.name} />
        })
        flags = props.flags.slice(0, 125).map(flag => {
            return <Flag img={flag.flag} name={flag.name} key={"repeat" + flag.name} />
        })
    }


    return (
        <div className="Flags">
            {flags}
            <div className="Flags__repeat">
            {repeat}
            </div>
        </div>
    )
}

export default React.memo(FlagBanner)
