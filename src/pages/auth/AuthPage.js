import React, {useState} from 'react';
import "./auth.css"
import {useHistory} from "react-router-dom";
import LoadingPage from "../../components/loader/LoadingPage";
import {GreetPath} from "../../Consts";
import Modal from "../../components/form/modal/Modal";
import RestorePasswordForm from "../../components/form/restore/RestorePasswordForm";
import {authenticateOnTheServer, forgotPasswordFromServer} from "../../ServerApi";

const AuthPage = () => {

    const [loading, setLoading] = useState(false)
    const [restoreForm, setRestoreForm] = useState(false)

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const router = useHistory()

    const auth = async () => {
        setLoading(true)
        const response = await authenticateOnTheServer(login, password)
        if (response.status == 200) {
            localStorage.setItem('isAuth', "true")
            router.push(GreetPath)
            setLogin('')
            setPassword('')
        } else {
            alert("Не удалось авторизоваться!")
        }
        setLoading(false)
    }

    const back = () => {
        setLoading(true)
        setLogin('')
        setPassword('')
        router.push(GreetPath)
        setLoading(false)
    }

    return (
        <div className="parent">
            <div className="box">
                <h1 className="child">Авторизация</h1>
                <LoadingPage visible={loading}/>
                <Modal visible={restoreForm} setVisible={setRestoreForm}>
                    <RestorePasswordForm setVisible={setRestoreForm}/>
                </Modal>
                <div className="authForm">
                    <input className="child" placeholder="Логин" value={login}
                           onChange={event => setLogin(event.target.value)}/>
                    <input className="child" placeholder="Пароль" value={password}
                           onChange={event => setPassword(event.target.value)}/>
                    <button className="child" onClick={auth}>Авторизоваться</button>
                    <button className="child" onClick={() => setRestoreForm(true)}>Восстановить пароль</button>
                    <button className="child" onClick={back}>Назад</button>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;