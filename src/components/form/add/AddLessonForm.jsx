import React, {useState} from 'react';
import {times, days, lessonNums, dayNums, nullLine} from "../../../Consts";
import {firstDay, firstLesson, firstType, firstWeek, empty} from "../../../Consts";
import cl from './AddLessonModal.module.css'
import Select from "../../Select";

const AddLessonForm = ({addLesson, setVisible}) => {

    const initLesson = {
        lessonNum: firstLesson,
        dayNum: firstDay,
        type: firstType,
        name: empty,
        room: empty,
        teacher: empty,
        odd: firstWeek
    };

    const [lesson, setLesson] = useState(initLesson)

    const createLesson = (e) => {
        e.preventDefault()
        if (lesson.name === empty || lesson.room === empty || lesson.teacher === empty) {
            alert("Недостаточно данных для создания пары")
        } else {
            addLesson({...lesson, id: Date.now(), odd: lesson.odd === nullLine ? null : lesson.odd})
            setLesson(initLesson)
            setVisible(false)
        }
    }

    return (
        <form>
            <div className={cl.addLesson}>
                <Select value={lesson.lessonNum} onChange={(e) => setLesson({...lesson, lessonNum: e.target.value})}
                        defaultText={"Выберите время"} listOfContent={times} listOfValues={lessonNums}/>
                <Select value={lesson.dayNum} onChange={(e) => setLesson({...lesson, dayNum: e.target.value})}
                        defaultText={"Выберите день"} listOfContent={days} listOfValues={dayNums}/>
                <Select value={lesson.type} onChange={(e) => setLesson({...lesson, type: e.target.value})}
                        defaultText={"Выберите тип"} listOfValues={["лек", "сем"]}
                        listOfContent={["Лекция", "Семинар"]}/>
                <input id="nameInput" type="text" placeholder="Название пары" value={lesson.name}
                       onChange={(e) => setLesson({...lesson, name: e.target.value})}/>
                <input id="roomInput" type="text" placeholder="Аудитория" value={lesson.room}
                       onChange={(e) => setLesson({...lesson, room: e.target.value})}/>
                <input id="tutorInput" type="text" placeholder="Преподаватель" value={lesson.teacher}
                       onChange={(e) => setLesson({...lesson, teacher: e.target.value})}/>
                <Select value={lesson.odd} onChange={(e) => setLesson({...lesson, odd: e.target.value})}
                        defaultText={"Выберите частоту"} listOfValues={["Четная", "Нечетная", "null"]}
                        listOfContent={["Четная", "Нечетная", "Каждую неделю"]}/>
                <button onClick={createLesson}>Создать пару</button>
            </div>
        </form>
    );
};

export default AddLessonForm;