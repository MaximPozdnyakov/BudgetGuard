import React from "react";

import NumberFormat from "react-number-format";

import { ListGroup, Row, Col } from "react-bootstrap";

function Transaction(props) {
    return (
        <ListGroup.Item className="gray-on-hover border-0">
            <Row>
                <Col xs={3}>{props.category}</Col>
                <Col xs={7}>{props.description ? props.description : ""}</Col>
                <Col
                    xs={2}
                    className={`font-weight-bold text-right ${
                        props.moneySign ? "text-success" : "text-danger"
                    }`}
                >
                    {" "}
                    {props.moneySign ? "+" : "-"}
                    <NumberFormat
                        value={props.moneyAmount}
                        displayType={"text"}
                        thousandSeparator={true}
                    />
                    {" USD"}
                </Col>
            </Row>
        </ListGroup.Item>
    );
}

export default Transaction;
