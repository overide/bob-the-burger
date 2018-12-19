import React,{Component} from "react";
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';

import * as actionCreators from "../../store/actions/index"; 
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import Order from '../../components/Order/Order';
import axios from '../../axios/axios-orders';

class Orders extends Component{

    componentDidMount(){
        this.props.fetchOrders();
    }

    render(){
        let orderList = (
            <div>
                {this.props.orders.map((order)=>{
                    return(<Order
                            key={order.orderId}
                            ingredients={order.ingredients}
                            price={order.price}
                        />
                    )})
                }
            </div>
        );

        if(!this.props.isAuthenticated){
            orderList = <Redirect to="/" />
        }
        
        return orderList
    }
}

const mapStateToProps = (state) => {
    return {
        orders:state.order.orders,
        fetchingOrdersFailed:state.order.fetchingOrdersFailed,
        fetchingOrdersInProgress:state.order.fetchingOrdersInProgress,
        isAuthenticated:state.auth.token !== null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrders:() => {dispatch(actionCreators.fetchOrders())}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));