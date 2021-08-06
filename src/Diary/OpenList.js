import React from 'react'
import { AddIcon, LockIcon, SearchIcon } from '../assets/SvgIcons'
import OpenItem from './OpenItem'


function OpenList() {
    
    return (
        <div className="open__icons">
            <OpenItem icon={LockIcon} showPanel={"open"} name="Открыть" />
            <OpenItem icon={AddIcon} showPanel={"add"} name="Создать" />
            <OpenItem icon={SearchIcon} showPanel={"find"} name="Найти" />
        </div>
    )
}

export default OpenList