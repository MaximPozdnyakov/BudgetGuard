import React from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { register } from "../../actions/users";

import MessagesAlert from "../Utils/MessagesAlert";
import FormField from "./FormField";

function RegisterForm({ register }) {
    const history = useHistory();

    const { values, errors, handleChange, handleSubmit } = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            passwordConfirm: ""
        },
        validate({ name, email, password, passwordConfirm }) {
            const errors = {};
            if (name !== "" && name.length < 3) {
                errors.name = "Name should be at least 3 characters";
            }
            const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (email !== "" && !emailRegex.test(email.toLowerCase())) {
                errors.email = "Email format is invalid";
            }
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
            if (password !== "" && !passwordRegex.test(password)) {
                errors.password = [
                    "Password must be a minimum of 8 characters",
                    "Must contain at least 1 number",
                    "Must contain at least one uppercase character",
                    "Must contain at least one lowercase character"
                ];
            }
            if (passwordConfirm !== "" && password !== passwordConfirm) {
                errors.passwordConfirm = "Passwords don't match";
            }
            return errors;
        },
        async onSubmit(values) {
            const { isSuccess } = await register({
                ...values,
                password_confirmation: values.passwordConfirm
            });
            if (isSuccess) history.push("/operations");
        }
    });

    const checkBtnDisabled = ({ errors, values }) =>
        Object.values(errors).length > 0 ||
        Object.values(values).some(str => str === "");

    const { name, email, password, passwordConfirm } = values;
    return (
        <Form noValidate onSubmit={handleSubmit}>
            <MessagesAlert />
            <FormField
                {...{
                    label: "Username",
                    placeholder: "Enter username",
                    name: "name",
                    value: name,
                    handleChange,
                    error: errors.name
                }}
            />
            <FormField
                {...{
                    label: "Email",
                    placeholder: "Enter email",
                    name: "email",
                    type: "email",
                    value: email,
                    handleChange,
                    error: errors.email
                }}
            />
            <FormField
                {...{
                    label: "Password",
                    placeholder: "Enter password",
                    name: "password",
                    type: "password",
                    value: password,
                    handleChange,
                    error: errors.password
                }}
            />
            <FormField
                {...{
                    label: "Confirm password",
                    placeholder: "Confirm password",
                    name: "passwordConfirm",
                    type: "password",
                    value: passwordConfirm,
                    handleChange,
                    error: errors.passwordConfirm
                }}
            />
            <Button
                type="submit"
                variant="primary"
                block
                disabled={checkBtnDisabled({ errors, values })}
            >
                Register
            </Button>
        </Form>
    );
}

RegisterForm.propTypes = {
    register: PropTypes.func.isRequired
};

export default connect(null, { register })(RegisterForm);
