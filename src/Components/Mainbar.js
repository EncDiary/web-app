import React from 'react'
import HotkeysSetting from '../Settings/HotkeysSetting'
import MainSetting from '../Settings/MainSetting'

function Mainbar({settings}) {

    function showCurrentSetting() {
        switch(settings) {
            case "main":
                return <MainSetting />
            case "hotkeys":
                return <HotkeysSetting />
            default:
                return ""
        }
    }

    return (
        <>
            {showCurrentSetting()}
        </>
    )
}

export default Mainbar