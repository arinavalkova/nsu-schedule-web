import '../../App.css';
import React, {useContext, useEffect, useState} from "react";
import {getGroupsFromServer} from "../../ServerApi";
import axios from "axios";
import Select from "../../components/Select";
import Modal from "../../components/form/Modal";
import AddLessonForm from "../../components/form/add/AddLessonForm";
import ScheduleTable from "../../components/table/ScheduleTable";
import {AuthContext} from "../../context";
import Cell from "../../components/cell/Cell";
import {useHistory} from "react-router-dom";

function MainPage() {
    const router = useHistory()

    const {isAuth, setIsAuth} = useContext(AuthContext)

    const [groups, setGroups] = useState([])
    const [currentGroup, setCurrentGroup] = useState(isAuth)

    const getGroups = async () => {
        const response = await getGroupsFromServer()
        setGroups(response.data)
       // setCurrentGroup(isAuth)
    }

    useEffect(() => {
        axios.defaults.withCredentials = true
        getGroups()
    }, [])

    useEffect(() => {
        if (currentGroup != null) {
            setNewGroup(currentGroup)
        }
    }, [currentGroup])

    const setNewGroup = async (group) => {
        //setCurrentGroup(group)
        console.log(group)
        const response = await axios.post('http://localhost:8080/api/table',
            {groupNum: group}
        )
        console.log(response.data.table)
        setLessons(response.data.table)
    }

    const addLesson = async (lesson) => {
        await axios.put("http://localhost:8080/api/table", {dayNum: lesson.dayNum, subject: lesson})
        setLessons((await axios.get("http://localhost:8080/api/table")).data.table)
    }

    const removeLesson = async (lesson) => {
        await axios.delete("http://localhost:8080/api/table", {data: lesson})
        setLessons((await axios.get("http://localhost:8080/api/table")).data.table)
    }

    const [lessons, setLessons] = useState()
    const [addLessonForm, setAddLessonForm] = useState(false)

    const logout = () => {
        setIsAuth('')
        localStorage.setItem('auth', '')
        router.push('/auth')
    }

    return (
        <div className="main">
            <div>
                {/*<div className="appContent">*/}
                {/*    <Select onChange={(e) => setNewGroup(e.target.value)}*/}
                {/*            defaultText={"Выберите группу"} listOfContent={groups} listOfValues={groups} selected={currentGroup}/>*/}
                {/*</div>*/}
                <button onClick={logout}>Выйти</button>
                <button className="editButton" onClick={() => router.push('/edit')}>Изменить</button>
                <h1 className="mainHeader">{isAuth}</h1>
                <div className="appContent">
                    <Modal visible={addLessonForm} setVisible={setAddLessonForm}>
                        <AddLessonForm addLesson={addLesson} setVisible={setAddLessonForm}/>
                    </Modal>
                    <ScheduleTable remove={removeLesson} lessons={lessons} Cel={Cell}/>
                </div>
                {/*<div className="appContent">*/}
                {/*    <button onClick={() => setAddLessonForm(true)}>Создать новую пару</button>*/}
                {/*</div>*/}
            </div>
        </div>
    );
}

export default MainPage;