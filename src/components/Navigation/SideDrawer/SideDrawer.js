import React from 'react';
import Logo from '../../UI/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux'; 
import classes from './SideDrawer.module.css';

const sideDrawer = (props) => {
	let attachedClasses = [classes.SideDrawer, classes.SideDrawerClose];
	if(props.isDrawerOpen)
		attachedClasses = [classes.SideDrawer, classes.SideDrawerOpen];

	return(
		<Aux>
			<Backdrop 
				show = {props.isDrawerOpen} 
				close = {props.toggleSideDrawer}
			/>
			<div className={attachedClasses.join(' ')} onClick={props.toggleSideDrawer}>
				<div className={classes.Logo}>
					<Logo />
				</div>
				<nav>
					<NavigationItems isAuthenticated = {props.isAuthenticated}/>
				</nav>
			</div>
		</Aux>
	);
}

export default sideDrawer;