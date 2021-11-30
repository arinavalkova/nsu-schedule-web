import React, {useState} from 'react';
import LoadingPage from "../../loader/LoadingPage";
import {forgotPasswordFromServer} from "../../../ServerApi";

const RestorePasswordForm = ({setVisible}) => {

    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')

    const close = (e) => {
        e.preventDefault()
        setEmail('')
        setVisible(false)
    }

    const send = async (e) => {
        e.preventDefault()
        setLoading(true)
        const response = await forgotPasswordFromServer(email)
        if (response.status == 200) {
            alert("Успешно! На почту отправлена инструкция по восстановлению пароля!")
            setEmail('')
        } else {
            alert("Ошибка! Не верно указана почта!")
        }
        setLoading(false)
        setVisible(false)
    }

    return (
        <form>
            <div className="restoreForm">
                <LoadingPage visible={loading}/>
                <h2>Введите почту для воостановления пароля:</h2>
                <div className="box">
                    <input className="child" placeholder="Электронная почта" value={email} onChange={e => setEmail(e.target.value)}/>
                    <button className="child" onClick={send}>Отправить запрос</button>
                    <button className="child" onClick={close}>Закрыть</button>
                </div>
            </div>
        </form>
    );
};

export default RestorePasswordForm;