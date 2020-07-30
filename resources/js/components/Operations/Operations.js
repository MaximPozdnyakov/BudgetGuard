import React from "react";

import Balance from "../Balance/Balance";
import MainHeader from "../OperationsAndOverview/MainHeader";
import TransactionsList from "./TransactionsList";

function Operations() {
    return (
        <>
            <MainHeader />
            <Balance />
            <TransactionsList />
        </>
    );
}

export default Operations;
