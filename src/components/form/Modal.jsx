import React from 'react';
import cl from './add/AddLessonModal.module.css'

const Modal = ({children, visible, setVisible}) => {

    const rootClasses = [cl.addLessonForm]

    if (visible) {
        rootClasses.push(cl.active)
    }

    const onClick = () => {
        console.log("CLICKED")
        setVisible(false)
    }

    return (
        <div className={rootClasses.join(' ')} onClick={onClick}>
            <div className={cl.addLessonFormContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;