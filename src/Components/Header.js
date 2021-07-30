import React from 'react'

function Header(props) {
    return (
        <header className="p-3 bg-dark text-white mb-3">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><span onClick={() => props.my_hist.push('/') } className="nav-link px-2 text-secondary">Дашборд</span></li>

                        <li><span onClick={() => props.my_hist.push('/diary') } className="nav-link px-2 text-white">Дневник</span></li>
                    </ul>

                    <div className="text-end">
                        <span className="btn btn-outline-light me-2">Выйти</span>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header