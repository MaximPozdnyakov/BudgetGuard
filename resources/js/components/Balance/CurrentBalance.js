import React from "react";

import NumberFormat from "react-number-format";

import _ from "lodash";

import { connect } from "react-redux";

function CurrentBalance(props) {
    const { transactions, initialBalance, selectedWallet } = props;

    const allMoney = transactions
        .filter(t => t.wallet === selectedWallet.id)
        .map(transaction => {
            if (!transaction.moneySign) {
                return -1 * Number(transaction.moneyAmount);
            }
            return Number(transaction.moneyAmount);
        });
    const balance = Number(_.sum(allMoney).toFixed(2)) + Number(initialBalance);
    return (
        <div>
            <h6 className="font-weight-bold">Current wallet balance</h6>
            <h3
                className={`font-weight-bold ${
                    balance >= 0 ? "text-success" : "text-danger"
                }`}
            >
                {balance == 0 ? "" : balance < 0 ? "-" : ""}
                <NumberFormat
                    value={balance.toFixed(2)}
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
    initialBalance: state.wallets.currentWallet.initialBalance,
    selectedWallet: state.wallets.currentWallet
});

export default connect(mapStateToProps)(CurrentBalance);
