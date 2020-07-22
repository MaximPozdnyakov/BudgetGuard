import React from "react";

import { Row, Col, ListGroup } from "react-bootstrap";

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

    const filteredTransactionWithFormattedDate = filteredTransaction.map(
        transaction => ({
            ...transaction,
            spent_at: moment(transaction.spent_at).format("L")
        })
    );

    const transactionsGroupsByDateObject = _.groupBy(
        filteredTransactionWithFormattedDate,
        "spent_at"
    );

    let transactionsGroupsByDateArray = [];
    for (let transactionDate in transactionsGroupsByDateObject) {
        transactionsGroupsByDateArray.unshift(
            <TransactionsListByDate
                transactions={transactionsGroupsByDateObject[transactionDate]}
                key={transactionDate}
            />
        );
    }
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
                    <Row
                        className="mt-3 mx-0"
                        style={{ background: "#F4F7FA" }}
                    >
                        <Col className="bg-white p-3 mr-2">
                            <BalanceLine />
                        </Col>
                        <Col className="bg-white p-3 ml-2">
                            <BalanceBar />
                        </Col>
                    </Row>
                    <Row
                        className="mt-3 mx-0"
                        style={{ background: "#F4F7FA" }}
                    >
                        <Col className="bg-white p-0 mr-2">
                            <IncomePie />
                        </Col>
                        <Col className="bg-white p-0 ml-2">
                            <ExpensePie />
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
