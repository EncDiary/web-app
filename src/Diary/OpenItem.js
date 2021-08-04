import React from 'react'

function OpenItem({icon, name, showPanel}) {
    return (
        <div className="open__icon" onClick={showPanel}>
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