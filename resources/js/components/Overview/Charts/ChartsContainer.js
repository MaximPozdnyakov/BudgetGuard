import React from "react";
import { Row, Col } from "react-bootstrap";

import BalanceLine from "./BalanceLine";
import TransactionsBars from "./TransactionsBars";
import TransactionsPie from "./TransactionsPie";

function ChartsContainer() {
    return (
        <>
            <Row className="bg-f4">
                <Col xs="12" lg className="mt-3 pr-lg-2">
                    <div className="bg-white p-3">
                        <BalanceLine />
                    </div>
                </Col>
                <Col xs="12" lg className="mt-3 pl-lg-2">
                    <div className="bg-white p-3">
                        <TransactionsBars />
                    </div>
                </Col>
            </Row>
            <Row className="bg-f4">
                <Col xs="12" lg className="mt-3 pr-lg-2">
                    <div className="bg-white h-100 p-1 p-md-3 d-flex flex-column">
                        <TransactionsPie isIncome />
                    </div>
                </Col>
                <Col xs="12" lg className="mt-3 pl-lg-2">
                    <div className="bg-white h-100 p-1 p-md-3 d-flex flex-column">
                        <TransactionsPie isIncome={false} />
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default ChartsContainer;
