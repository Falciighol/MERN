import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/all';
import "./App.css";

import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
	return (
		<Router>
			<div className="main">
				<div className="container">
					<Route path="/" exact component={Login}/>
					<Route path="/login" component={Login}/>
					<Route path="/dashboard" component={Dashboard}/>
				</div>
			</div>
		</Router>
	);
}

export default App;
