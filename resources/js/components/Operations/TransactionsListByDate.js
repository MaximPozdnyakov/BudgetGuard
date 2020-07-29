import React from "react";

import moment from "moment";

import NumberFormat from "react-number-format";

import _ from "lodash";

import Transaction from "./Transaction";

function TransactionsListByDate(props) {
    const transactions = props.transactions.map(transaction => (
        <Transaction
            id={transaction.id}
            category={transaction.category}
            moneyAmount={transaction.moneyAmount}
            moneySign={transaction.moneySign}
            description={transaction.description}
            spent_at={transaction.spent_at}
            note={
                transaction.description === null ? "" : transaction.description
            }
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
                <h6 className="mb-0 font-weight-bold">{date}</h6>
                <h6 className={`mb-0 font-weight-bold text-secondary`}>
                    {balance > 0 ? "+" : ""}
                    <NumberFormat
                        value={balance}
                        displayType={"text"}
                        thousandSeparator={true}
                    />
                    {" USD"}
                </h6>
            </div>
            {transactions}
            <div className="border-top"></div>
        </>
    );
}

export default TransactionsListByDate;
