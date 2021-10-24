import React from 'react';
import "./createMenuForm.css"

const CreateMenuForm = ({setCreateMenuVisible, setCreateNewVisible, setGroupForm}) => {

    const createNew = (e) => {
        e.preventDefault()
        setCreateMenuVisible(false)
        setCreateNewVisible(true)
    }

    const addExists = (e) => {
        e.preventDefault()
        setCreateMenuVisible(false)
        setGroupForm(true)
    }

    const back = (e) => {
        e.preventDefault()
        setCreateMenuVisible(false)
    }

    return (
        <form>
            <div>
                <h1>Как создать пару?</h1>
                <div className="block">
                    <button className="createTypeButton" onClick={createNew}>Создать свою пару</button>
                    <button className="createTypeButton"
                            onClick={addExists}>Добавить пару из другого расписания</button>
                    <button className="createTypeButton" onClick={back}>Назад</button>
                </div>
            </div>
        </form>
    );
};

export default CreateMenuForm;