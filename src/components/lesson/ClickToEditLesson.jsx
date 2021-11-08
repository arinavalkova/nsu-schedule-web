import React, {useState} from 'react';
import Modal from "../form/modal/Modal";
import ChangeLessonForm from "../form/change/ChangeLessonForm";
import "./lesson.css"
import {grey, white} from "../../Consts";
import LessonParams from "./LessonParams";

const ClickToEditLesson = ({lesson, remove, change}) => {

    const [deleteLessonForm, setDeleteLessonForm] = useState(false)

    const click = () => {
        setDeleteLessonForm(true)
    }

    const over = (event) => {
        event.currentTarget.style.background = grey
    }

    const out = (event) => {
        event.currentTarget.style.background = white
    }

    return (
        <div className="lesson" onMouseOver={(event) => over(event)}
             onMouseOut={(event) => out(event)}>
            <div>
                <Modal visible={deleteLessonForm} setVisible={setDeleteLessonForm}>
                    <ChangeLessonForm lesson={lesson} deleteLesson={remove} changeLesson={change}
                                      setVisible={setDeleteLessonForm}/>
                </Modal>
                <div onClick={click}>
                    <LessonParams lesson={lesson}/>
                </div>
            </div>
        </div>
    );
};

export default ClickToEditLesson;