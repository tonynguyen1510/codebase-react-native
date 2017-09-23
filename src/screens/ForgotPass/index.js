import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, propTypes } from 'redux-form';
import {
	Container,
	Content,
	Button,
	View,
	Text,
	Body
} from 'native-base';

import Header from '../../components/Header';
import Input from '../../components/Input';

import styles from './styles';

const validate = values => {
	const error = {};
	error.email = '';
	error.password = '';
	let ema = values.email;
	let pw = values.password;
	if (values.email === undefined) {
		ema = '';
	}
	if (values.password === undefined) {
		pw = '';
	}
	if (ema.length < 8 && ema !== '') {
		error.email = 'too short';
	}
	if (!ema.includes('@') && ema !== '') {
		error.email = '@ not included';
	}
	if (pw.length > 12) {
		error.password = 'max 11 characters';
	}
	if (pw.length < 5 && pw.length > 0) {
		error.password = 'Weak';
	}
	return error;
};

class ForgotPass extends Component {
	static propTypes = {
		...propTypes,
		setUser: PropTypes.func,
		navigation: PropTypes.object
	}

	handlePress = (data) => {
		console.log('data', data);
	}

	render() {
		const { handleSubmit, pristine, submitting, navigation } = this.props;

		return (
			<Container style={styles.container}>
				<Header
					hasBack
					name="Quên mật khẩu"
					navigation={navigation}
				/>
				<Content style={{ padding: 20 }}>
					<View>
						<Field
							name="email"
							label="Email"
							icon="ios-mail-outline"
							component={Input}
						/>
						<Button
							block
							info
							style={styles.btn}
							onPress={handleSubmit(this.handlePress)}
						>
							<Text>Đặt lại mật khẩu</Text>
						</Button>
						<View style={{ marginTop: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
							<Text>Bạn đã có tài khoản?</Text>
							<Button
								style={{ marginRight: -16 }}
								transparent
								onPress={() => navigation.goBack()}
							>
								<Text>Đăng nhập</Text>
							</Button>
						</View>
					</View>

				</Content>
			</Container>
		);
	}
}

function mapStateToProps(state) {
	return {
		// requestStatus: state.requestStatus
	};
}

const mapDispatchToProps = {
	// setUser
};

export default reduxForm(
	{
		form: 'forgotPass',
		validate
	}
)(connect(mapStateToProps, mapDispatchToProps)(ForgotPass));
