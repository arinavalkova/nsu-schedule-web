import '../../App.css';
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import ScheduleTable from "../../components/table/ScheduleTable";
import {AuthContext} from "../../context";
import {useHistory} from "react-router-dom";
import Cell from "../../components/cell/Cell";
import ClickToEditLesson from "../../components/lesson/ClickToEditLesson";
import "./editPage.css"
import {MainPath} from "../../Consts";
import {
    addLessonToServer, changeLessonFromServer,
    deleteLessonFromServer,
    getScheduleFromServer
} from "../../ServerApi";
import Modal from "../../components/form/modal/Modal";
import CreateMenuForm from "../../components/form/create/CreateMenuForm";
import AddLessonForm from "../../components/form/add/AddLessonForm";
import ChooseGroupForm from "../../components/form/choose/ChooseGroupForm";

function EditPage() {
    const router = useHistory()

    const {name, group} = useContext(AuthContext)
    const [nameValue, setNameValue] = name;
    const [groupValue, setGroupValue] = group;

    const [createMenuForm, setCreateMenuForm] = useState(false)
    const [createNewLessonForm, setCreateNewLessonForm] = useState(false)
    const [groupForm, setGroupForm] = useState(false)

    const [lessons, setLessons] = useState()
    const [currentGroup] = useState(groupValue)

    useEffect(() => {
        axios.defaults.withCredentials = true
        getUserSchedule()
    }, [])

    const getUserSchedule = async () => {
        const response = await getScheduleFromServer()
        setLessons(response.data.table)
        console.log(response.data.table)
    }

    const addLesson = async (lesson) => {
        await addLessonToServer(lesson)
        const response = (await getScheduleFromServer()).data.table
        console.log(response)
        setLessons(response)
    }

    const removeLesson = async (lesson) => {
        await deleteLessonFromServer(lesson)
        setLessons((await getScheduleFromServer()).data.table)
    }

    const changeLesson = async (oldSubject, newSubject) => {
        console.log("JFEFKJF")
        console.log(oldSubject)
        console.log(newSubject)
        console.log("JFEFKJF")
        await changeLessonFromServer(oldSubject, newSubject)
        const response = (await getScheduleFromServer()).data.table
        setLessons(response)
    }

    const create = () => {
        setCreateMenuForm(true)
    }

    return (
        <div className="page">
            <div>
                <div className="header">
                    <button className="backButton" onClick={() => router.push(MainPath)}>Назад</button>
                    <button className="createButton" onClick={create}>Создать новую пару</button>
                    <h1 className="headerText">Редактирование:</h1>
                </div>
                <div className="content">
                    <Modal visible={createMenuForm} setVisible={setCreateMenuForm}>
                        <CreateMenuForm setCreateMenuVisible={setCreateMenuForm}
                                        setGroupForm={setGroupForm}
                                        setCreateNewVisible={setCreateNewLessonForm}/>
                    </Modal>
                    <Modal visible={createNewLessonForm} setVisible={setCreateNewLessonForm}>
                        <AddLessonForm addLesson={addLesson} setVisible={setCreateNewLessonForm}
                                       setMenuVisible={setCreateMenuForm}/>
                    </Modal>
                    <Modal visible={groupForm} setVisible={setGroupForm}>
                        <ChooseGroupForm setVisible={setGroupForm} setMenuVisible={setCreateMenuForm}/>
                    </Modal>
                    <ScheduleTable remove={removeLesson} change={changeLesson} lessons={lessons} CellClass={Cell}
                                   LessonClass={ClickToEditLesson}/>
                </div>
            </div>
        </div>
    );
}

export default EditPage;