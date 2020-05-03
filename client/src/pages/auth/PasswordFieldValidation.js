import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

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

const PasswordRenderField = ({ input, label, type, meta: { touched, error, warning } }) => {
    const [values, setValues] = React.useState({ showPassword: false });

    const handleClickShowPassword = () => setValues({ ...values, showPassword: !values.showPassword });
    const handleMouseDownPassword = event => event.preventDefault();

    return (
        <>
            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                type={values.showPassword ? 'text' : type}
                label={label}
                {...input}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                edge="end"
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            {touched && ((error &&
                <span style={styleError}>{error}</span>
            ) || (warning &&
                <span style={styleWarning}>{warning}</span>
                ))}
        </>
    );
};

export default PasswordRenderField;