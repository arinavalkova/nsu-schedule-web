import React, {useState} from 'react';
import Modal from "../form/Modal";
import DeleteLessonForm from "../form/delete/DeleteLessonForm";
import b from "../../App.css"

const LessonWithClick = ({lesson, remove}) => {

    const [deleteLessonForm, setDeleteLessonForm] = useState(false)


    const click = () => {
        setDeleteLessonForm(true)
    }

    const enter = (event) => {
        // console.log(event.relatedTarget.parentElement.attributes.class.localName)
        console.log(event.currentTarget)
        event.currentTarget.style.background = '#f1f1ee'
        // if (event.nativeEvent) {
        //     // console.log(target.relatedTarget)
        //     // target.relatedTarget.style.borderColor = '#bb1717';
        //     event.nativeEvent.style.borderColor = '#bb1717'
        //     console.log("ENTER")
        // }
    }

    const out = (event) => {
        console.log(event.currentTarget)
        event.currentTarget.style.background = '#ffffff'
        // console.log(event.relatedTarget.parentElement)
        // if (event.nativeEvent) {
        //     console.log(event.nativeEvent)
        //     event.nativeEvent.style.borderColor = '#0e0d0d';
        // }
        // console.log("OUT")
    }


    return (
        <div className="block" onMouseOver={(event) => enter(event)}
             onMouseOut={(event) => out(event)}>
            <div>
                <Modal visible={deleteLessonForm} setVisible={setDeleteLessonForm}>
                    <DeleteLessonForm addLesson={remove} setVisible={setDeleteLessonForm}/>
                </Modal>
                <div className="lesson">
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