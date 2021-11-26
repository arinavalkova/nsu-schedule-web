import React, { useRef, useState } from 'react';
import "./saveForm.css"
import { saveAs } from 'file-saver';

const SaveForm = ({ lessons, setVisible, next }) => {

    const [copySuccess, setCopySuccess] = useState('');
    const textAreaRef = useRef(null);
    const [distantLink,setDistantLink] = useState('')

    const saveDistant = () => {
        const response = null // request to backend
        if (response == null) {
            setDistantLink('Невозможно сохранить удаленно составленное расписание')
        } else {
            setDistantLink('Расписание успешно сохранено\n' + response)
        }
    }

    const close = (e) => {
        e.preventDefault()
        setVisible(false)
        if (next != null)
            next(true)
    }

    function copyToClipboard(e) {
        e.preventDefault()
        textAreaRef.current.select();
        document.execCommand('copy');
        e.target.focus();
        setCopySuccess('Скопировано в буфер обмена!');
    }

    let baseString = window.btoa((unescape(encodeURIComponent(JSON.stringify(lessons)))));

    const saveByFile = (e) => {
        e.preventDefault()
        const blob = new Blob([baseString],
            {type: "text/plain;charset=utf-8"});
        saveAs(blob, "schedule_string.txt");
    }
    return (
        <form>
            <div className="saveForm">
                <h1 className="child">Сохранение расписания:</h1>
                <div>
                    <h2>Ссылка для локального сохранения:</h2>
                     <textarea
                         className="child"
                         ref={textAreaRef}
                         value={baseString}
                     />
                    {
                        document.queryCommandSupported('copy') &&
                        <div>
                            <button onClick={copyToClipboard}>Скопировать</button>
                            {copySuccess}
                        </div>
                    }
                    <button onClick={saveByFile}>Сохранить файлом</button>
                </div>
                <div>
                    <button onClick={saveDistant}>Сохранить удаленно</button>
                    <div>{distantLink}</div>
                </div>
                <button className="child" onClick={close}>Закрыть</button>
            </div>
        </form>
    );
};

export default SaveForm;