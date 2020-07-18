import React from "react";

import { Row, Col } from "react-bootstrap";

import CurrentBalance from "./CurrentBalance";
import BalanceForPeriod from "./BalanceForPeriod";
import OutcomeForPeriod from "./OutcomeForPeriod";
import IncomeForPeriod from "./IncomeForPeriod";

import { connect } from "react-redux";

import { If, Then } from "react-if";

function Balance(props) {
    const { transactions } = props;
    return (
        <If condition={transactions.length !== 0}>
            <Then>
                <Row className="mt-5 mx-0" style={{ background: "#F4F7FA" }}>
                    <Col className="bg-white p-3 mr-2">
                        <CurrentBalance />
                    </Col>
                    <Col className="bg-white p-3 mx-2">
                        <BalanceForPeriod />
                    </Col>
                    <Col className="bg-white p-3 mx-2">
                        <OutcomeForPeriod />
                    </Col>
                    <Col className="bg-white p-3 ml-2">
                        <IncomeForPeriod />
                    </Col>
                </Row>
            </Then>
        </If>
    );
}

const mapStateToProps = state => ({
    transactions: state.transactions.transactions
});

export default connect(mapStateToProps)(Balance);
