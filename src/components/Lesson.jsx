import React from 'react';

const Lesson = (props) => {
    return (
        <div className="block">
            <div className="lesson">
                <div>{props.lesson.type}</div>
                <div>{props.lesson.name}</div>
                <div>{props.lesson.room}</div>
                <div>{props.lesson.tutor}</div>
                <div>{props.lesson.week}</div>
            </div>
            <button>-</button>
        </div>
    );
};

export default Lesson;