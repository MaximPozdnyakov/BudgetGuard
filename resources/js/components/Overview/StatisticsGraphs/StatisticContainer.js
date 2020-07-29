import React, { useState } from "react";

import { Row, Col, ListGroup } from "react-bootstrap";

import moment from "moment";

import { If, Then, Else } from "react-if";

import { connect } from "react-redux";

import IncomePie from "./IncomePie";
import ExpensePie from "./ExpensePie";
import BalanceLine from "./BalanceLine";
import BalanceBar from "./BalanceBar";

function StatisticContainer(props) {
    const { transactions, dateRange, categories, moneyRange, search } = props;

    const filteredTransaction = transactions.filter(transaction => {
        const spent_at = new Date(transaction.spent_at);

        let money;
        if (!transaction.moneySign) {
            money = -1 * Number(transaction.moneyAmount);
        } else {
            money = Number(transaction.moneyAmount);
        }

        let description;
        if (transaction.description) {
            description = transaction.description;
        } else {
            description = "";
        }
        return (
            dateRange[1].getTime() - spent_at.getTime() >= 0 &&
            dateRange[0].getTime() - spent_at.getTime() <= 0 &&
            categories.includes(transaction.category) &&
            money >= moneyRange[0] &&
            money <= moneyRange[1] &&
            description.includes(search)
        );
    });
    return (
        <>
            <If condition={filteredTransaction.length === 0}>
                <Then>
                    <ListGroup className="bg-white mt-3 text-center p-4">
                        <h4 className="mb-0 font-weight-bold">
                            No transactions found
                        </h4>
                    </ListGroup>
                </Then>
                <Else>
                    <Row className="" style={{ background: "#F4F7FA" }}>
                        <Col xs="12" lg className="mt-3 pr-lg-2">
                            <div className="bg-white p-3">
                                <BalanceLine />
                            </div>
                        </Col>
                        <Col xs="12" lg className="mt-3 pl-lg-2">
                            <div className="bg-white p-3">
                                <BalanceBar />
                            </div>
                        </Col>
                    </Row>
                    <Row className="" style={{ background: "#F4F7FA" }}>
                        <Col xs="12" lg className="mt-3 pr-lg-2">
                            <div className="bg-white h-100 p-1 p-md-3">
                                <IncomePie />
                            </div>
                        </Col>
                        <Col xs="12" lg className="mt-3 pl-lg-2">
                            <div className="bg-white h-100 p-1 p-md-3">
                                <ExpensePie />
                            </div>
                        </Col>
                    </Row>
                </Else>
            </If>
        </>
    );
}

const mapStateToProps = state => ({
    transactions: state.transactions.transactions,
    dateRange: state.transactions.transactionsFilters.dateRange,
    categories: state.transactions.transactionsFilters.categories,
    moneyRange: state.transactions.transactionsFilters.moneyRange,
    search: state.transactions.transactionsFilters.search
});

export default connect(mapStateToProps)(StatisticContainer);
