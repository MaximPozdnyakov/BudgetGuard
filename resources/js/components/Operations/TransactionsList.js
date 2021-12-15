import React from "react";
import _ from "lodash";
import { format } from "date-fns";
import { ListGroup } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TransactionsGroup from "./TransactionsGroup";

import { selectTransactionsByFilters } from "../../selectors/selectors";
import { transactionShape } from "../../constants/transactions";

function TransactionsList({ transactions }) {
    if (!transactions.length) {
        return (
            <ListGroup className="bg-white mt-3 text-center p-4">
                <h4 className="mb-0 font-weight-bold">No transactions found</h4>
            </ListGroup>
        );
    }

    const transactionsByDate = _.groupBy(
        transactions.map(transaction => ({
            ...transaction,
            spent_at: format(new Date(transaction.spent_at), "MMMM dd, Y")
        })),
        "spent_at"
    );

    const transactionsGroups = [];
    for (const [date, transactions] of Object.entries(transactionsByDate)) {
        transactionsGroups.push(
            <TransactionsGroup
                date={date}
                transactions={transactions}
                key={date}
            />
        );
    }
    return (
        <ListGroup className="bg-white mt-3">{transactionsGroups}</ListGroup>
    );
}

TransactionsList.propTypes = {
    transactions: PropTypes.arrayOf(transactionShape).isRequired
};

const mapStateToProps = state => ({
    transactions: selectTransactionsByFilters(state)
});

export default connect(mapStateToProps)(TransactionsList);
