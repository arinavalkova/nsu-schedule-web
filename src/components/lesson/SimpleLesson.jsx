import React from 'react';
import "./lesson.css"
import LessonParams from "./LessonParams";

const SimpleLesson = ({lesson}) => {

    return (
        <div className="lesson">
            <LessonParams lesson={lesson}/>
        </div>
    );
};

export default SimpleLesson;