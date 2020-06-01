import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import TextRenderField from '../TextFieldValidation';
import PasswordRenderField from '../PasswordFieldValidation';

const required = value => value ? undefined : 'Required';

const SignInPageValidationForm = (props) => {
    const { handleSubmit, submitting } = props;
    return (
        <form onSubmit={handleSubmit}>
            {props.error ?
                <div style={{
                    textAlign: 'center',
                    color: '#ff7415',
                    fontSize: 16,
                    marginTop: 20,
                    marginBottom: 20,
                }}>
                    {props.error}
                </div>
                : null}
            <Field name="login" type="text"
                component={TextRenderField} label="Login"
                validate={[required]}
            />
            <Field name="password" type="password"
                component={PasswordRenderField} label="Password"
                validate={[required]}
            />
            <Button
                fullWidth
                type="submit"
                color="primary"
                variant="contained"
                disabled={submitting}
                style={{ marginTop: 15 }}
            >
                Go
            </Button>
        </form>
    );
};

export default reduxForm({
    form: 'login'
})(SignInPageValidationForm);