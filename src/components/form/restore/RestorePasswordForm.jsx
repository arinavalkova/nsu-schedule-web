import React, {useState} from 'react';
import LoadingPage from "../../loader/LoadingPage";

const RestorePasswordForm = ({setVisible}) => {

    const [loading, setLoading] = useState(false)
    const [mail, setMail] = useState('')

    const close = (e) => {
        e.preventDefault()
        setVisible(false)
    }

    const send = (e) => {
        e.preventDefault()
        setLoading(true)
        //send to backend and handling errors
        setLoading(false)
        setVisible(false)
    }

    return (
        <form>
            <div className="restoreForm">
                <LoadingPage visible={loading}/>
                <h2>Введите почту для воостановления пароля:</h2>
                <div className="box">
                    <input className="child" placeholder="Электронная почта" value={mail} onChange={e => setMail(e.target.value)}/>
                    <button className="child" onClick={send}>Отправить запрос</button>
                    <button className="child" onClick={close}>Закрыть</button>
                </div>
            </div>
        </form>
    );
};

export default RestorePasswordForm;