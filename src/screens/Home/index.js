import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image, ImageBackground } from 'react-native';

import {
	Container,
	Content,
	Icon,
	Button,
	Text,
} from 'native-base';
// import { Grid, Row } from 'react-native-easy-grid';

import Header from 'src/components/Header';

import styles from './styles';

const launchscreenBg = require('src/assets/images/home.jpg');
const logo = require('src/assets/images/rencity-logo.png');

function mapStateToProps(/* state */) {
	return {
		// requestStatus: state.requestStatus
	};
}

const mapDispatchToProps = {
	// setUser
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Home extends Component {
	static propTypes = {
		navigation: PropTypes.object.isRequired,
	};

	handleSearch = () => {
		this.props.navigation.navigate('Search');
	}

	render() {
		return (
			<Container style={styles.container}>
				<Header
					name="RenCity"
					navigation={this.props.navigation}
				/>

				<ImageBackground source={launchscreenBg} style={styles.imageContainer} >
					<Image square style={{ width: 120, height: 120, alignSelf: 'center', marginTop: '10%' }} source={logo} />
					<Content style={{ paddingRight: 20, paddingLeft: 20, marginTop: 20 }}>
						<Button
							bordered
							block
							style={{ borderColor: '#fbca08', justifyContent: 'space-between', borderRadius: 0 }}
							onPress={this.handleSearch}
						>
							<Text style={{ color: '#fbca08', fontStyle: 'italic' }}>Nhập địa chỉ...</Text>
							<Icon active name="search" style={{ color: '#fbca08' }} />
						</Button>
					</Content>
				</ImageBackground>
			</Container>
		);
	}
}
