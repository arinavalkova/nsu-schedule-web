import './Main.css';
import React, {useEffect, useState} from "react";
import {getGroupsFromServer} from "../../ServerApi";
import axios from "axios";
import Select from "../../components/Select";
import AddLessonModal from "../../components/AddLessonModal";
import AddLessonForm from "../../components/AddLessonForm";
import ScheduleTable from "../../components/ScheduleTable";

function MainPage() {
    const [groups, setGroups] = useState([])
    const [currentGroup, setCurrentGroup] = useState()

    const getGroups = async () => {
        const response = await getGroupsFromServer()
        setGroups(response.data)
        setCurrentGroup(response.data[0])
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
        setCurrentGroup(group)
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

    return (
        <div className="app">
            {/*<div className="appContent">*/}
            {/*    <Select onChange={(e) => setNewGroup(e.target.value)}*/}
            {/*            defaultText={"Выберите группу"} listOfContent={groups} listOfValues={groups}/>*/}
            {/*</div>*/}
            <div className="appContent">
                {/*<AddLessonModal visible={addLessonForm} setVisible={setAddLessonForm}>*/}
                {/*    <AddLessonForm addLesson={addLesson} setVisible={setAddLessonForm}/>*/}
                {/*</AddLessonModal>*/}
                <ScheduleTable remove={removeLesson} lessons={lessons}/>
            </div>
            {/*<div className="appContent">*/}
            {/*    <button onClick={() => setAddLessonForm(true)}>Создать новую пару</button>*/}
            {/*</div>*/}
        </div>
    );
}

export default MainPage;