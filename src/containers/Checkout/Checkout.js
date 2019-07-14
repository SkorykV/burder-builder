import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    constructor(props) {
        super(props);

        const ingredients = {};
        const searchParams = new URLSearchParams(props.location.search);

        let price = 0;

        delete searchParams.price;

        for(let param of searchParams.entries()) {
            if(param[0] === 'price') {
                price = param[1]
            }
            else {
                ingredients[param[0]] = +param[1];
            }

        }

        this.state = {ingredients, price};
    }

    checkoutCancelledHandle = () => {
        this.props.history.goBack();
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandle}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route path={this.props.match.path + '/contact-data'}
                    render={(props) =>
                        <ContactData
                            ingredients={this.state.ingredients}
                            price={this.state.price}
                            {...props}
                        />}/>
            </div>
        )
    }
}

export default Checkout;