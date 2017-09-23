import React from 'react';
import { DrawerNavigator as drawerNavigator } from 'react-navigation';

import Home from '../screens/Home';
import Login from '../screens/Login';
import Profile from '../screens/Profile';
import BlankPage2 from '../screens/BlankPage2';

import DrawBar from '../components/DrawBar';

const DrawNav = drawerNavigator(
	{
		Home: { screen: Home },
		Login: { screen: Login },
		Profile: { screen: Profile },
		BlankPage2: { screen: BlankPage2 }
	},
	{
		initialRouteName: 'Login',
		contentOptions: {
			activeTintColor: 'yellow'
		},
		contentComponent: props => <DrawBar {...props} />
	}
);

export default DrawNav;
