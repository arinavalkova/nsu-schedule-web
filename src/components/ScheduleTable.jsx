import React from 'react';
import Cell from "./Cell";
import {days, times} from "../Consts"

const ScheduleTable = ({lessons, remove}) => {

    const headersNames = ["Время", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]

    function getLessonsForThisTimeAndDay(day, time) {
        return lessons.filter(lesson => lesson.day === day && lesson.time === time)
    }

    return (
        <div>
            <table className="scheduleTable">
                <tr>
                    {headersNames.map(header =>
                        <th>{header}</th>
                    )}
                </tr>
                {times.map(time =>
                    <tr>
                        <td className="times">{time}</td>
                        {days.map(day =>
                            <td><Cell remove={remove} lessons={getLessonsForThisTimeAndDay(day, time)}/></td>
                        )}
                    </tr>
                )}
            </table>
        </div>
    );
};

export default ScheduleTable;