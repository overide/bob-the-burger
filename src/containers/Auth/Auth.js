import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {checkValidity,configureInputs} from '../../shared/utility';

import * as actions from '../../store/actions/index';

import Input from '../../components/UI/Input/Input';
import Button  from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './Auth.module.css';

class Auth extends Component {
	state = {
		controls:{
            email:configureInputs('input','email','Email Address','',{
                required:true,
                isEmail:true
            }),
            password:configureInputs('input','password','Password','',{
                required:true,
                minLength:6
            })
        },
        formIsValid:false,
        isSignIn:true
	}

    inputChangedHandler = (event,inputIdentifier) => {
        let updatedLoginForm = {
            ...this.state.controls
        }

        let updatedInputConfig = {
            ...this.state.controls[inputIdentifier],
            value:event.target.value,
            touched:true
        }
        if(updatedInputConfig.validation){
            updatedInputConfig.validation.valid = checkValidity(
                updatedInputConfig.value, updatedInputConfig.validation.rules)
        }

        updatedLoginForm[inputIdentifier] = updatedInputConfig
        let formIsValid = true;
        for(let elementConfig of Object.values(updatedLoginForm)){
            let validation = elementConfig.validation;
            if(validation){
                formIsValid = validation.valid && formIsValid;
            }
        }
        this.setState({
            controls:updatedLoginForm,
            formIsValid
        });
    }

    submitHandler = (event) => {
    	event.preventDefault();
    	let formMode = this.state.isSignIn?'signin':'signup';
    	this.props.onAuth(
    		this.state.controls.email.value,
    		this.state.controls.password.value,
    		formMode
    	);
    }

    toggleFormMode = (event) => {
    	this.setState({
    		isSignIn:!this.state.isSignIn
    	});
    }


    render(){
    	let formElementsArray = [];
        for(let[ename,config] of Object.entries(this.state.controls)){
            formElementsArray.push(
                {id:ename,config:config}
            );
        }

        let form = (
            <div className = {classes.Auth}>
                <h4>Enter you contact details</h4>
                <form onSubmit = {this.submitHandler}>
                    {formElementsArray.map(formElement=>(
                        <Input 
                            changed = {event => this.inputChangedHandler(event,formElement.id)}
                            key = {formElement.id}
                            value = {formElement.config.value}
                            elementType = {formElement.config.elementType}
                            elementConfig = {formElement.config.elementConfig}
                            invalid = {formElement.config.validation && !formElement.config.validation.valid}
                            shouldValidate = {formElement.config.validation !== undefined}
                            touched = {formElement.config.touched}/>
                    ))}
                    <Button 
                        btnType="Success"  
                        disabled = {!this.state.formIsValid}>
                        Submit
                    </Button>
                </form>
                <Button 
                    btnType="Danger"
                    clicked={this.toggleFormMode}>
                    {this.state.isSignIn?"Switch to Sign Up":"Switch to Sign In"}
                </Button>
            </div>
        )

        if(this.props.authInProgress)
            form = <Spinner />
        else if(this.props.isAuthenticated)
            form = <Redirect to="/" />
       
    	return form
    }
}

const mapStateToProps = (state) => {
    return {
        authInProgress: state.auth.authInProgress,
        authError: state.auth.authError,
        isAuthenticated: state.auth.token !== null
    }
};
const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (email, password, mode) => dispatch(actions.auth(email,password,mode))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);