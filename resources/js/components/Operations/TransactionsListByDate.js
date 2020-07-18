import React from "react";

import moment from "moment";

import NumberFormat from "react-number-format";

import _ from "lodash";

import Transaction from "./Transaction";

function TransactionsListByDate(props) {
    const transactions = props.transactions.map(transaction => (
        <Transaction
            category={transaction.category}
            moneyAmount={transaction.moneyAmount}
            moneySign={transaction.moneySign}
            description={transaction.description}
            key={transaction.id}
        />
    ));
    const date = moment(props.transactions[0].spent_at).format("LL");

    const allMoney = props.transactions.map(transaction => {
        if (!transaction.moneySign) {
            return Number(-1 * transaction.moneyAmount);
        }
        return Number(transaction.moneyAmount);
    });
    const balance = _.sum(allMoney).toFixed(2);
    return (
        <>
            <div className="d-flex justify-content-between px-3 pt-3 font-weight-bold">
                <h5 className="mb-0">{date}</h5>
                <h5
                    className={`mb-0 ${
                        balance > 0 ? "text-success" : "text-danger"
                    }`}
                >
                    {balance > 0 ? "+" : ""}
                    <NumberFormat
                        value={balance}
                        displayType={"text"}
                        thousandSeparator={true}
                    />
                    {" USD"}
                </h5>
            </div>
            {transactions}
            <div className="border-top"></div>
        </>
    );
}

export default TransactionsListByDate;
