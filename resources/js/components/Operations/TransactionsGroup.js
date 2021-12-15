import React from "react";
import { startOfDay, endOfDay } from "date-fns";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TransactionItem from "./TransactionItem";

import { selectBalanceForPeriod } from "../../selectors/selectors";
import { transactionShape } from "../../constants/transactions";

function TransactionsGroup({ date, transactions, balance }) {
    const transactionsComponents = transactions.map(transaction => (
        <TransactionItem
            transaction={transaction}
            key={transaction.id || transaction.temporaryId}
        />
    ));
    return (
        <>
            <div className="d-flex justify-content-between px-3 pt-3 font-weight-bold">
                <h6 className="mb-2 font-weight-bold">{date}</h6>
                <h6 className={`mb-0 font-weight-normal text-secondary`}>
                    {balance > 0 && "+"}
                    <NumberFormat
                        value={balance}
                        displayType={"text"}
                        thousandSeparator
                    />{" "}
                    USD
                </h6>
            </div>
            {transactionsComponents}
            <div className="border-top"></div>
        </>
    );
}

TransactionsGroup.propTypes = {
    transactions: PropTypes.arrayOf(transactionShape).isRequired,
    date: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired
};

const mapStateToProps = (state, { date }) => ({
    balance: selectBalanceForPeriod({
        ...state,
        transactions: {
            ...state.transactions,
            filters: {
                ...state.transactions.filters,
                dateRange: [
                    startOfDay(new Date(date)),
                    endOfDay(new Date(date))
                ]
            }
        }
    })
});

export default connect(mapStateToProps)(TransactionsGroup);
