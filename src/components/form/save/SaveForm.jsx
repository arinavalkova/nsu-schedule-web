import React, { useContext, useRef, useState } from 'react';
import "./saveForm.css"
import { saveAs } from 'file-saver';
import LoadingPage from "../../loader/LoadingPage";
import { AuthContext } from "../../../context";

const SaveForm = ({ lessons, setVisible, next }) => {

    const [copySuccess, setCopySuccess] = useState('');
    const textAreaRef = useRef(null);
    const [distantLink, setDistantLink] = useState('')
    const [loading, setLoading] = useState(false)

    const [isAuth] = useContext(AuthContext).isAuth

    const saveDistant = () => {
        setLoading(true)
        const response = null // TODO:request to backend
        if (response == null) {
            setDistantLink('Невозможно сохранить удаленно составленное расписание')
        } else {
            setDistantLink('Расписание успешно сохранено\n' + response)
        }
        setLoading(false)
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
        setLoading(true)
        e.preventDefault()
        const blob = new Blob([baseString],
            { type: "text/plain;charset=utf-8" });
        saveAs(blob, "schedule_string.txt");
        setLoading(false)
    }
    return (
        <form>
            <div className="saveForm">
                <LoadingPage visible={loading}/>
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
                            <button
                                className="child"
                                onClick={copyToClipboard}>
                                Скопировать
                            </button>
                            {copySuccess}
                        </div>
                    }
                    <button
                        className="child"
                        onClick={saveByFile}>
                        Сохранить файлом
                    </button>
                </div>
                {
                    isAuth &&
                    <div>
                        <button className="child" nClick={saveDistant}>Сохранить удаленно</button>
                        <div className="child">{distantLink}</div>
                    </div>
                }
                <button className="child" onClick={close}>Закрыть</button>
            </div>
        </form>
    );
};

export default SaveForm;