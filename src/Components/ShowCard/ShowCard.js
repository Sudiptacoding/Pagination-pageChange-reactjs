import React from 'react';

import './ShowCard.css';

const ShowCard = (props) => {
    const {name, email,id} = props.item;
    return (
        <div className='item'>
            <h4>{name}</h4>
            <h4>{id}</h4>
            <h5>{email}</h5>
        </div>
    );
};

export default ShowCard;