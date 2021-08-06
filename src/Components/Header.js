import React, {useContext} from 'react'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'
import Context from '../context'
import {HelpIcon, SettingIcon, RefreshIcon, LockIcon} from '../assets/SvgIcons'

function Header({currentBook, settings}) {
    const {getNotes, lockDiary, setSettings} = useContext(Context)
    return (
        <>
            <header className="header">
                <div className="header__title">{currentBook.title}</div>

                <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip>Помощь</Tooltip>}
                    >
                    <div className="header__button header__button_help">
                        {HelpIcon}
                    </div>
                </OverlayTrigger>
                

                <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip>Настройки</Tooltip>}
                    >
                    <div className="header__button header__button_setting" onClick={() => setSettings(settings ? false : "main")}>
                        {SettingIcon}
                    </div>
                </OverlayTrigger>

                
                <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip>Обновить</Tooltip>}
                    >
                    <div className="header__button header__button_refresh" onClick={() => getNotes()}>
                        {RefreshIcon}
                    </div>
                </OverlayTrigger>
                
                <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip>Заблокировать</Tooltip>}
                    >
                    <div className="header__button header__button_lock" onClick={() => lockDiary()}>
                        {LockIcon}
                    </div>
                </OverlayTrigger>
            </header>
            <div className="header__ghost"></div>
        </>
    )
}

export default Header