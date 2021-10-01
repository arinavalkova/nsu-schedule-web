import React from 'react';
import cl from '../styles/AddLessonForm.module.css'

const AddLessonForm = ({children}) => {
    return (
        <div className={[cl.addLessonForm, cl.active].join(' ')}>
            <div className={cl.addLessonFormContent}>
                {children}
            </div>
        </div>
    );
};

export default AddLessonForm;