import React from 'react';
import {  BrowserRouter, Route, Switch } from 'react-router-dom';

import Index from './pages/Index';
import Detalhe from './pages/Detalhe';


export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Index}></Route>
                <Route path="/detalhe" exact component={Detalhe}></Route>
            </Switch>
        </BrowserRouter>
    )



}