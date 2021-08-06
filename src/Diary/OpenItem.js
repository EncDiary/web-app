import React, {useContext} from 'react'
import Context from '../context'

function OpenItem({icon, name, showPanel}) {
    const {setCurrentTab} = useContext(Context)

    return (
        <div className="open__icon" onClick={() => setCurrentTab(showPanel)}>
            <div className="open__icon-image">
                {icon}
            </div>
            <div className="open__icon-text">
                {name}
            </div>
        </div>
    )
}

export default OpenItem