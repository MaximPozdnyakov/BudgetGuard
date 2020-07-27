import React from "react";

import { connect } from "react-redux";

import { If, Then } from "react-if";

import CategoryFilter from "./CategoryFilter";
import MoneyFilter from "./MoneyFilter";
import DescriptionFilter from "./DescriptionFilter";

import { Form, Row, Col } from "react-bootstrap";

function Filters(props) {
    const { transactions } = props;
    return (
        <If condition={transactions.length !== 0}>
            <Then>
                <div className="mt-3 bg-white p-3">
                    <h6 className="font-weight-bold">Filters</h6>
                    <Form>
                        <CategoryFilter />
                    </Form>
                    <Form className="w-100 d-flex justify-content-between">
                        <Row className="w-100">
                            <Col xs="12" md xl={5}>
                                <MoneyFilter />
                            </Col>
                            <Col xs="12" md xl={{ span: 5, offset: 2 }}>
                                <DescriptionFilter />
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Then>
        </If>
    );
}

const mapStateToProps = state => ({
    transactions: state.transactions.transactions
});

export default connect(mapStateToProps)(Filters);
