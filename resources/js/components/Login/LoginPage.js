import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import LoginForm from "./LoginForm";

function LoginPage() {
    return (
        <Row>
            <Col
                xl="6"
                lg="7"
                md="10"
                sm="12"
                className="bg-white mx-auto p-4 shadow-sm"
            >
                <h2 className="text-center weight-700">Login</h2>
                <div className="d-flex w-100 justify-content-center mb-3">
                    <h5>Don' have account?</h5>
                    <Link to="/register">
                        <h5 className="ml-2 text-success">Register!</h5>
                    </Link>
                </div>
                <Row>
                    <Col xs="11" md="11" className="mx-auto">
                        <LoginForm />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default LoginPage;
