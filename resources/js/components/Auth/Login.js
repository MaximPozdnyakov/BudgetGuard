import React, { useState } from "react";

import { Link } from "react-router-dom";

import { Container, Form, Button } from "react-bootstrap";

import { connect } from "react-redux";
import userActions from "../../actions/users";
import MessagesAlert from "../Utils/MessagesAlert";

function Login(props) {
    const { login } = props;
    const [email, setEmail] = useState("");
    const onChangeEmail = e => setEmail(e.target.value);

    const [password, setPassword] = useState("");
    const onChangePassword = e => setPassword(e.target.value);

    const isValidForm = () => email !== "" && password !== "";

    function handleSubmit(e) {
        e.preventDefault();
        if (isValidForm()) {
            const isRedirect = login({
                email,
                password
            });
            if (isRedirect) {
                props.history.push("/");
            }
        }
    }
    return (
        <Container className="mt-3">
            <div className="bg-white mx-auto w-50 p-4 shadow-sm">
                <h2 className="text-center" style={{ fontWeight: 700 }}>
                    Login
                </h2>
                <div className="d-flex w-100 justify-content-center mb-3">
                    <h5>Don' have account?</h5>
                    <Link to="/register">
                        <h5 className="ml-2 text-success">Register!</h5>
                    </Link>
                </div>
                <Form
                    noValidate
                    onSubmit={handleSubmit}
                    className="w-75 mx-auto"
                >
                    <MessagesAlert />
                    <Form.Group controlId="email">
                        <Form.Label className="text-secondary">
                            Email address
                        </Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={onChangeEmail}
                        />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label className="text-secondary">
                            Password
                        </Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={onChangePassword}
                            value={password}
                        />
                    </Form.Group>
                    <Button
                        type="submit"
                        variant="primary"
                        block
                        disabled={!isValidForm()}
                    >
                        Login
                    </Button>
                </Form>
            </div>
        </Container>
    );
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { login: userActions.login })(Login);
