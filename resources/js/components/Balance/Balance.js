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
                <Row className="mx-0 mt-3" style={{ background: "#F4F7FA" }}>
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
                            <OutcomeForPeriod />
                        </div>
                    </Col>
                    <Col md="6" xl className="mt-0 px-0 py-2 pl-md-2">
                        <div className="bg-white p-3">
                            <IncomeForPeriod />
                        </div>
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
