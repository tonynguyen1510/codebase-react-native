import React from 'react';
import Expo from 'expo';
import setup from './src/setup';

const App = setup();

export default class App1 extends React.Component {
	state = {
		isReady: false
	}

	async componentWillMount() {
		await Expo.Font.loadAsync({
			'Roboto': require('native-base/Fonts/Roboto.ttf'),
			'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
			'Ionicons': require('native-base/Fonts/Ionicons.ttf'),
			// 'FontAwesome': require('native-base/Fonts/FontAwesome.ttf'),
		});

		this.setState({
			isReady: true
		});
	}

	render() {
		return this.state.isReady ? <App /> : null;
	}
}
