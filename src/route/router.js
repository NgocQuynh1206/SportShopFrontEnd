import React from "react";
import { Route, Switch } from "react-router-dom";
import HomeBody from '../layout/components/body/rightLayout/HomeComponent';
import AdminBody from '../layout/components/body/rightLayout/AdminComponent';
import ProducerBody from '../layout/components/body/rightLayout/ProducerComponent';
import ProductBody from '../layout/components/body/rightLayout/ProductComponent';
import UserBody from '../layout/components/body/rightLayout/UserComponent';

// Component
const NotFound = () => (
	<div>
		<h2>Not Found 404</h2>
	</div>
);


const RouterURL = () => (
	<Switch>
		<Route exact path="/" component={HomeBody} />
		<Route exact path="/product" component={ProductBody} />
		<Route exact path="/producer" component={ProducerBody} />
		<Route exact path="/user" component={UserBody} />
		<Route exact path="/admin" component={AdminBody} />
		<Route component={NotFound} />
	</Switch>
);

export default RouterURL;
