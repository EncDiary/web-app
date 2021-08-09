import React, { useContext } from 'react'
import Context from '../context'

function SidebarItem({text, tabName, settings}) {
    const {setSettings} = useContext(Context)


    function isActive() {
        

        if (settings === tabName) {
            return "sidebar__item_active"
        } else {
            return ""
        }
    }

    return (
        <div onClick={() => setSettings(tabName)} className={"sidebar__item " + isActive()}>{text}</div>
    )
}

export default SidebarItem