import React from "react";

import { ListGroup, Row, Col } from "react-bootstrap";

function Transaction(props) {
    return (
        <ListGroup.Item className="gray-on-hover border-0">
            <Row>
                <Col xs={3}>{props.category}</Col>
                <Col xs={7}>{props.description}</Col>
                <Col
                    xs={2}
                    className={`font-weight-bold ${
                        props.moneySign ? "text-success" : "text-danger"
                    }`}
                >
                    {" "}
                    {props.moneySign ? "+" : "-"}
                    {props.moneyAmount} USD
                </Col>
            </Row>
        </ListGroup.Item>
    );
}

export default Transaction;
