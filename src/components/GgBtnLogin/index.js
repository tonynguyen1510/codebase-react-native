/*--------------------------------------------------------
 * Author Trần Đức Tiến
 * Email ductienas@gmail.com
 * Phone 0972970075
 * Created: 2017-07-30 10:55:40
 *
 * LastModified: 2017-07-30 10:55:40
 *-------------------------------------------------------*/

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
	Button,
	Text,
	Icon,
} from 'native-base';
import { GoogleSignin } from 'react-native-google-signin';

import AuthStorage from '../../utils/AuthStorage';

import { loginSocial } from '../../actions/auth';

class GgBtnLogin extends Component {
	static propTypes = {
		navigation: PropTypes.object.isRequired,
		loginSocial: PropTypes.func.isRequired,
	}

	componentWillMount() {
		GoogleSignin.hasPlayServices({ autoResolve: true });
		GoogleSignin.configure({
			iosClientId: '39442057474-5927o8r7v9be34f2nfc1k3h83glg1dhk.apps.googleusercontent.com',
			webClientId: '39442057474-tu4kok8rcmo808tnipduhof5haj0h0da.apps.googleusercontent.com',
			offlineAccess: true
		});
	}

	handleLogin = () => {
		GoogleSignin.signIn().then((result) => {
			const user = {
				avatar: result.photo,
				fullName: result.name,
				ggVerified: { id: result.id },
				loginType: 'google',
				email: result.email,

			};

			this.props.loginSocial(user, () => {
				if (AuthStorage.loggedIn) {
					this.props.navigation.navigate('Home');
				}
			});
		}).catch((err) => {
			console.log('WRONG SIGNIN', err);
		}).done();
	}

	render() {
		return (
			<Button
				iconLeft
				danger
				block
				onPress={this.handleLogin}
			>
				<Icon name="logo-googleplus" style={{ fontSize: 24, color: '#fff', marginRight: 10 }} />
				<Text>Google+</Text>
			</Button>
		);
	}
}

function mapStateToProps(state) {
	return {
		// auth: state.auth
	};
}

const mapDispatchToProps = {
	loginSocial
};

export default connect(mapStateToProps, mapDispatchToProps)(GgBtnLogin);
