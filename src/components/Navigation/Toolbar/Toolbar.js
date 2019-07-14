import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems'
import Logo from '../../Logo/Logo';
import BurgerButton from '../SideDrawer/BurgerButton/BurgerButton';

import classes from './Toolbar.module.css';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <BurgerButton clicked={props.drawerToggleClicked}/>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems/>
        </nav>
    </header>
);

export default toolbar;