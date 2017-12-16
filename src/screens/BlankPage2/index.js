import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
	Container,
	Content,
	Text,
} from 'native-base';

import Header from '../../components/Header';

class BlankPage2 extends Component {

	static propTypes = {
		navigation: PropTypes.object
	};

	render() {

		return (
			<Container>
				<Header
					name="Blank"
					navigation={this.props.navigation}
				/>

				<Content padder>
					<Text>
						Create Something Awesome . . .
         			</Text>
				</Content>
			</Container>
		);
	}
}

export default BlankPage2;
