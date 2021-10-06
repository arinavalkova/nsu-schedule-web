import React from 'react';
import Cell from "./Cell";
import {times, lessonNums, dayNums} from "../Consts"

const ScheduleTable = ({lessons, remove}) => {

    const headersNames = ["Время", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]

    function getLessonsForThisTimeAndDay(dayNum, lessonNum) {
        if (lessons == null) {
            return []
        }
        return lessons
            .find(lesson => lesson.dayNum === dayNum).subjects
            .filter(subject => subject.lessonNum === lessonNum)
    }

    return (
        <div>
            <table className="scheduleTable">
                <tr>
                    {headersNames.map(header =>
                        <th>{header}</th>
                    )}
                </tr>
                {lessonNums.map(lessonNum =>
                    <tr>
                        <td className="times">{times[lessonNum - 1]}</td>
                        {dayNums.map(dayNum =>
                            <td><Cell remove={remove}
                                      lessons={getLessonsForThisTimeAndDay(dayNum, lessonNum).map(lesson => {
                                          lesson.dayNum = dayNum
                                          return lesson
                                      })}/>
                            </td>
                        )}
                    </tr>
                )}
            </table>
        </div>
    );
};

export default ScheduleTable;