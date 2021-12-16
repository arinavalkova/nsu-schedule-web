import "./auth.css"
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import LoadingPage from "../../components/loader/LoadingPage";
import { GreetPath } from "../../Consts";
import Modal from "../../components/form/modal/Modal";
import RestorePasswordForm from "../../components/form/restore/RestorePasswordForm";
import { authenticateOnTheServer } from "../../ServerApi";
import { AuthContext } from "../../context";

const AuthPage = () => {

    const [loading, setLoading] = useState(false)
    const [restoreForm, setRestoreForm] = useState(false)

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const [isAuth, setIsAuth] = useContext(AuthContext).isAuth

    const router = useHistory()

    useEffect(() => {
            if (isAuth) back()
        },
        [])

    const auth = async () => {
        setLoading(true)
        const response = await authenticateOnTheServer(login, password)
        if (response.status === 200) {
            router.push(GreetPath)
            setLogin('')
            setPassword('')
            setIsAuth(true)
        } else {
            alert("Не удалось авторизоваться!")
        }
        setLoading(false)
    }

    const back = () => {
        setLogin('')
        setPassword('')
        router.push(GreetPath)
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
                    <input type="password" className="child" placeholder="Пароль" value={password}
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