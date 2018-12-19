import React,{Component} from 'react';
import axios from '../../../axios/axios-orders.js';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

import {
    purchaseBurger,
    purchaseBurgerStart,
    resetPurchaseStatus} from '../../../store/actions/index';
import * as purchaseStatus from '../../../store/reducers/constants';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

import Button  from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactDetails.module.css';
import Input from '../../../components/UI/Input/Input';
import {checkValidity} from '../../../shared/utility';

class ContactDetails extends Component{
    state = {
        orderForm:{
            name:this.configureInputs('input','text','Your Name','',{
                required:true
            }),
            street:this.configureInputs('input','text','Street','',{
                required:true
            }),
            zipCode:this.configureInputs('input','text','Zip Code','',{
                required:true,
                minLength:4,
                maxLength:8
            }),
            country:this.configureInputs('input','text','Country','',{
                required:true
            }),
            email:this.configureInputs('input','email','Email','',{
                required:true,
                isEmail:true
            }),
            phone:this.configureInputs('input','number','Phone','',{
                required:true
            }),
            paymentMode:this.configureSelectInputs([
                {value:'cod',displayValue:'Cash on Delivery'},
                {value:'debit_card',displayValue:'Debit Card'},
                {value:'upi',displayValue:'UPI'},
                {value:'credit_card',displayValue:'Credit Card'},
                {value:'net_banking',displayValue:'Net Banking'}
            ],'cod'),
            deliveryMethod:this.configureSelectInputs([
               {value:'normal',displayValue:'Normal'},
               {value:'premium',displayValue:'Premium'}          
            ],'normal')
        },
        formIsValid:false
    }

    configureInputs(elementType,inputType,placeholder,value,validationRules={}){
        return {
            elementType:elementType,
            elementConfig:{
                type:inputType,
                placeholder:placeholder
            },
            validation:{
                rules:validationRules,
                valid:false
            },
            value:value,
            touched:false
        }
    }

    configureSelectInputs(options,defaultValue=''){
        return {
            elementType:'select',
            elementConfig:{
                options:options
            },
            value:defaultValue,
            touched:false
        }
    }

    inputChangedHandler = (event,inputIdentifier) => {
        let updatedOrderForm = {
            ...this.state.orderForm
        } 

        let updatedInputConfig = {
            ...this.state.orderForm[inputIdentifier],
            value:event.target.value,
            touched:true
        }
        if(updatedInputConfig.validation){
            updatedInputConfig.validation.valid = checkValidity(
                updatedInputConfig.value, updatedInputConfig.validation.rules)
        }

        updatedOrderForm[inputIdentifier] = updatedInputConfig
        let formIsValid = true;
        for(let elementConfig of Object.values(updatedOrderForm)){
            let validation = elementConfig.validation;
            if(validation){
                formIsValid = validation.valid && formIsValid;
            }
        }

        this.setState({
            orderForm:updatedOrderForm,
            formIsValid
        });
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.props.purchaseBurgerStart();
        let orderDetails = {};
        for(let [formElement,elementConfig] of Object.entries(this.state.orderForm)){
            orderDetails[formElement] = elementConfig.value
        }
        let order = {
            userId:this.props.userId,
            ingredients:this.props.ingredients,
            price:this.props.totalPrice,
            orderDetails:orderDetails,
        }
        this.props.purchaseBurger(order);
    }

    render(){
        let formElementsArray = [];
        for(let[ename,config] of Object.entries(this.state.orderForm)){
            formElementsArray.push(
                {id:ename,config:config}
            );
        }

        let form = (
            <div className={classes.ContactDetails}>
                <h4>Enter you contact details</h4>
                <form>
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
                        clicked={this.orderHandler} 
                        disabled = {!this.state.formIsValid}>
                        ORDER
                    </Button>
                </form>
            </div>
        )

        if(this.props.placingOrderInProgress)
            form = <Spinner /> 
        else if(this.props.purchaseStatus === purchaseStatus.PURCHASE_STATUS_SUCCESS){
            this.props.resetPurchaseStatus();
            this.props.history.push('/');
        }
        return form;
    }
}

const mapStateToProps = (state)=>{
    return{
        ingredients:state.burgerBuilder.ingredients,
        totalPrice:state.burgerBuilder.totalPrice,
        placingOrderInProgress:state.order.placingOrderInProgress,
        purchaseStatus:state.order.purchaseStatus,
        userId:state.auth.userId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        purchaseBurger:(orderData) => {dispatch(purchaseBurger(orderData))},
        purchaseBurgerStart:()=>{dispatch(purchaseBurgerStart())},
        resetPurchaseStatus:()=>{dispatch(resetPurchaseStatus())}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(withRouter(ContactDetails),axios));