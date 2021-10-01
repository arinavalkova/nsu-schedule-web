import React from 'react';

const DeleteButton = (props) => {
    return (
        <button onClick={() => props.remove(props.lesson)}>-</button>
    );
};

export default DeleteButton;