import React from 'react';

import classes from './BurgerButton.module.css';

const burgerButton = (props) => (
    <div
        className={classes.BurgerButton}
        onClick={props.clicked}
    >
        <span></span>
        <span></span>
        <span></span>
    </div>
);

export default burgerButton;