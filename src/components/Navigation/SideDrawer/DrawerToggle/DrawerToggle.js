import React from 'react';
import classes from './DrawerToggle.module.css';

const drawerToggle = (props) => {
	return(
		<div className={classes.DrawerToggle} onClick={props.drawerToggler}>
			<div className = {classes.bar1}></div>
			<div className = {classes.bar2}></div>
			<div className = {classes.bar3}></div>
		</div>
	);
}

export default drawerToggle;