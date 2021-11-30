import axios from "axios";

export async function getGroupsFromServer() {
    return await axios.get("http://localhost:8080/api/group_num_list")
}

export async function setAndGetScheduleFromServer(name, group) {
    return await axios.post('http://localhost:8080/api/table', {name: name, groupNum: group})
}

export async function getScheduleFromServer() {
    return await axios.get("http://localhost:8080/api/table")
}

export async function addLessonToServer(lesson) {
    return await axios.post("http://localhost:8080/api/table/subject", {dayNum: lesson.dayNum, subject: lesson})
}

export async function deleteLessonFromServer(lesson) {
    return await axios.delete("http://localhost:8080/api/table/subject", {data: lesson})
}

export async function getGroupScheduleFromServer(group) {
    return await axios.get('http://localhost:8080/api/table/' + group)
}

export async function changeLessonFromServer(oldSubject, newSubjectParams) {
    return await axios.put('http://localhost:8080/api/table/subject', {oldSubject, ...newSubjectParams})
}

export async function logoutFromServer() {
    await axios.post('http://localhost:8080/api/logout')
}

export async function setNewScheduleToServer(lessons) {
    return await axios.put('http://localhost:8080/api/table', {table: lessons})
}

export async function registerOnTheServer(login, password) {
    let response
    response = await axios.post('http://localhost:8080/api/user/save', {username: login, password})
        .catch(error => response = error.response)
    return response
}

export async function authenticateOnTheServer(login, password) {
    let response
    response = await axios.post('http://localhost:8080/login', {username: login, password})
        .catch(error => response = error.response)
    return response
}

export async function forgotPasswordFromServer(email) {
    let response
    response = await axios.post('http://localhost:8080/api/user/password', {email})
        .catch(error => response = error.response)
    return response
}

export async function getBaseScheduleFromServer() {
    return await axios.get('http://localhost:8080/api/student_info')
}

export async function saveBaseScheduleToServer(name, group) {
    await axios.post('http://localhost:8080/api/student_info', {name, groupNum: group})
}