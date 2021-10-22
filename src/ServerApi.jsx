import axios from "axios";

export async function getGroupsFromServer() {
    return await axios.get("http://localhost:8080/api/group_num_list")
}

export async function setAndGetScheduleFromServer(group) {
    return await axios.post('http://localhost:8080/api/table', {groupNum: group})
}

export async function getScheduleFromServer() {
    return await axios.get("http://localhost:8080/api/table")
}

export async function addLessonToServer(lesson) {
    return await axios.put("http://localhost:8080/api/table", {dayNum: lesson.dayNum, subject: lesson})
}

export async function deleteLessonFromServer(lesson) {
    return await axios.delete("http://localhost:8080/api/table", {data: lesson})
}