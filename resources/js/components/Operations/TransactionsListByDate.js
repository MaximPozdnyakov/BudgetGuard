import React from "react";

import moment from "moment";

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
    return (
        <>
            <h6 className="font-weight-bold px-3 pt-3 mb-0">{date}</h6>
            {transactions}
            <div className="border-top"></div>
        </>
    );
}

export default TransactionsListByDate;
