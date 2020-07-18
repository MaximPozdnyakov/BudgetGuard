import React from "react";

import { Container } from "react-bootstrap";

import MainHeader from "../OperationsAndOverview/MainHeader";
import TransactionsList from "./TransactionsList";

function Operations() {
    return (
        <Container>
            <MainHeader />
            <TransactionsList />
        </Container>
    );
}

export default Operations;
