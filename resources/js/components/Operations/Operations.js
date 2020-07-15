import React, { useState } from "react";

import DateRangePicker from "@wojtekmaj/react-daterange-picker";

import { Container, Button } from "react-bootstrap";

import TransactionsList from "./TransactionsList";

function Operations() {
    const [date, onDateChange] = useState([new Date(), new Date()]);
    return (
        <Container>
            <div className="d-flex justify-content-between">
                <Button variant="success d-flex">
                    <svg
                        viewBox="0 0 24 24"
                        width="22"
                        height="22"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                    >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="16"></line>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                    <span className="align-self-start">Add transaction</span>
                </Button>
                <DateRangePicker onChange={onDateChange} value={date} />
            </div>
            <TransactionsList />
        </Container>
    );
}

export default Operations;
