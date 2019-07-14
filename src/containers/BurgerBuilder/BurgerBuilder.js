import React, { Component, Fragment } from 'react';

import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3,
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: null,
    };

    updatePurchaseState() {

        this.setState((prevState, props) => {
            const ingredients = {
                ...prevState.ingredients,
            };
            const sum = Object.values(ingredients)
                .reduce((count, n) => count + n, 0);
            return {purchasable: sum > 0}
        })
    }

    addIngredientHandler = (type) => {
        const priceAddition = INGREDIENT_PRICES[type];
        this.setState((prevState, props) => {
            return {
                ingredients: {
                    ...prevState.ingredients,
                    [type]: prevState.ingredients[type]+1,
                },
                totalPrice: prevState.totalPrice + priceAddition,
            }
        });
        this.updatePurchaseState();
    };

    removeIngredientHandler = (type) => {
        if(this.state.ingredients[type] <= 0) {
            return;
        }
        const priceDeduction = INGREDIENT_PRICES[type];
        this.setState((prevState, props) => {
            return {
                ingredients: {
                    ...prevState.ingredients,
                    [type]: prevState.ingredients[type]-1,
                },
                totalPrice: prevState.totalPrice - priceDeduction,
            }
        });
        this.updatePurchaseState();
    };

    purchaseHandler = () => {
        this.setState({purchasing: true})
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    };

    purchaseContinueHandler = () => {
        // alert('You continue');

        const ingredients = Object.keys(this.state.ingredients);

        const searchParams = ingredients.map(ingKey => `${encodeURIComponent(ingKey)}=${encodeURIComponent(this.state.ingredients[ingKey])}`);

        searchParams.push('price=' + this.state.totalPrice);

        this.props.history.push({
            pathname: '/checkout',
            search: `?${searchParams.join('&')}`,
        })
    };

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(res => {
                this.setState({ingredients: res.data})
            })
            .catch(error => this.setState({error: error.message}))
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients,
        };

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.state.error ? <p>{`Ingrediens could not be loaded: ${this.state.error}`}</p> : <Spinner />;

        if(this.state.ingredients) {
            burger = (
                <Fragment>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        price={this.state.totalPrice}
                        ordered={this.purchaseHandler}
                    />
                </Fragment>
            );

            orderSummary = (
                <OrderSummary
                    ingredients={this.state.ingredients}
                    purchasePrice={this.state.totalPrice}
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                />
            );
        }

        if(this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    { orderSummary }
                </Modal>
                { burger }
            </Fragment>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);