import React from "react";
import { Form, Row, Col } from "react-bootstrap";

import CategoryFilter from "./CategoryFilter";
import MoneyFilter from "./MoneyFilter";
import DescriptionFilter from "./DescriptionFilter";

function Filters() {
    return (
        <div className="mt-3 bg-white p-3">
            <h6 className="font-weight-bold">Filters</h6>
            <CategoryFilter />
            <Form className="d-flex justify-content-between">
                <Row className="w-100">
                    <Col xs="12" md xl={5} className="pr-0 pr-md-2">
                        <MoneyFilter />
                    </Col>
                    <Col
                        xs="12"
                        md
                        xl={{ span: 5, offset: 2 }}
                        className="pr-0"
                    >
                        <DescriptionFilter />
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default Filters;
