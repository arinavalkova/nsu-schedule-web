import React from 'react';
import LessonWithButton from "../lesson/LessonWithButton";

const CellWithButtons = ({lessons, remove}) => {

    return (
        <div className="cell">
            {lessons.map(lesson =>
                <LessonWithButton remove={remove} lesson={lesson} key={lesson.id}/>
            )}
        </div>
    );
};

export default CellWithButtons;