import React from 'react'
import { AddIcon, LockIcon, SearchIcon } from '../assets/SvgIcons'
import OpenItem from './OpenItem'


function OpenList({showOpenBookPanel, showAddBookPanel, showFindBookPanel}) {
    return (
        <div className="open__icons">
            <OpenItem icon={LockIcon} showPanel={showOpenBookPanel} name="Открыть" />
            <OpenItem icon={AddIcon} showPanel={showAddBookPanel} name="Создать" />
            <OpenItem icon={SearchIcon} showPanel={showFindBookPanel} name="Найти" />
        </div>
    )
}

export default OpenList