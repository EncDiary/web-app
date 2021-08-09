import React from 'react'

function HotkeyItem({combination, description}) {
    return (
        <div className="hotkey__item">
            <span className="hotkey__combination">{combination}</span>
            <span className="hotkey__description">{description}</span>
        </div>
    )
}

export default HotkeyItem