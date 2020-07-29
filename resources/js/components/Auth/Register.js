import React, { useState } from "react";

import { Link } from "react-router-dom";

import { Container, Form, Button, Row, Col } from "react-bootstrap";

import { connect } from "react-redux";
import userActions from "../../actions/users";
import MessagesAlert from "../Utils/MessagesAlert";

function Register(props) {
    const { register, notLoaded } = props;

    const [name, setName] = useState("");
    const isValidName = () => name.length >= 3;
    const isInvalidName = () => name.length < 3 && name.length > 0;
    const onChangeName = e => setName(e.target.value);

    const [email, setEmail] = useState("");
    const isValidEmail = () =>
        email !== "" &&
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email.toLowerCase()
        );
    const isInvalidEmail = () =>
        email !== "" &&
        !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email.toLowerCase()
        );
    const onChangeEmail = e => setEmail(e.target.value);

    const [password, setPassword] = useState("");
    const isValidPassword = () =>
        password !== "" &&
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(password);
    const isInvalidPassword = () =>
        password !== "" &&
        !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(password);
    const onChangePassword = e => setPassword(e.target.value);

    const [passwordConfirm, setPasswordConfirm] = useState("");
    const isValidPasswordConfirm = () =>
        passwordConfirm !== "" && passwordConfirm === password;
    const isInvalidPasswordConfirm = () =>
        passwordConfirm !== "" && passwordConfirm !== password;
    const onChangePasswordConfirm = e => setPasswordConfirm(e.target.value);

    const isValidForm = () =>
        isValidName() &&
        isValidEmail() &&
        isValidPassword() &&
        isValidPasswordConfirm();

    async function handleSubmit(e) {
        e.preventDefault();
        if (isValidForm()) {
            const isRedirect = await register({
                name,
                email,
                password,
                password_confirmation: passwordConfirm
            });
            if (isRedirect) {
                props.history.push("/login");
            }
        }
    }

    const loginWithGoogle = e => {
        e.preventDefault();
        notLoaded();
        props.history.push("api/redirect/google");
        props.history.go();
    };
    return (
        <Row>
            <Col
                xl="6"
                lg="7"
                md="10"
                sm="12"
                className="bg-white mx-auto p-4 shadow-sm"
            >
                <h2 className="text-center" style={{ fontWeight: 700 }}>
                    Register
                </h2>
                <div className="d-flex w-100 justify-content-center mb-3">
                    <h5>Already registered?</h5>
                    <Link to="/login">
                        <h5 className="ml-2 text-success">Login!</h5>
                    </Link>
                </div>
                <Row>
                    <Col xs="11" md="11" className="mx-auto">
                        <Form noValidate onSubmit={handleSubmit}>
                            <MessagesAlert />
                            <Form.Group controlId="username">
                                <Form.Label className="text-secondary">
                                    Username
                                </Form.Label>
                                <Form.Control
                                    placeholder="Enter username"
                                    onChange={onChangeName}
                                    value={name}
                                    isInvalid={isInvalidName()}
                                    isValid={isValidName()}
                                />
                                <Form.Control.Feedback>
                                    Success!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Name should be at least 3 characters
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label className="text-secondary">
                                    Email address
                                </Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={onChangeEmail}
                                    isInvalid={isInvalidEmail()}
                                    isValid={isValidEmail()}
                                />
                                <Form.Control.Feedback>
                                    Success!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Email format is invalid
                                </Form.Control.Feedback>
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
                                    isInvalid={isInvalidPassword()}
                                    isValid={isValidPassword()}
                                />
                                <Form.Control.Feedback>
                                    Success!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    <ul className="pl-0 ml-3">
                                        <li>
                                            Password must be a minimum of 8
                                            characters
                                        </li>
                                        <li>Must contain at least 1 number</li>
                                        <li>
                                            Must contain at least one uppercase
                                            character
                                        </li>
                                        <li>
                                            Must contain at least one lowercase
                                            character
                                        </li>
                                    </ul>
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="passwordConfirm">
                                <Form.Label className="text-secondary">
                                    Confirm password
                                </Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm password"
                                    value={passwordConfirm}
                                    onChange={onChangePasswordConfirm}
                                    isInvalid={isInvalidPasswordConfirm()}
                                    isValid={isValidPasswordConfirm()}
                                />
                                <Form.Control.Feedback>
                                    Success!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Passwords don't match
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button
                                type="submit"
                                variant="primary"
                                block
                                disabled={!isValidForm()}
                            >
                                Register
                            </Button>
                        </Form>
                    </Col>
                </Row>
                <div className="text-center my-2">Or</div>
                <Row>
                    <Col xs="11" md="11" className="mx-auto">
                        <div
                            className="d-flex justify-content-center"
                            style={{ whitSpace: "nowrap" }}
                        >
                            <Button
                                variant="light"
                                block
                                className="d-flex position-relative justify-content-center"
                                onClick={loginWithGoogle}
                            >
                                <img
                                    width="20"
                                    height="20"
                                    src="https://image.flaticon.com/icons/svg/281/281764.svg"
                                    alt=""
                                    className="position-absolute"
                                    style={{ left: "0.5em", top: "0.5em" }}
                                />
                                <div>Register with Google</div>
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {
    register: userActions.register,
    notLoaded: userActions.notLoaded
})(Register);
