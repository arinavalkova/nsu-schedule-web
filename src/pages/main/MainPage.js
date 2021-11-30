import '../../App.css';
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import ScheduleTable from "../../components/table/ScheduleTable";
import {AuthContext} from "../../context";
import Cell from "../../components/cell/Cell";
import {useHistory} from "react-router-dom";
import SimpleLesson from "../../components/lesson/SimpleLesson";
import {EditPath, GreetPath} from "../../Consts";
import "./mainPage.css"
import {
    getScheduleFromServer,
    logoutFromServer,
    setNewScheduleToServer
} from "../../ServerApi";
import Modal from "../../components/form/modal/Modal";
import SaveForm from "../../components/form/save/SaveForm";
import ComplexLoadForm from "../../components/form/load/complex/ComplexLoadForm";
import SimpleLoadForm from "../../components/form/load/simple/SimpleLoadForm";
import LoadingPage from "../../components/loader/LoadingPage";

function MainPage() {
    const router = useHistory()

    const {name, group, isAuth} = useContext(AuthContext)
    const [nameValue, setNameValue] = name;
    const [groupValue, setGroupValue] = group;
    const [isAuthValue, setIsAuthValue] = isAuth;

    const [lessons, setLessons] = useState()
    const [saveFormMenu, setSaveFormMenu] = useState(false)
    const [complexLoadMenu, setComplexLoadMenu] = useState(false)
    const [complexSaveFormMenu, setComplexSaveFormMenu] = useState(false)
    const [simpleFormMenu, setSimpleFormMenu] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setUserSchedule()
    }, [groupValue, nameValue])

    const setUserSchedule = async () => {
        setLoading(true)
        const response = await getScheduleFromServer()
        console.log(response)
        setLessons(response.data.table)
        setLoading(false)
    }

    const loadFromLocal = async (base64) => {
        setLoading(true)
        try {
            const response = await setNewScheduleToServer(JSON.parse(decodeURIComponent(escape(window.atob(base64)))))
            if (response.status == "200")
                setLessons((await getScheduleFromServer()).data.table)
            else alert("Произошла ошибка при загрузке расписания!")
        } catch (InvalidCharacterError) {
            alert("Произошла ошибка при загрузке расписания!")
        }
        setLoading(false)
    }

    const loadFromDistant = () => {
        //TODO
    }

    const back = () => {
        setLoading(true)
        router.push(GreetPath)
        setLoading(false)
    }

    const saveNameAndGroup = () => {

    }

    return (
        <div className="page">
            <div>
                <LoadingPage visible={loading}/>
                <div className="header">
                    <button className="backButton" onClick={back}>Назад</button>
                    <button className="editButton" onClick={() => router.push(EditPath)}>Изменить</button>
                    {isAuthValue == "true" && <button onClick={saveNameAndGroup}>Сохранить ФИО и группу</button>}
                    <button className="loadButton" onClick={() => setComplexLoadMenu(true)}>Загрузить расписание
                    </button>
                    <button className="saveButton" onClick={() => setSaveFormMenu(true)}>Сохранить расписание</button>
                </div>
                <div><h1 className="headerText">{nameValue} {groupValue}</h1></div>
                <div className="content">
                    <ScheduleTable lessons={lessons} CellClass={Cell} LessonClass={SimpleLesson}/>
                </div>
                <Modal visible={saveFormMenu} setVisible={setSaveFormMenu}>
                    <SaveForm lessons={lessons} setVisible={setSaveFormMenu}/>
                </Modal>
                <Modal visible={complexLoadMenu} setVisible={setComplexLoadMenu}>
                    <ComplexLoadForm setVisible={setComplexLoadMenu} setSimpleFormMenu={setSimpleFormMenu}
                                     setComplexSaveFormMenu={setComplexSaveFormMenu}/>
                </Modal>
                <Modal visible={complexSaveFormMenu} setVisible={setComplexSaveFormMenu}>
                    <SaveForm next={setSimpleFormMenu} lessons={lessons} setVisible={setComplexSaveFormMenu}/>
                </Modal>
                <Modal visible={simpleFormMenu} setVisible={setSimpleFormMenu}>
                    <SimpleLoadForm loadFromLocal={loadFromLocal} loadFromDistant={loadFromDistant} setVisible={setSimpleFormMenu}/>
                </Modal>
            </div>
        </div>
    );
}

export default MainPage;