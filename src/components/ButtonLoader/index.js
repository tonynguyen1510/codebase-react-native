import React, { Component, PropTypes } from 'react';

import {
	Button,
	Text,
	Icon,
	Spinner
} from 'native-base';

const ButtonLoader = ({ icon, loading, text, onPress, ...restOfProps }) => {
	return (
		<Button
			{...restOfProps}
			onPress={!loading ? onPress : f => f}
		>
			{
				loading ? <Spinner color="#fff" size="small" /> : [
					icon && <Icon key="1" name={icon} style={{ fontSize: 24, color: '#fff', marginRight: 10 }} />,
					<Text key="2">{text}</Text>
				]
			}
		</Button>
	);
}

ButtonLoader.propTypes = {
	loading: PropTypes.bool.isRequired,
	text: PropTypes.string.isRequired,
	onPress: PropTypes.func.isRequired,
	icon: PropTypes.string
};

export default ButtonLoader;
