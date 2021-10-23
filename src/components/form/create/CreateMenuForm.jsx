import React from 'react';
import "./createMenuForm.css"

const CreateMenuForm = ({setCreateMenuVisible, setCreateNewVisible, setAddExistsVisible}) => {

    const createNew = (e) => {
        e.preventDefault()
        setCreateMenuVisible(false)
        setCreateNewVisible(true)
    }

    const addExists = (e) => {
        e.preventDefault()
        setCreateMenuVisible(false)
        setAddExistsVisible(true)
    }

    const back = (e) => {
        e.preventDefault()
        setCreateMenuVisible(false)
    }

    return (
        <form>
            <div>
                <h1>Как создать пару?</h1>
                <div>
                    <button className="createTypeButton" onClick={createNew}>Создать свою пару</button>
                    <button className="createTypeButton" onClick={addExists}>Добавить пару из другого расписания
                    </button>
                    <button className="createTypeButton" onClick={back}>Назад</button>
                </div>
            </div>
        </form>
    );
};

export default CreateMenuForm;