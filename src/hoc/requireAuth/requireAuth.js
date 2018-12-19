import React, {Component} from 'react'
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';

const requireAuth = (WrappedComponent) => {

	class RequireAuth extends Component{
		render(){
			let composedComponent = <WrappedComponent {...this.props}/>
			if(!this.props.isAuthenticated)
				composedComponent = <Redirect to="/" />
			return composedComponent;
		}
	}

	const mapStateToProps = (state) => {
		return {
			isAuthenticated: state.auth.token !== null 
		}
	}
	return withRouter(connect(mapStateToProps)(RequireAuth));
}

export default requireAuth;