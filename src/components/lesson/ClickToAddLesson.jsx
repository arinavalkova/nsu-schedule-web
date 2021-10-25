import React, {useEffect, useState} from 'react';
import LessonParams from "./LessonParams";
import {grey, white} from "../../Consts";

const ClickToAddLesson = ({lesson, add, remove, isWhite, setIsWhite}) => {

    let clicked = false;

    const click = (event) => {
        //setEvent(event)
        if (!clicked) {
            event.currentTarget.style.background = grey
            clicked = true
            add(lesson)
        } else if (clicked) {
            event.currentTarget.style.background = white
            remove(lesson)
            clicked = false
        }
    }

    const over = (event) => {
        if (!clicked)
            event.currentTarget.style.background = grey
    }

    const out = (event) => {
        if (!clicked)
            event.currentTarget.style.background = white
    }

    return (
        <div className="lesson" onMouseOver={(event) => over(event)}
             onMouseOut={(event) => out(event)} onClick={click}>
            <div>
                <div>
                    <LessonParams lesson={lesson}/>
                </div>
            </div>
        </div>
    );
};

export default ClickToAddLesson;