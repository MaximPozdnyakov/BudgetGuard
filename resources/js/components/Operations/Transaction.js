import React from "react";

import { ListGroup } from "react-bootstrap";

function Transaction(props) {
    return (
        <ListGroup.Item className="d-flex justify-content-between gray-on-hover border-0">
            <div>{props.category}</div>
            <div
                className={`font-weight-bold ${
                    props.moneySign ? "text-success" : "text-danger"
                }`}
            >
                {props.moneySign ? "+" : "-"}
                {props.moneyAmount} USD
            </div>
        </ListGroup.Item>
    );
}

export default Transaction;
