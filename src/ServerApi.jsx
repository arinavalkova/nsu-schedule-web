import axios from "axios";
import Cookies from "js-cookie";

const getPath = path => 'http://localhost:8080/' + path;
const getPathApi = path => getPath('api/' + path)
const lessonPath = getPathApi('table/subject');

export async function setUpAxiosCredentials() {
    console.log("Setting up credentials")
    axios.defaults.withCredentials = true
    await getGroupsFromServer().then(() =>
        axios.defaults.headers.common['X-CSRF-TOKEN'] = Cookies.get('XSRF-TOKEN')
    )
}

export async function setAndGetScheduleFromServer(name, group) {
    return await axios.post(getPathApi('table'), { name: name, groupNum: group })
}

export async function getScheduleFromServer() {
    return await axios.get(getPathApi('table'))
}

export async function getGroupsFromServer() {
    return await axios.get(getPathApi('group_num_list'))
}

export async function deleteLessonFromServer(lesson) {
    return await axios.delete(lessonPath, { data: lesson })
}

export async function changeLessonFromServer(oldSubject, newSubjectParams) {
    return await axios.put(lessonPath, { oldSubject, ...newSubjectParams })
}

export async function addLessonToServer(lesson) {
    return await axios.post(lessonPath, { dayNum: lesson.dayNum, subject: lesson })
}

export async function getGroupScheduleFromServer(group) {
    return await axios.get(getPathApi('table/' + group))
}

export async function setNewScheduleToServer(lessons) {
    return await axios.put(getPathApi('table'), { table: lessons })
}

export async function registerOnTheServer(login, password) {
    let response
    response = await axios.post(getPathApi('user/save'), { username: login, password })
        .catch(error => response = error.response)
    return response
}

export async function logoutFromServer() {
    await axios.post(getPath('logout'))
}

export async function authenticateOnTheServer(login, password) {
    const data = 'username=' + login + '&password=' + password + '&_csrf=' + Cookies.get('XSRF-TOKEN')
    let response
    response = await axios.post(getPath('login'), data)
        .catch(error => response = error.response)
    return response
}

export async function forgotPasswordFromServer(email) {
    let response
    response = await axios.post(getPathApi('user/password'), { email })
        .catch(error => response = error.response)
    return response
}

export async function isAuthenticated() {
    return await axios.get(getPathApi('is_logged_in'))
}

export async function saveStudentInfoToServer(name, groupNum) {
    return await axios.post(getPathApi('student_info'), { name, groupNum })
}

export async function getStudentInfoFromServer() {
    return await axios.get(getPathApi('student_info'))
}

export async function saveStringToServer(string) {
    let path = getPath('')
    return path + (await axios.post(path, {string})).data
}

export async function getStringFromServer(link) {
    return (await axios.get(link)).data
}