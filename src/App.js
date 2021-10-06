import './styles/App.css';
import ScheduleTable from "./components/ScheduleTable";
import React, {useEffect, useState} from "react";
import AddLessonModal from "./components/AddLessonModal";
import AddLessonForm from "./components/AddLessonForm";
import Select from "./components/Select";
import axios from "axios";

function App() {

    const firstLesson = {
        id: 1,
        time: "9:00",
        day: "пн",
        type: "лек",
        name: "ОП Java-программ",
        room: "1133",
        tutor: "Адаманский А.В.",
        week: "Нечетная"
    }

    const secondLesson = {
        id: 2,
        time: "18:10",
        day: "сб",
        type: "лек",
        name: "Раз.прил.Android",
        room: "1133",
        tutor: "Степанов П.А.",
        week: "четная"
    }

    const thirdLesson = {
        id: 3,
        time: "18:10",
        day: "сб",
        type: "сем",
        name: "ОП Java-программ",
        room: "1133",
        tutor: "Адаманский А.В.",
        week: "Нечетная"
    }

    const fourthLesson = {
        id: 4,
        time: "16:20",
        day: "ср",
        type: "сем",
        name: "Раз.прил.Android",
        room: "4133",
        tutor: "Степанов П.А.",
        week: "четная"
    }

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
        const response = await axios.post("http://localhost:8080/api/table/{" + group + "}", {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
            }
        })
        console.log(response.data)
        //setLessons with fetching request for current group
    }

    const addLesson = (lesson) => {
        setLesson([...lessons, lesson])
    }

    const removeLesson = (lesson) => {
        setLesson(lessons.filter(l => l.id !== lesson.id))
    }

    const [lessons, setLesson] = useState([firstLesson, secondLesson, thirdLesson, fourthLesson])
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
