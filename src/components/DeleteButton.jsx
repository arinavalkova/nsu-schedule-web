import React from 'react';

const DeleteButton = ({lesson, remove}) => {
    return (
        <button onClick={() => remove(lesson)}>-</button>
    );
};

export default DeleteButton;