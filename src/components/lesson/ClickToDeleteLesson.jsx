import React, {useState} from 'react';
import Modal from "../form/modal/Modal";
import DeleteLessonForm from "../form/delete/DeleteLessonForm";
import "./lesson.css"
import {grey, white} from "../../Consts";
import LessonParams from "./LessonParams";

const ClickToDeleteLesson = ({lesson, remove}) => {

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
                    <DeleteLessonForm lesson={lesson} deleteLesson={remove} setVisible={setDeleteLessonForm}/>
                </Modal>
                <div onClick={click}>
                    <LessonParams lesson={lesson}/>
                </div>
            </div>
        </div>
    );
};

export default ClickToDeleteLesson;