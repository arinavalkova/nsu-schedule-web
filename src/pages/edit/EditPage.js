import '../../App.css';
import React, {useContext, useEffect, useState} from "react";
import {getGroupsFromServer} from "../../ServerApi";
import axios from "axios";
import ScheduleTable from "../../components/table/ScheduleTable";
import {AuthContext} from "../../context";
import ScheduleTableWithClicks from "../../components/table/ScheduleTableWithClicks";
import ScheduleTableWithButtons from "../../components/table/ScheduleTableWithButtons";
import {useHistory} from "react-router-dom";
import Modal from "../../components/form/Modal";
import AddLessonForm from "../../components/form/add/AddLessonForm";
import CellWithClicks from "../../components/cell/CellWithClicks";

function EditPage() {
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

    return (
        <div className="main">
            <div>
                {/*<div className="appContent">*/}
                {/*    <Select onChange={(e) => setNewGroup(e.target.value)}*/}
                {/*            defaultText={"Выберите группу"} listOfContent={groups} listOfValues={groups} selected={currentGroup}/>*/}
                {/*</div>*/}
                <button className="editButton" onClick={() => router.push('/main')}>Назад</button>
                <h1>Редактирование:</h1>
                <div className="appContent">
                    {/*<Modal visible={addLessonForm} setVisible={setAddLessonForm}>*/}
                    {/*    <AddLessonForm addLesson={addLesson} setVisible={setAddLessonForm}/>*/}
                    {/*</Modal>*/}
                    <ScheduleTable remove={removeLesson} lessons={lessons} Cel={CellWithClicks}/>
                </div>
                {/*<div className="appContent">*/}
                {/*    <button onClick={() => setAddLessonForm(true)}>Создать новую пару</button>*/}
                {/*</div>*/}
            </div>
        </div>
    );
}

export default EditPage;