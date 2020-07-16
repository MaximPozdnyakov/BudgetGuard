import React from "react";

import CategoryFilter from "./CategoryFilter";
import MoneyFilter from "./MoneyFilter";
import DescriptionFilter from "./DescriptionFilter";

import { Form, Row, Col } from "react-bootstrap";

function Filters() {
    return (
        <div className="mt-5 bg-white p-3">
            <h6 className="font-weight-bold">Filters</h6>
            <Form>
                <CategoryFilter />
            </Form>
            <Form className="w-100 d-flex justify-content-between">
                <Row className="w-100">
                    <Col xs={5}>
                        <MoneyFilter />
                    </Col>
                    <Col xs={{ span: 5, offset: 2 }}>
                        <DescriptionFilter />
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default Filters;
