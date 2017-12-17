import React from 'react';
import PropTypes from 'prop-types';

import CheckBox from './';

const CheckBoxReduxForm = ({ input, meta: { touched, error, warning }, ...props }) => {
	return (
		<CheckBox
			{...props}
			{...input}
			checked={!!input.value}
			onPress={() => input.onChange(!input.value)}
			error={touched && error}
		/>
	);
};

CheckBoxReduxForm.propTypes = {
	label: PropTypes.string,
	input: PropTypes.object,
	meta: PropTypes.object,
};

export default CheckBoxReduxForm;
