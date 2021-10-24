import React from 'react';
import cl from './Modal.module.css'

const Modal = ({children, visible, setVisible}) => {

    const rootClasses = [cl.form]

    if (visible) {
        rootClasses.push(cl.active)
    }

    const onClick = () => {
        setVisible(false)
    }

    return (
        <div className={rootClasses.join(' ')} onClick={onClick}>
            <div className={cl.formContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;