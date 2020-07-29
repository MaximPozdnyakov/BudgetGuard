import React from "react";

import { Container } from "react-bootstrap";

import MainHeader from "../OperationsAndOverview/MainHeader";
import TransactionsList from "./TransactionsList";

function Operations() {
    return (
        <>
            <MainHeader />
            <TransactionsList />
        </>
    );
}

export default Operations;
