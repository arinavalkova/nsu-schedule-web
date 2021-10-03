import React, {useState} from 'react';
import {times, days} from "../Consts";
import {firstDay, firstTime, firstType, firstWeek, empty} from "../Consts";
import cl from '../styles/AddLessonModal.module.css'
import Select from "./Select";

const AddLessonForm = ({addLesson, setVisible}) => {

    const initLesson = {
        time: firstTime,
        day: firstDay,
        type: firstType,
        name: empty,
        room: empty,
        tutor: empty,
        week: firstWeek
    };

    const [lesson, setLesson] = useState(initLesson)

    const createLesson = (e) => {
        e.preventDefault()
        if (lesson.name === empty || lesson.room === empty || lesson.tutor === empty) {
            alert("Недостаточно данных для создания пары")
        } else {
            addLesson({...lesson, id: Date.now()})
            setLesson(initLesson)
            setVisible(false)
        }
    }

    return (
        <form>
            <div className={cl.addLesson}>
                <Select value={lesson.time} onChange={(e) => setLesson({...lesson, time: e.target.value})}
                        defaultText={"Выберите время"} listOfContent={times} listOfValues={times}/>
                <Select value={lesson.day} onChange={(e) => setLesson({...lesson, day: e.target.value})}
                        defaultText={"Выберите день"} listOfContent={days} listOfValues={days}/>
                <Select value={lesson.type} onChange={(e) => setLesson({...lesson, type: e.target.value})}
                        defaultText={"Выберите тип"} listOfValues={["лек", "сем"]}
                        listOfContent={["Лекция", "Семинар"]}/>
                <input id="nameInput" type="text" placeholder="Название пары" value={lesson.name}
                       onChange={(e) => setLesson({...lesson, name: e.target.value})}/>
                <input id="roomInput" type="text" placeholder="Аудитория" value={lesson.room}
                       onChange={(e) => setLesson({...lesson, room: e.target.value})}/>
                <input id="tutorInput" type="text" placeholder="Преподаватель" value={lesson.tutor}
                       onChange={(e) => setLesson({...lesson, tutor: e.target.value})}/>
                <Select value={lesson.week} onChange={(e) => setLesson({...lesson, week: e.target.value})}
                        defaultText={"Выберите частоту"} listOfValues={["четная", "нечетная"]}
                        listOfContent={["Четная", "Нечетная"]}/>
                <button onClick={createLesson}>Создать пару</button>
            </div>
        </form>
    );
};

export default AddLessonForm;