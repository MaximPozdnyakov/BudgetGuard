import React from "react";

import { Row, Col } from "react-bootstrap";

import IncomePie from "./IncomePie";
import ExpensePie from "./ExpensePie";
import BalanceLine from "./BalanceLine";
import BalanceBar from "./BalanceBar";

function StatisticContainer() {
    return (
        <>
            <Row className="mt-3 mx-0" style={{ background: "#F4F7FA" }}>
                <Col className="bg-white p-3 mr-2">
                    <BalanceLine />
                </Col>
                <Col className="bg-white p-3 ml-2">
                    <BalanceBar />
                </Col>
            </Row>
            <Row className="mt-3 mx-0" style={{ background: "#F4F7FA" }}>
                <Col className="bg-white p-0 mr-2">
                    <IncomePie />
                </Col>
                <Col className="bg-white p-0 ml-2">
                    <ExpensePie />
                </Col>
            </Row>
        </>
    );
}

export default StatisticContainer;
