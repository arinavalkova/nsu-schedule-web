import React from 'react';

const Select = ({value, onChange, defaultText, listOfContent, listOfValues}) => {
    return (
        <select value={value}
                onChange={onChange}>
            <option disabled>{defaultText}</option>
            {listOfContent.map((item, index) =>
                <option value={listOfValues[index]} key={item}>{item}</option>
            )}
        </select>
    );
};

export default Select;