// import React, { Component } from 'react';
import { StackNavigator as stackNavigator } from 'react-navigation';
// import { Header, Left, Button, Icon, Body, Title, Right } from 'native-base';

import Login from 'src/screens/Login';
import SignUp from 'src/screens/SignUp';
import ForgotPass from 'src/screens/ForgotPass';
import Search from 'src/screens/Search';
import Home from 'src/screens/Home';
import BlankPage from 'src/screens/BlankPage';
import Profile from 'src/screens/Profile';

import DrawerRouter from './DrawerRouter';

const StackNav = stackNavigator(
	{
		Drawer: { screen: DrawerRouter },

		Login: { screen: Login },
		SignUp: { screen: SignUp },
		ForgotPass: { screen: ForgotPass },
		Search: { screen: Search },
		Home: { screen: Home },
		Profile: { screen: Profile },
		BlankPage: { screen: BlankPage },
	},
	{
		initialRouteName: 'Drawer',
		headerMode: 'none',
	}
);

export default StackNav;
