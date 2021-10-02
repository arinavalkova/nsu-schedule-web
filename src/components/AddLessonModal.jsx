import React from 'react';
import cl from '../styles/AddLessonModal.module.css'

const AddLessonModal = ({children, visible, setVisible}) => {

    const rootClasses = [cl.addLessonForm]

    if (visible){
        rootClasses.push(cl.active)
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={cl.addLessonFormContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default AddLessonModal;