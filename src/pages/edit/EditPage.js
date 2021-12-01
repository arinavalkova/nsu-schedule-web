import '../../App.css';
import React, { useEffect, useState } from "react";
import LoadingPage from "../../components/loader/LoadingPage";
import { MainPath } from "../../Consts";
import { useHistory } from "react-router-dom";
import ScheduleTable from "../../components/table/ScheduleTable";
import Cell from "../../components/cell/Cell";
import ClickToEditLesson from "../../components/lesson/ClickToEditLesson";
import {
    addLessonToServer,
    changeLessonFromServer,
    deleteLessonFromServer,
    getScheduleFromServer,
    setUpAxiosCredentials
} from "../../ServerApi";
import Modal from "../../components/form/modal/Modal";
import CreateMenuForm from "../../components/form/create/CreateMenuForm";
import AddLessonForm from "../../components/form/add/AddLessonForm";
import ChooseGroupForm from "../../components/form/choose/ChooseGroupForm";

const EditPage = () => {
    const [loading, setLoading] = useState(false)
    const [lessons, setLessons] = useState()
    const [createMenuForm, setCreateMenuForm] = useState(false)
    const [createNewLessonForm, setCreateNewLessonForm] = useState(false)
    const [groupForm, setGroupForm] = useState(false)

    const router = useHistory()

    useEffect(() => {
        setUpAxiosCredentials().then(
            fetchTable()
        )
    }, [])

    const back = () => router.push(MainPath)

    const fetchTable = async () => {
        setLoading(true)
        try {
            const data = (await getScheduleFromServer()).data
            setLessons(data.table)
            setLoading(false)
            if (!data.table) back()
        } catch (err) {
            alert(err.message)
            back()
        }
    }

    const create = () => {
        setCreateMenuForm(true)
    }

    const addLesson = async (lesson) => {
        setLoading(true)
        await addLessonToServer(lesson)
            .then(fetchTable)
            .catch(alert)
        setLoading(false)
    }

    const removeLesson = async (lesson) => {
        setLoading(true)
        await deleteLessonFromServer(lesson)
            .then(fetchTable)
            .catch(alert)
        setLoading(false)
    }

    const changeLesson = async (oldSubject, newSubject) => {
        setLoading(true)
        await changeLessonFromServer(oldSubject, newSubject)
            .then(fetchTable)
            .catch(alert)
        setLoading(false)
    }

    return <div className="page">
        <div>
            <LoadingPage visible={loading}/>
            <div className="header">
                <button className="backButton" onClick={back}>Назад</button>
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
}

export default EditPage