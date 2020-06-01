import React from 'react';
import TextField from '@material-ui/core/TextField';

const styleError = {
    color: '#ff3a44',
    fontWeight: 500,
    marginLeft: 7,
    fontSize: 12
};
const styleWarning = {
    color: '#ff7415',
    fontWeight: 500,
    marginLeft: 7,
    fontSize: 12
};

const RenderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <>
        <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            type={type}
            label={label}
            {...input}
        />
        {touched && ((error &&
            <span style={styleError}>{error}</span>
        ) || (warning &&
            <span style={styleWarning}>{warning}</span>
            ))}
    </>
);

export default RenderField;