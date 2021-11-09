import React from 'react';
import "./complexLoadForm.css"

const ComplexLoadForm = ({setVisible, setComplexSaveFormMenu, setSimpleFormMenu}) => {

    const close = (e) => {
        e.preventDefault()
        setVisible(false)
    }

    const yes = (e) => {
        e.preventDefault()
        setVisible(false)
        setComplexSaveFormMenu(true)
    }

    const no = (e) => {
        e.preventDefault()
        setVisible(false)
        setSimpleFormMenu(true)
    }

    return (
        <form>
            <div className="complexLoadForm">
                <h2>Хотите сохранить текущее расписание в base64 строку?</h2>
                <button className="child" onClick={yes}>Да</button>
                <button className="child" onClick={no}>Нет</button>
                <button className="child" onClick={close}>Закрыть</button>
            </div>
        </form>
    );
};

export default ComplexLoadForm;