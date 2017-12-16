import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
	Container,
	Header,
	Title,
	Content,
	Text,
	Button,
	Icon,
	Left,
	Right,
	Body,
} from 'native-base';

import styles from './styles';

function bindAction(dispatch) {
	return {
		openDrawer: () => dispatch(openDrawer()),
	};
}

const mapStateToProps = state => ({
	name: state.user.name,
	index: state.list.selectedIndex,
	list: state.list.list,
});

@connect(mapStateToProps, bindAction)
export default class BlankPage extends Component {
	static navigationOptions = {
		header: null,
	};

	static propTypes = {
		name: PropTypes.string,
		navigation: PropTypes.object.isRequire,
		// openDrawer: PropTypes.func,
	};

	render() {
		const { props: { name } } = this;

		return (
			<Container style={styles.container}>
				<Header>
					<Left>
						<Button transparent onPress={() => this.props.navigation.goBack()}>
							<Icon name="ios-arrow-back" />
						</Button>
					</Left>

					<Body>
						<Title>{name ? this.props.name : "Blank Page"}</Title>
					</Body>

					<Right />
				</Header>

				<Content padder>
					<Text>
						{
							this.props.navigation.state.params.name.item !== undefined
								? this.props.navigation.state.params.name.item
								: 'Create Something Awesome . . .'
						}
					</Text>
				</Content>
			</Container>
		);
	}
}
