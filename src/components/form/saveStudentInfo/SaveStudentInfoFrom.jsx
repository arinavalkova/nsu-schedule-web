import './saveStudentInfoForm.css'
import React, { useState } from "react";
import { saveStudentInfoToServer } from "../../../ServerApi";
import LoadingPage from "../../loader/LoadingPage";

const SaveStudentInfoForm = (props) => {
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState('')

    const save = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await saveStudentInfoToServer(props.name, props.group)
            setResult("Данные сохранены!")
        } catch (err) {
            setResult("Не удалось сохранить данные")
        }
        setLoading(false)
    }

    const close = e => {
        e.preventDefault()
        props.setVisible(false)
    }

    return <form>
        <div className="saveStudentInfoForm">
            <LoadingPage visible={loading}/>
            <h2>Вы действительно хотите запомнить эти данные?</h2>
            <p className="paragraph">{'ФИО: ' + props.name + '\nГруппа: ' + props.group + '\n' + result}</p>
            <button
                onClick={save}
                className='child'>
                Сохранить
            </button>
            <button
                onClick={close}
                className='child'>
                Закрыть
            </button>
        </div>
    </form>
}

export default SaveStudentInfoForm