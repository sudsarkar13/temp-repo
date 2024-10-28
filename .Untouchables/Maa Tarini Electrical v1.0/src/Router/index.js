import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import __HomePage__ from '../Components/index';
import HomePage from '../Components/HomePage';
import Background from '../Components/Background';
import Logo from '../Components/Logo';
import Navbar from '../Components/Navbar';
import DotSlider from '../Components/DotSlider';
const RouterDOM = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/"><__HomePage__ /></Route>
				<Route exact path="/homepage"><HomePage /></Route>
				<Route exact path="/background"><Background /></Route>
				<Route exact path="/logo"><Logo /></Route>
				<Route exact path="/navbar"><Navbar /></Route>
				<Route exact path="/dotslider"><DotSlider /></Route>
			</Switch>
		</Router>
	);
}
export default RouterDOM;