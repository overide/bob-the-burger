import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Route,Switch,withRouter} from 'react-router-dom';

import * as actions from './store/actions/index';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import RequireAuth from './hoc/requireAuth/requireAuth';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

// Lazy loading components
const asyncCheckout = asyncComponent(()=>{
    return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(()=>{
    return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(()=>{
    return import('./containers/Auth/Auth');
});

class App extends Component {

    componentDidMount(){
        this.props.authCheckState();
    }
    render() {
        return (
            <div>
                <Layout>
                    <Switch>
                        <Route path="/checkout"  component={RequireAuth(asyncCheckout)} />
                        <Route path="/orders" component={RequireAuth(asyncOrders)} />
                        <Route path="/auth" exact component={asyncAuth} />
                        <Route path="/logout" exact component={RequireAuth(Logout)} />
                        <Route path="/" exact component={BurgerBuilder} />
                    </Switch>
                </Layout>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        authCheckState: () => dispatch(actions.authCheckState())
    }
}

export default withRouter(connect(null,mapDispatchToProps)(App));
