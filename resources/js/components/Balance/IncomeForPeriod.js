import React from "react";

import NumberFormat from "react-number-format";

import _ from "lodash";

import { connect } from "react-redux";

function IncomeForPeriod(props) {
    const { transactions, dateRange, selectedWallet } = props;

    const filteredTransactions = transactions.filter(transaction => {
        const spent_at = new Date(transaction.spent_at);
        return (
            dateRange[1].getTime() - spent_at.getTime() >= 0 &&
            dateRange[0].getTime() - spent_at.getTime() <= 0 &&
            transaction.moneySign &&
            transaction.wallet === selectedWallet.id
        );
    });
    const allMoney = filteredTransactions.map(transaction => {
        if (!transaction.moneySign) {
            return -1 * Number(transaction.moneyAmount);
        }
        return Number(transaction.moneyAmount);
    });
    const balance = _.sum(allMoney).toFixed(2);
    return (
        <div>
            <h6 className="font-weight-bold">
                Total consumption for the period
            </h6>
            <h3
                className={`font-weight-bold ${
                    balance >= 0 ? "text-success" : "text-danger"
                }`}
            >
                {balance > 0 ? "+" : ""}
                <NumberFormat
                    value={balance}
                    displayType={"text"}
                    thousandSeparator={true}
                />
                {" USD"}
            </h3>
        </div>
    );
}

const mapStateToProps = state => ({
    transactions: state.transactions.transactions,
    dateRange: state.transactions.transactionsFilters.dateRange,
    selectedWallet: state.wallets.currentWallet
});

export default connect(mapStateToProps)(IncomeForPeriod);
