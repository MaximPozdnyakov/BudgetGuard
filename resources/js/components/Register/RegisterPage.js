import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import GoogleBtn from "./GoogleBtn";
import RegisterForm from "./RegisterForm";

function RegisterPage() {
    return (
        <Row>
            <Col
                xl="6"
                lg="7"
                md="10"
                sm="12"
                className="bg-white mx-auto p-4 shadow-sm"
            >
                <h2 className="text-center weight-700">Register</h2>
                <div className="d-flex w-100 justify-content-center mb-3">
                    <h5>Already registered?</h5>
                    <Link to="/login">
                        <h5 className="ml-2 text-success">Login!</h5>
                    </Link>
                </div>
                <Row>
                    <Col xs="11" md="11" className="mx-auto">
                        <RegisterForm />
                    </Col>
                </Row>
                <div className="text-center my-2">Or</div>
                <Row>
                    <Col xs="11" md="11" className="mx-auto">
                        <GoogleBtn />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default RegisterPage;
