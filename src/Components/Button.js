import React from 'react'

function Button({text, className="", onClick=function(){}}) {
    return (
        <button onClick={onClick} type="submit" className={"button " + className}>{text}</button>
    )
}

export default Button