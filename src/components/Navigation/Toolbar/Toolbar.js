import React from "react";
import classes from './Toolbar.module.css';
import Logo from '../../UI/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props)=>(
	<header className={classes.Toolbar}>
		<div className = {classes.mobileOnly}>
			<DrawerToggle drawerToggler = {props.toogleSideDrawer}/>
		</div>
		<div className = {classes.Logo}>  
			<Logo />
		</div>
		<nav className = {classes.desktopOnly}>
			<NavigationItems isAuthenticated = {props.isAuthenticated}/>
		</nav>
	</header>
)

export default toolbar; 