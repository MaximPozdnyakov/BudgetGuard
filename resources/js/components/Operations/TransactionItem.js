import React, { useState } from "react";
import NumberFormat from "react-number-format";
import { Row, Col, OverlayTrigger, ListGroup } from "react-bootstrap";
import { When } from "react-if";
import Truncate from "react-truncate";

import TransactionFormPopup from "./TransactionForm/TransactionFormPopup";
import { transactionShape } from "../../constants/transactions";

function TransactionItem({ transaction }) {
    const [isFormOpen, setFormOpen] = useState(false);
    const toggleForm = () => setFormOpen(isFormOpen => !isFormOpen);

    const { category, description, moneySign, moneyAmount } = transaction;
    return (
        <>
            <When condition={isFormOpen}>
                <div className="dark-overlay" onClick={toggleForm}></div>
            </When>
            <OverlayTrigger
                placement="bottom-start"
                overlay={TransactionFormPopup({ toggleForm, transaction })}
                show={isFormOpen}
            >
                <ListGroup.Item
                    className="gray-on-hover border-0 pointer"
                    onClick={toggleForm}
                >
                    <Row>
                        <Col xs={4} md={3}>
                            {category}
                        </Col>
                        <Col xs={4} md={6}>
                            <div className="d-none d-md-block">
                                <Truncate>{description ?? ""}</Truncate>
                            </div>
                        </Col>
                        <Col
                            xs={4}
                            md={3}
                            className={`font-weight-bold text-right ${
                                moneySign == 1 ? "text-success" : "text-danger"
                            }`}
                        >
                            {moneySign == 1 ? "+" : "-"}
                            <NumberFormat
                                value={Number(moneyAmount)}
                                displayType={"text"}
                                thousandSeparator={true}
                            />{" "}
                            USD
                        </Col>
                    </Row>
                </ListGroup.Item>
            </OverlayTrigger>
        </>
    );
}

TransactionItem.propTypes = {
    transaction: transactionShape.isRequired
};

export default TransactionItem;
