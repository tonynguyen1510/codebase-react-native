import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FloatingLabel from './FloatingLabel';

class InputComponent extends Component {
	static propTypes = {
		input: PropTypes.object,
		meta: PropTypes.object,
	}
	static defaultProps = {
		returnKeyType: 'next'
	}

	render() {
		const { input, meta: { touched, error, warning }, ...props } = this.props;

		return (
			<FloatingLabel
				{...input}
				{...props}
				error={touched && error}
				success={!error}
			/>
		);
	}
};

export default InputComponent;
