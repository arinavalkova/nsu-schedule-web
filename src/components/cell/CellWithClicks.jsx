import React from 'react';
import LessonWithClick from "../lesson/LessonWithClick";

const CellWithClicks = ({lessons, remove}) => {

    return (
        <div className="cell">
            {lessons.map(lesson =>
                <LessonWithClick remove={remove} lesson={lesson} key={lesson.id}/>
            )}
        </div>
    );
};

export default CellWithClicks;