import React, {Component} from 'react';
import {connect} from 'react-redux';

import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toobar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
	
	state = {
		showSideDrawer:false
	}

	toggleSideDrawer = ()=>{
		this.setState({
			showSideDrawer: !this.state.showSideDrawer
		});
	}

	render(){
		return(
			<Aux>
		        <Toobar 
		        	toogleSideDrawer = {this.toggleSideDrawer}
		        	isAuthenticated = {this.props.isAuthenticated}
		        />
		        <SideDrawer 
		        	isDrawerOpen = {this.state.showSideDrawer} 
		        	toggleSideDrawer = {this.toggleSideDrawer}
		        	isAuthenticated = {this.props.isAuthenticated}
		        /> 
		        <main className = {classes.content}>
		            {this.props.children}
		        </main>
		    </Aux>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated:state.auth.token !== null
	}
}
    
export default connect(mapStateToProps)(Layout)