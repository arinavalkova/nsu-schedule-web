import './styles/App.css';
import ScheduleTable from "./components/ScheduleTable";
import {useState} from "react";

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

    const addLesson = () => {
        setLesson([...lessons, fourthLesson])
    }

    const removeLesson = (lesson) => {
        setLesson(lessons.filter(l => l.id !== lesson.id))
    }

    const [lessons, setLesson] = useState([firstLesson, secondLesson, thirdLesson])

    return (
        <div>
            <ScheduleTable remove={removeLesson} lessons={lessons}/>
            <button onClick={addLesson}>Add lesson</button>
        </div>
    );
}

export default App;
