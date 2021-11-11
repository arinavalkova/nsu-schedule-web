import React, { useRef, useState } from 'react';
import "./saveForm.css"

const SaveForm = ({ lessons, setVisible, next }) => {

    const [copySuccess, setCopySuccess] = useState('');
    const textAreaRef = useRef(null);

    const close = (e) => {
        e.preventDefault()
        setVisible(false)
        if (next != null)
            next(true)
    }

    function copyToClipboard(e) {
        textAreaRef.current.select();
        document.execCommand('copy');
        // This is just personal preference.
        // I prefer to not show the whole text area selected.
        e.target.focus();
        setCopySuccess('Скопировано в буфер обмена!');
    }

    let baseString = window.btoa((unescape(encodeURIComponent(JSON.stringify(lessons)))));
    return (
        <form>
            <div className="saveForm">
                <h2 className="child">base64 строка для сохранения расписания:</h2>
                {/*<div className="base64String">{baseString}</div>*/}
                <form>
                    <textarea
                        className="child"
                        ref={textAreaRef}
                        value={baseString}
                    />
                </form>
                {
                    /* Logical shortcut for only displaying the
                       button if the copy command exists */
                    document.queryCommandSupported('copy') &&
                    <div>
                        <button className="child" onClick={copyToClipboard}>Скопировать</button>
                        {copySuccess}
                    </div>
                }
                <button className="child" onClick={close}>Закрыть</button>
            </div>
        </form>
    );
};

export default SaveForm;