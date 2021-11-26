import React, {useState} from 'react';
import "./simpleLoadForm.css"
import LoadingPage from "../../../loader/LoadingPage";

const SimpleLoadForm = ({loadFromLocal, loadFromDistant, setVisible}) => {

    const [localLink, setLocalLink] = useState("")
    const [loading, setLoading] = useState(false)
    const [distantLink, setDistantLink] = useState("")

    const close = (e) => {
        e.preventDefault()
        setLocalLink("")
        setVisible(false)
    }

    const loadFromLocalLink = (e) => {
        setLoading(true)
        e.preventDefault()
        setLocalLink("")
        loadFromLocal(localLink)
        setVisible(false)
        setLoading(false)
    }

    const loadFromDistantLink = (e) => {
        setLoading(true)
        e.preventDefault()
        setDistantLink("")
        loadFromDistant(distantLink)
        setVisible(false)
        setLoading(false)
    }

    return (
        <form>
            <div className="loadForm">
                <LoadingPage visible={loading}/>
                <h2>Загрузить расписание:</h2>
                <div>
                    <input type="text" placeholder={"Введите локальную ссылку"} value={localLink}
                           onChange={(e) => setLocalLink(e.target.value)}/>
                    <button onClick={loadFromLocalLink}>Загрузить по локальной ссылке</button>
                </div>
                <div>
                    <input type="text" placeholder={"Введите дистанционную ссылку"} value={distantLink}
                           onChange={(e) => setDistantLink(e.target.value)}/>
                    <button onClick={loadFromDistantLink}>Загрузить по удаленной ссылке</button>
                </div>
                <button className="child" onClick={close}>Закрыть</button>
            </div>
        </form>
    );
};

export default SimpleLoadForm;