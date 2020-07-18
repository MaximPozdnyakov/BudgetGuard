import React from "react";

import { Row, Col } from "react-bootstrap";

import IncomeForPeriod from "./IncomeForPeriod";
import ExpenseForPeriod from "./ExpenseForPeriod";

function StatisticContainer() {
    return (
        <Row className="mt-5">
            <Col className="bg-white p-0 mr-2">
                <IncomeForPeriod />
            </Col>
            <Col className="bg-white p-0 ml-2">
                <ExpenseForPeriod />
            </Col>
        </Row>
    );
}

export default StatisticContainer;
