import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = (props) => (
	<ul className={classes.NavigationItems}>
		<NavigationItem targetURL = {"/"} exact>Burger Builder</NavigationItem>
        {props.isAuthenticated
        	? <NavigationItem targetURL = {"/orders"}>Orders</NavigationItem>
        	: null}
        {props.isAuthenticated
        	? <NavigationItem targetURL = {"/logout"}>Logout</NavigationItem>
        	: <NavigationItem targetURL = {"/auth"}>Login</NavigationItem>
        }
	</ul>
)

export default navigationItems;