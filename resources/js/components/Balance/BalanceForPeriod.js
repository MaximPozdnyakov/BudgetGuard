import React from "react";

import NumberFormat from "react-number-format";

import _ from "lodash";

import { connect } from "react-redux";

function BalanceForPeriod(props) {
    const {
        transactions,
        dateRange,
        selectedWallet,
        categories,
        moneyRange,
        search
    } = props;

    const filteredTransactions = transactions.filter(transaction => {
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
            transaction.wallet === selectedWallet.id &&
            categories.includes(transaction.category) &&
            money >= moneyRange[0] &&
            money <= moneyRange[1] &&
            description.includes(search)
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
        <div className="d-md-block d-flex justify-content-between align-items-center">
            <h6 className="font-weight-bold mb-0 mb-md-2">
                Total change over the period
            </h6>
            <div
                className={`balance-text font-weight-bold ${
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
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    transactions: state.transactions.transactions,
    dateRange: state.transactions.transactionsFilters.dateRange,
    selectedWallet: state.wallets.currentWallet,
    categories: state.transactions.transactionsFilters.categories,
    moneyRange: state.transactions.transactionsFilters.moneyRange,
    search: state.transactions.transactionsFilters.search
});

export default connect(mapStateToProps)(BalanceForPeriod);
