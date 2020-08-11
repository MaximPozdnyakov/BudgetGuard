import React, { useState } from "react";

import { Link } from "react-router-dom";

import { Container, Form, Button, Row, Col } from "react-bootstrap";

import { connect } from "react-redux";
import userActions from "../../actions/users";
import MessagesAlert from "../Utils/MessagesAlert";

function Login(props) {
    const { login, notLoaded } = props;
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
                props.history.push("/operations");
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
                    Login
                </h2>
                <div className="d-flex w-100 justify-content-center mb-3">
                    <h5>Don' have account?</h5>
                    <Link to="/register">
                        <h5 className="ml-2 text-success">Register!</h5>
                    </Link>
                </div>
                <Row>
                    <Col xs="11" md="11" className="mx-auto">
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
                                <div>Login with Google</div>
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
    login: userActions.login,
    notLoaded: userActions.notLoaded
})(Login);
