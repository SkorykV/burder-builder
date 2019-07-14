import React, {Component, Fragment} from 'react';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import classes from './Layout.module.css';

class Layout extends Component {
    state = {
        showSideDrawer: false,
    };

    sideDrawerOpenHandler = () => {

        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    };

    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false});
    };

    render() {
        return (
            <Fragment>
                <Toolbar drawerToggleClicked={this.sideDrawerOpenHandler}/>
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerCloseHandler}/>
                <main className={classes.content}>{this.props.children}</main>
            </Fragment>
        )
    }
}

export default Layout;