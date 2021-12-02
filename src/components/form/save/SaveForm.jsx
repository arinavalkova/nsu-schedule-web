import React, { useContext, useRef, useState } from 'react';
import "./saveForm.css"
import { saveAs } from 'file-saver';
import LoadingPage from "../../loader/LoadingPage";
import { AuthContext } from "../../../context";
import { saveStringToServer } from "../../../ServerApi";

const SaveForm = ({ lessons, setVisible, next }) => {

    const [copySuccess, setCopySuccess] = useState('');
    const textAreaRef = useRef(null);
    const [distantLink, setDistantLink] = useState('')
    const [loading, setLoading] = useState(false)
    const [limit, setLimit] = useState(false)

    const [isAuth] = useContext(AuthContext).isAuth

    let baseString = window.btoa((unescape(encodeURIComponent(JSON.stringify(lessons)))));

    const saveDistant = async e => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = (await saveStringToServer(baseString))
            if (response == null) {
                setDistantLink(null)
            } else {
                setDistantLink(response)
            }
        } catch (err) {
            if (err.response.status === 429) setLimit(true)
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


    const saveByFile = (e) => {
        setLoading(true)
        e.preventDefault()
        const blob = new Blob([baseString],
            { type: "text/plain;charset=utf-8" });
        saveAs(blob, "schedule_string.txt");
        setLoading(false)
    }

    let link
    if (distantLink == null)
        link = <div className='child'>
            Невозможно сохранить удаленно составленное расписание
        </div>
    else if (distantLink == '')
        link = ''
    else
        link = <div className='child'>
            <div>{'Расписание успешно сохранено\n'}</div>
            <div> {distantLink}</div>
        </div>

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
                    isAuth && !limit &&
                    <div>
                        <button className="child" onClick={saveDistant}>Сохранить удаленно</button>
                        {link}
                        {/*<div className="child">{distantLink}</div>*/}
                    </div>
                }
                {
                    limit &&
                    <div>
                        Превышен лимит удаленного сохранения!
                    </div>
                }
                <button className="child" onClick={close}>Закрыть</button>
            </div>
        </form>
    );
};

export default SaveForm;