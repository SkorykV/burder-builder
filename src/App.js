import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

function App() {
    return (
        <BrowserRouter>
            <div>
                <Layout>
                    <Switch>
                        <Route path='/' exact component={BurgerBuilder}/>
                        <Route path='/orders' component={Orders} />
                        <Route path='/checkout' component={Checkout}/>
                        <Redirect to='/' />
                    </Switch>
                </Layout>
            </div>
        </BrowserRouter>
    );
}

export default App;
