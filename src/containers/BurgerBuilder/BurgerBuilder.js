import React, {Component} from 'react';
import { connect } from 'react-redux';

import {addIngredient,removeIngredient,initIngredient} from '../../store/actions/index';
import Aux from '../../hoc/Aux/Aux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios/axios-orders.js';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

class BurgerBuilder extends Component {
    state = {
        purchasing:false
    }

    componentDidMount(){
        this.props.initIngredient();
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: !this.state.purchasing
        });
    }

    purchaseContinueHandler = () => {
        this.props.history.push({
            pathname:'/checkout'
        });
    }

    render(){
        let disabledInfo = {...this.props.ingredients}
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] < 1
        }
        let orderSummary = null;
        let burgerAndControls = <Spinner />
        if(this.props.ingredientFetchFailError){
            burgerAndControls = <p>Ingredients cannot be loaded!</p>
        }
        if(this.props.ingredients){
            burgerAndControls = (
                <Aux>
                    <Burger ingredients = {this.props.ingredients}/>
                    <BuildControls 
                        addIngredient={this.props.addIngredient}
                        removeIngredient={this.props.removeIngredient}
                        disabledInfo={disabledInfo}
                        totalPrice = {this.props.totalPrice}
                        purchasable = {this.props.purchasable}
                        purchaseHandler = {this.purchaseHandler}
                        isAuthenticated = {this.props.isAuthenticated}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary 
                ingredients={this.props.ingredients}
                purchaseHandler = {this.purchaseHandler}
                purchaseContinueHandler = {this.purchaseContinueHandler}
                totalPrice = {this.props.totalPrice}/>
        }
        
        return(
            <Aux>
                <Modal 
                    show={this.state.purchasing} 
                    modalClose = {this.purchaseHandler}>
                    {orderSummary}
                </Modal>
                {burgerAndControls}
            </Aux>
        );
    }
}

const mapStateToProps = (state)=>{
    return{
        ingredients:state.burgerBuilder.ingredients,
        totalPrice:state.burgerBuilder.totalPrice,
        purchasable:state.burgerBuilder.purchasable,
        ingredientFetchFailError:state.burgerBuilder.ingredientFetchFailError,
        isAuthenticated:state.auth.token !== null
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        addIngredient:(ingType)=>dispatch(addIngredient(ingType)),
        removeIngredient:(ingType)=>dispatch(removeIngredient(ingType)),
        initIngredient:()=>dispatch(initIngredient())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));