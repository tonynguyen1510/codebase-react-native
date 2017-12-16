import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
	Container,
	Content,
	Text,
} from 'native-base';

import Header from 'src/components/Header';

class Profile extends Component {

	static propTypes = {
		navigation: PropTypes.object,
	};

	render() {

		return (
			<Container>
				<Header
					name="Thông tin tài khoản"
					navigation={this.props.navigation}
				/>

				<Content padder>
					<Text>
						profile
         			</Text>
				</Content>
			</Container>
		);
	}
}

export default Profile;
