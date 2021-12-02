import React from "react";
import { Col, Row } from "react-bootstrap";

import WalletForm from "./WalletForm";

function WalletPage() {
    return (
        <Row>
            <Col
                xl="6"
                lg="7"
                md="10"
                sm="12"
                className="bg-white mx-auto p-4 shadow-sm mt-5"
            >
                <h2 className="text-center weight-700">Create Wallet</h2>
                <Row>
                    <Col xs="11" md="11" className="mx-auto">
                        <WalletForm />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default WalletPage;
