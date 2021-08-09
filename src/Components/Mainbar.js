import React from 'react'
import AboutSetting from '../Settings/AboutSetting'
import HotkeysSetting from '../Settings/HotkeysSetting'
import MainSetting from '../Settings/MainSetting'

function Mainbar({settings, setting}) {

    function showCurrentSetting() {
        switch(settings) {
            case "main":
                return <MainSetting setting={setting} />
            case "hotkeys":
                return <HotkeysSetting />
            case "about":
                return <AboutSetting />
            default:
                return ""
        }
    }

    return (
        <div className="mainbar">
            {showCurrentSetting()}
        </div>
    )
}

export default Mainbar