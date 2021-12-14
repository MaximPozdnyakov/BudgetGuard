import React from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import PropTypes from "prop-types";

import { login } from "../../actions/users";

import MessagesAlert from "../Utils/MessagesAlert";

function LoginForm({ login }) {
    const history = useHistory();
    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: { email: "", password: "" },
        async onSubmit(values) {
            const { isSuccess } = await login(values);
            if (isSuccess) history.push("/operations");
        }
    });

    const checkBtnDisabled = ({ email, password }) => !email || !password;

    const { email, password } = values;
    return (
        <Form noValidate onSubmit={handleSubmit}>
            <MessagesAlert />

            <Form.Group controlId="email">
                <Form.Label className="text-secondary">
                    Email address
                </Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="password">
                <Form.Label className="text-secondary">Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleChange}
                />
            </Form.Group>

            <Button
                type="submit"
                variant="primary"
                block
                disabled={checkBtnDisabled(values)}
            >
                Login
            </Button>
        </Form>
    );
}

LoginForm.propTypes = {
    login: PropTypes.func.isRequired
};

export default connect(null, { login })(LoginForm);
