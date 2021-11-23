import "./loading.css"

import React from 'react';
import Spinner from "./Spinner";
import cl from "../form/modal/Modal.module.css";

const LoadingPage = ({visible}) => {

    const rootClasses = [cl.form]

    if (visible) {
        rootClasses.push(cl.active)
    }

    return (
        <div className={rootClasses.join(' ')}>
            <div>
                <Spinner/>
            </div>
        </div>
    );
};

export default LoadingPage;