import React, {useState} from 'react';
import Modal from "../form/Modal";
import DeleteLessonForm from "../form/delete/DeleteLessonForm";
import AddLessonForm from "../form/add/AddLessonForm";

const LessonWithClick = ({lesson, remove}) => {

    const [deleteLessonForm, setDeleteLessonForm] = useState(false)


    const click = () => {
        console.log("JCJKCJSC")
        setDeleteLessonForm(true)
    }

    const enter = (event) => {
        event.currentTarget.style.background = '#f1f1ee'
    }

    const out = (event) => {
        event.currentTarget.style.background = '#ffffff'
    }

    return (
        // <div className="block" onMouseOver={(event) => enter(event)}
        //      onMouseOut={(event) => out(event)} onClick={click}>
        <div className="block" onMouseOver={(event) => enter(event)}
             onMouseOut={(event) => out(event)}>
            <div>
                <Modal visible={deleteLessonForm} setVisible={setDeleteLessonForm}>
                    <DeleteLessonForm lesson={lesson} deleteLesson={remove} setVisible={setDeleteLessonForm}/>
                </Modal>
                <div className="lesson" onClick={click}>
                    <div>{lesson.type}</div>
                    <div>{lesson.name}</div>
                    <div>{lesson.room}</div>
                    <div>{lesson.teacher}</div>
                    <div>{lesson.odd ? lesson.odd : ""}</div>
                </div>
            </div>
        </div>
    );
};

export default LessonWithClick;