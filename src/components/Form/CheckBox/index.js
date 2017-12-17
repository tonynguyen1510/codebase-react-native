import React from 'react';
import PropTypes from 'prop-types';

import {
	View,
	Text,
	CheckBox,
	Body,
} from 'native-base';

const CheckBoxComponent = ({ label, ...props }) => {
	return (
		<View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center', justifyContent: 'flex-start' }} >
			<CheckBox
				{...props}
				style={{ marginLeft: -10, marginRight: 10 }}
			/>
			<Body>
				<Text style={{ marginLeft: 10, textAlign: 'left' }}>
					{label}
				</Text>
			</Body>
		</View>
	);
};

CheckBoxComponent.propTypes = {
	label: PropTypes.string,
	input: PropTypes.object,
	meta: PropTypes.object,
};

export default CheckBoxComponent;
