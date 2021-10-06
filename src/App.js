import './styles/App.css';
import ScheduleTable from "./components/ScheduleTable";
import React, {useEffect, useState} from "react";
import AddLessonModal from "./components/AddLessonModal";
import AddLessonForm from "./components/AddLessonForm";
import Select from "./components/Select";
import axios from "axios";

function App() {
    const [groups, setGroups] = useState([])
    const [currentGroup, setCurrentGroup] = useState()

    const getGroups = async () => {
        const response = await axios.get("http://localhost:8080/api/group_num_list")
        setGroups(response.data)
        setCurrentGroup(response.data[0])
    }

    useEffect(() => {
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

    const addLesson = (lesson) => {
        setLessons([...lessons, lesson])
    }

    const removeLesson = async (lesson) => {
        //setLessons(lessons.filter(l => l.id !== lesson.id))
        await axios.delete("http://localhost:8080/api/table", {data: lesson})
        setLessons((await axios.get("http://localhost:8080/api/table")).data.table)
    }

    const [lessons, setLessons] = useState()
    const [addLessonForm, setAddLessonForm] = useState(false)

    return (
        <div className="app">
            <div className="appContent">
                <Select onChange={(e) => setNewGroup(e.target.value)}
                        defaultText={"Выберите группу"} listOfContent={groups} listOfValues={groups}/>
            </div>
            <div className="appContent">
                <AddLessonModal visible={addLessonForm} setVisible={setAddLessonForm}>
                    <AddLessonForm addLesson={addLesson} setVisible={setAddLessonForm}/>
                </AddLessonModal>
                <ScheduleTable remove={removeLesson} lessons={lessons}/>
            </div>
            <div className="appContent">
                <button onClick={() => setAddLessonForm(true)}>Создать новую пару</button>
            </div>
        </div>
    );
}

export default App;
