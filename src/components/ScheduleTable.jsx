import React from 'react';
import Cell from "./Cell";

const ScheduleTable = (props) => {

    const times = ["9:00", "10:50", "12:40", "14:30", "16:20", "18:10", "20:00"]

    const days = ["пн", "вт", "ср", "чт", "пт", "сб"]

    function getLessonsForThisTimeAndDay(day, time) {
        return props.lessons.filter(lesson => lesson.day === day && lesson.time === time)
    }

    return (
        <div>
            <table className="scheduleTable">
                <tr>
                    <th>Время</th>
                    <th>Понедельник</th>
                    <th>Вторник</th>
                    <th>Среда</th>
                    <th>Четверг</th>
                    <th>Пятница</th>
                    <th>Суббота</th>
                </tr>
                {times.map(time =>
                    <tr>
                        <td>{time}</td>
                        {days.map(day =>
                            <td><Cell remove={props.remove} lessons={getLessonsForThisTimeAndDay(day, time)}/></td>
                        )}
                    </tr>
                )}
            </table>
        </div>
    );
};

export default ScheduleTable;