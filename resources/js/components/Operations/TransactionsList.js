import React from "react";

import _ from "lodash";

import { ListGroup } from "react-bootstrap";

import { connect } from "react-redux";

import TransactionsListByDate from "./TransactionsListByDate";

function TransactionsList(props) {
    const transactionsGroupsByDateObject = _.groupBy(
        props.transactions.filter(transaction => {
            const spent_at = new Date(transaction.spent_at);
            return (
                props.dateRange[1].getTime() - spent_at.getTime() >= 0 &&
                props.dateRange[0].getTime() - spent_at.getTime() <= 0
            );
        }),
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
        <ListGroup className="bg-white mt-5">
            {transactionsGroupsByDateArray}
        </ListGroup>
    );
}

const mapStateToProps = state => ({
    transactions: state.transactions.transactions
});

export default connect(mapStateToProps)(TransactionsList);
