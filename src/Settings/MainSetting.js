import React, {useContext, useState} from 'react'
import Context from '../context'
import Button from '../Components/Button'

function MainSetting({setting}) {
    const {exportEncyptNotes, editOptions} = useContext(Context)

    // const [editPermission, setEditPermission] = useState(true)
    const [options, setOptions] = useState({
        edit: setting['edit'],
        delete: setting['delete']
    })

    console.log("setting", setting)


    function handleCheckEdit() {
        let currentSetting = {...options, edit: !options.edit}
        setOptions(currentSetting);
        editOptions(currentSetting)
    }

    function handleCheckDelete() {
        let currentSetting = {...options, delete: !options.delete}
        setOptions(currentSetting);
        editOptions(currentSetting)
    }



    function onClickExport() {
        exportEncyptNotes()
    }

    // function handleChange(e) {
    //     console.log(e.target.checked)
    // }

    return(
        <>
            <h1 className="title settings__title settings__title_primary">Основные настройки</h1>
            <h2 className="title settings__title settings__title_secondary">Экспорт записей</h2>
            <ul>
                <li>
                    Экспорт в зашифрованном виде
                    <Button onClick={onClickExport} text="Скачать" className="button settings__button_inline" />
                </li>
                <li>
                    Экспорт в чистом виде (небезопасно)
                    <Button onClick={onClickExport} text="Скачать" className="button settings__button_inline" />
                </li>
            </ul>
            
            <h2 className="title settings__title settings__title_secondary">Действия над записями</h2>
            <div className="switcher">
                <label class="checkbox-ios">
                    <input type="checkbox" checked={options.edit} onChange={handleCheckEdit} />
                    <span class="checkbox-ios-switch"></span>
                </label>
                Редактирование
            </div>
            <div className="switcher">
                <label class="checkbox-ios">
                    <input type="checkbox" checked={options.delete} onChange={handleCheckDelete} />
                    <span class="checkbox-ios-switch"></span>
                </label>
                Удаление
            </div>

            {/* <input checked={editPermission.edit} onChange={handleCheckClick} type="checkbox" /> */}
        </>
    )
}

export default MainSetting