import React, {useContext} from 'react'
import Mainbar from '../Components/Mainbar'
import Sidebar from '../Components/Sidebar'
import Context from '../context'

function Settings({settings}) {
    const {exportEncyptNotes} = useContext(Context)

    function onClickExport() {
        exportEncyptNotes()
    }

    return (
        <div className="settings">
            <Sidebar settings={settings} />
            <Mainbar settings={settings} />
        </div>
        // <button onClick={onClickExport}>Экспорт в зашифрованном виде</button>
    )
}

export default Settings