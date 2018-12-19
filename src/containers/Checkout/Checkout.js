import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactDetails from './ContactDetails/ContactDetails';

class Checkout extends Component{

    checkoutCanclledHandler = ()=>{
        this.props.history.goBack();
    }

    checkoutContinuedHandler = ()=>{
        this.props.history.replace(
            this.props.match.path
            + "/contact-details"
        );
    }

    render(){
        let summary = <Redirect to='/' />
        if(this.props.ingredients)
            summary = (
                <div>
                    <CheckoutSummary 
                    checkoutCancelled = {this.checkoutCanclledHandler}
                    checkoutContinued = {this.checkoutContinuedHandler}
                    ingredients={this.props.ingredients} />
                    <Route 
                        path={this.props.match.path+"/contact-details"}
                        render = {() => <ContactDetails/>}
                    />
                </div>
            )
        return summary
    }
} 

const mapStateToProps = (state)=>{
    return{
        ingredients:state.burgerBuilder.ingredients,
        totalPrice:state.burgerBuilder.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout);    