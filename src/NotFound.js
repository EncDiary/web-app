import React from 'react'
import Header from './Components/Header'
import Title from './Components/Title'

function NotFound(props) {
    return (
        <>
            <Header my_hist={props.history} />
            <div className="container">
                <Title text={"Страница не найдена"}/>
            </div>
        </>
    )
}

export default NotFound