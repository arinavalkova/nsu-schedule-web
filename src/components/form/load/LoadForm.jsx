import React, {useState} from 'react';
import "./loadForm.css"

const LoadForm = ({load, setVisible}) => {

    const [base64, setBase64] = useState("")

    const close = (e) => {
        e.preventDefault()
        setVisible(false)
    }

    const loadLessons = (e) => {
        e.preventDefault()
        load(base64)
        setVisible(false)
    }

    return (
        <form>
            <div className="loadForm">
                <h2>Загрузить расписание:</h2>
                <input className="child" type="text" placeholder={"Введите base64"} value={base64}
                       onChange={(e) => setBase64(e.target.value)}/>
                <button className="child" onClick={loadLessons}>Загрузить</button>
                <button className="child" onClick={close}>Закрыть</button>
            </div>
        </form>
    );
};

export default LoadForm;