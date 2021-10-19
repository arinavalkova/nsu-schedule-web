import React from 'react';
import Lesson from "../lesson/Lesson";

const Cell = ({lessons, remove}) => {
    return (
        <div className="cell">
            {lessons.map(lesson =>
                <Lesson remove={remove} lesson={lesson} key={lesson.id}/>
            )}
        </div>
    );
};

export default Cell;