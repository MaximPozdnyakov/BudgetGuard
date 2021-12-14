import React from "react";
import { Row, Col } from "react-bootstrap";

import CurrentBalance from "./CurrentBalance";
import ExpenseForPeriod from "./ExpenseForPeriod";
import IncomeForPeriod from "./IncomeForPeriod";
import BalanceForPeriod from "./BalanceForPeriod";

function Balance() {
    return (
        <Row className="mx-0 mt-3 bg-f4">
            <Col md="6" xl className="mt-0 px-0 py-2 pr-md-2">
                <div className="bg-white p-3">
                    <CurrentBalance />
                </div>
            </Col>
            <Col md="6" xl className="mt-0 py-2 px-0 pl-md-2 pr-xl-2">
                <div className="bg-white p-3">
                    <BalanceForPeriod />
                </div>
            </Col>
            <Col md="6" xl className="mt-0 py-2 px-0 pr-md-2 pl-xl-2">
                <div className="bg-white p-3">
                    <ExpenseForPeriod />
                </div>
            </Col>
            <Col md="6" xl className="mt-0 px-0 py-2 pl-md-2">
                <div className="bg-white p-3">
                    <IncomeForPeriod />
                </div>
            </Col>
        </Row>
    );
}

export default Balance;
