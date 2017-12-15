// import React, { Component } from 'react';
import { StackNavigator as stackNavigator } from 'react-navigation';
// import { Header, Left, Button, Icon, Body, Title, Right } from 'native-base';

import DrawerRouter from './DrawerRouter';

import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import ForgotPass from '../screens/ForgotPass';
import Search from '../screens/Search';
import Home from '../screens/Home';
import BlankPage from '../screens/BlankPage';
import Profile from '../screens/Profile';

const StackNav = stackNavigator(
	{
		Drawer: { screen: DrawerRouter },

		Login: { screen: Login },
		SignUp: { screen: SignUp },
		ForgotPass: { screen: ForgotPass },
		Search: { screen: Search },
		Home: { screen: Home },
		Profile: { screen: Profile },
		BlankPage: { screen: BlankPage }
	},
	{
		initialRouteName: 'Drawer',
		headerMode: 'none',
	}
);

export default StackNav;
