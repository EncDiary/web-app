import React from 'react'
import HotkeyItem from './HotkeyItem'

function HotkeysSetting() {
    return(
        <>
            <h1 className="title settings__title settings__title_primary">Горячие клавиши</h1>
            <div className="hotkey__list">
                <HotkeyItem combination="Ctrl + S" description="Жирный текст" />
                <HotkeyItem combination="Ctrl + I" description="Курсивный текст" />
                <HotkeyItem combination="Ctrl + U" description="Подчеркнутый текст" />
            </div>
        </>
    )
}

export default HotkeysSetting