import React, { Component, PropTypes } from 'react';
import { Linking } from 'react-native';
import { connect } from 'react-redux';
import { Field, reduxForm, propTypes } from 'redux-form';
import {
	Container,
	Content,
	Button,
	View,
	Text
} from 'native-base';

import Header from '../../components/Header';
import Input from '../../components/Input';
import ButtonLoader from '../../components/ButtonLoader';
import CheckBox from '../../components/CheckBox';

import styles from './styles';

const validate = values => {
	const errors = {};
	const { email, password, fullName } = values;

	if (!email) {
		errors.email = 'Required';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email address';
	}

	if (!password) {
		errors.password = 'Required';
	} else if (password.length < 5) {
		errors.password = 'Too short';
	}

	if (!fullName) {
		errors.fullName = 'Required';
	} else if (fullName.length < 5) {
		errors.fullName = 'Too short';
	}

	return errors;
};

class SignUp extends Component {
	static propTypes = {
		...propTypes,
		setUser: PropTypes.func,
		navigation: PropTypes.object
	}

	state = {
		loading: false,
		hasError: false
	}

	handlePressSubmit = (data) => {
		console.log('data', data);
	}

	render() {
		const { handleSubmit, submitting, navigation } = this.props;

		return (
			<Container style={styles.container}>
				<Header
					hasBack
					name="Đăng ký"
					navigation={navigation}
				/>
				<Content style={{ padding: 20 }}>
					<View>
						<Field
							name="fullName"
							label="Họ và Tên"
							icon="ios-person-outline"
							component={Input}
						/>
						<Field
							name="email"
							label="Email"
							autoCapitalize="none"
							keyboardType="email-address"
							icon="ios-mail-outline"
							component={Input}
						/>
						<Field
							name="password"
							label="Mật khẩu"
							secureTextEntry
							icon="ios-unlock-outline"
							component={Input}
						/>
						<Text style={{ marginTop: 15 }}>
							Đăng ký đồng nghĩa với việc bạn chấp nhận
							{' '}
							<Text
								style={{ color: '#3F51B5' }}
								onPress={() => Linking.openURL('https://rencity.vn')}
							>
								Điều khoản và Điều kiện của RenCity.
							</Text>
						</Text>

						<ButtonLoader
							block
							info
							style={styles.btn}
							onPress={handleSubmit(this.handlePressSubmit)}
							loading={this.state.loading || submitting}
							text="Đăng nhập"
						/>

						<Field
							name="sendPR"
							label="Gửi cho tôi email thông báo về các tin tức mới của RenCity."
							component={CheckBox}
						/>

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
		form: 'signUp',
		validate,
		initialValues: {
			sendPR: true,
		}
	}
)(connect(mapStateToProps, mapDispatchToProps)(SignUp));
