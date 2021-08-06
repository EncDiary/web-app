import React from 'react'

function Title({text, className=""}) {
    return (
        <h2 className={"title " + className}>{text}</h2>
    )
}

export default Title