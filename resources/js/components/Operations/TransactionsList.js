import React from "react";

import _ from "lodash";

import { ListGroup } from "react-bootstrap";

import { connect } from "react-redux";

import TransactionsListByDate from "./TransactionsListByDate";

function TransactionsList(props) {
    const transactionsGroupsByDateObject = _.groupBy(
        props.transactions,
        "spent_at"
    );
    console.log(
        "transactionsGroupsByDateObject",
        transactionsGroupsByDateObject
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
