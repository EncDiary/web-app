import React from 'react'
import SidebarItem from './SidebarItem'

function Sidebar({settings}) {
    return (
        <div className="sidebar">
            <SidebarItem text="Основное" tabName="main" settings={settings} />
            <SidebarItem text="Горячие клавиши" tabName="hotkeys" settings={settings} />
            <SidebarItem text="О приложении" tabName="about" settings={settings} />
        </div>
    )
}

export default Sidebar