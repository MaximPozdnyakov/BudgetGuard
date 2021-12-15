import React from "react";

import TransactionsHeader from "../Transactions/TransactionsHeader";
import TransactionsList from "./TransactionsList";
import Balance from "../Transactions/Balance/Balance";

function Operations() {
    return (
        <>
            <TransactionsHeader />
            <Balance />
            <TransactionsList />
        </>
    );
}

export default Operations;
