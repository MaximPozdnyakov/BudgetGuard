import React from "react";

import TransactionsHeader from "../Transactions/TransactionsHeader";
import ChartsContainer from "./Charts/ChartsContainer";

function Overview() {
    return (
        <>
            <TransactionsHeader />
            <ChartsContainer />
        </>
    );
}

export default Overview;
