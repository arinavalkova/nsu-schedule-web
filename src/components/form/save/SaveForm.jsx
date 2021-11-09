import React from 'react';
import "./saveForm.css"

const SaveForm = ({lessons, setVisible, next}) => {

    const close = (e) => {
        e.preventDefault()
        setVisible(false)
        if (next != null)
            next(true)
    }

    return (
        <form>
            <div className="saveForm">
                <h2 className="child">base64 строка для сохранения расписания:</h2>
                <div className="base64String">{window.btoa((unescape(encodeURIComponent(JSON.stringify(lessons)))))}</div>
                <button className="child" onClick={close}>Закрыть</button>
            </div>
        </form>
    );
};

export default SaveForm;