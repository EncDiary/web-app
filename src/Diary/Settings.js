import React from 'react'
import Mainbar from '../Components/Mainbar'
import Sidebar from '../Components/Sidebar'

function Settings({settings, setting}) {


    return (
        <div className="settings">
            <Sidebar settings={settings} />
            <Mainbar settings={settings} setting={setting} />
        </div>
    )
}

export default Settings