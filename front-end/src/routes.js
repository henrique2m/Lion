import React from "react";

import {BrowserRouter, Switch, Route } from "react-router-dom";

import Main from "./pages/main";
import Slide from "./pages/slide";
import ColorKey from "./pages/colorKey";

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/slide" component={Slide} />
            <Route path="/colorkey" component={ColorKey} />
        </Switch>
    </BrowserRouter>
);

export default Routes;