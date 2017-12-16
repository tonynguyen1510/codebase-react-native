import React from 'react';
import { DrawerNavigator as drawerNavigator } from 'react-navigation';

import Home from 'src/screens/Home';
import Login from 'src/screens/Login';
import Profile from 'src/screens/Profile';
import BlankPage2 from 'src/screens/BlankPage2';

import DrawBar from 'src/components/DrawBar';

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
			activeTintColor: 'yellow',
		},
		contentComponent: props => <DrawBar {...props} />,
	},
);

export default DrawNav;
