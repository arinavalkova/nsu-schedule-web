import '../../App.css';
import "./mainPage.css"
import LoadingPage from "../../components/loader/LoadingPage";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { EditPath, GreetPath } from "../../Consts";
import Cell from "../../components/cell/Cell";
import ScheduleTable from "../../components/table/ScheduleTable";
import SimpleLesson from "../../components/lesson/SimpleLesson";
import { getScheduleFromServer, setNewScheduleToServer, setUpAxiosCredentials } from "../../ServerApi";
import Modal from "../../components/form/modal/Modal";
import SaveForm from "../../components/form/save/SaveForm";
import ComplexLoadForm from "../../components/form/load/complex/ComplexLoadForm";
import SimpleLoadForm from "../../components/form/load/simple/SimpleLoadForm";


const MainPage = () => {

    const [nameValue, setNameValue] = useState("");
    const [groupValue, setGroupValue] = useState("");
    const [lessons, setLessons] = useState()
    const [saveFormMenu, setSaveFormMenu] = useState(false)
    const [complexLoadMenu, setComplexLoadMenu] = useState(false)
    const [complexSaveFormMenu, setComplexSaveFormMenu] = useState(false)
    const [simpleFormMenu, setSimpleFormMenu] = useState(false)
    const [loading, setLoading] = useState(false)

    const router = useHistory()
    useEffect(() => {
        setUpAxiosCredentials().then(
            fetchTable()
        )
    }, [])

    const back = () => {
        router.push(GreetPath)
    }

    const fetchTable = async () => {
        setLoading(true)
        try {
            const data = (await getScheduleFromServer()).data
            if (data.studentInfo) {
                setNameValue(data.studentInfo.name)
                setGroupValue(data.studentInfo.groupNum)
            }
            setLessons(data.table)
            setLoading(false)
            if (!data.table) back()
        } catch (err) {
            alert(err.message)
            back()
        }

    }

    const loadFromLocal = async (base64) => {
        setLoading(true)
        try {
            await setNewScheduleToServer(
                JSON.parse(decodeURIComponent(escape(window.atob(base64)))))
            await fetchTable()
        } catch (err) {
            alert("Произошла ошибка при загрузке расписания!")
            console.log(err)
        }
        setLoading(false)
    }

    const loadFromDistant = () => {
        //TODO
    }

    return <div className="page">
        <div>
            <LoadingPage visible={loading}/>
            <div className="header">
                <button className="backButton" onClick={back}>Назад</button>
                <button className="editButton" onClick={() => router.push(EditPath)}>Изменить</button>
                <button className="loadButton" onClick={() => setComplexLoadMenu(true)}>Загрузить расписание</button>
                <button className="saveButton" onClick={() => setSaveFormMenu(true)}>Сохранить расписание</button>
            </div>
            <div><h1 className="headerText">{nameValue} {groupValue}</h1></div>
            <div className="content">
                <ScheduleTable lessons={lessons} CellClass={Cell} LessonClass={SimpleLesson}/>
            </div>
            <Modal visible={saveFormMenu} setVisible={setSaveFormMenu}>
                <SaveForm lessons={lessons} setVisible={setSaveFormMenu}/>
            </Modal>
            <Modal visible={complexLoadMenu} setVisible={setComplexLoadMenu}>
                <ComplexLoadForm setVisible={setComplexLoadMenu}
                                 setSimpleFormMenu={setSimpleFormMenu}
                                 setComplexSaveFormMenu={setComplexSaveFormMenu}/>
            </Modal>
            <Modal visible={complexSaveFormMenu} setVisible={setComplexSaveFormMenu}>
                <SaveForm next={setSimpleFormMenu}
                          lessons={lessons}
                          setVisible={setComplexSaveFormMenu}/>
            </Modal>
            <Modal visible={simpleFormMenu} setVisible={setSimpleFormMenu}>
                <SimpleLoadForm loadFromLocal={loadFromLocal}
                                loadFromDistant={loadFromDistant}
                                setVisible={setSimpleFormMenu}/>
            </Modal>
        </div>
    </div>
}

export default MainPage