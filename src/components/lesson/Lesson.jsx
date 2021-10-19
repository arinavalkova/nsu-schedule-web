import React from 'react';

const Lesson = ({lesson}) => {

    return (
        <div className="block">
            <div className="lesson">
                <div>{lesson.type}</div>
                <div>{lesson.name}</div>
                <div>{lesson.room}</div>
                <div>{lesson.teacher}</div>
                <div>{lesson.odd? lesson.odd: ""}</div>
            </div>
        </div>
    );
};

export default Lesson;