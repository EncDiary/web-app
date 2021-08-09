import React from 'react'

function Button({text, className="", isPrimary=true, onClick=function(){}}) {
    const importance = isPrimary ? "button-primary" : "button-secondary"

    return (
        <button onClick={onClick} type="submit" className={importance + " button " + className}>{text}</button>
    )
}

export default Button