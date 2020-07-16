import React from "react";

import CategoryFilter from "./CategoryFilter";
import MoneyFilter from "./MoneyFilter";

import { Form } from "react-bootstrap";

function Filters() {
    return (
        <div className="mt-5 bg-white p-3">
            <h6 className="font-weight-bold">Filters</h6>
            <Form>
                <CategoryFilter />
            </Form>
            <Form>
                <MoneyFilter />
            </Form>
        </div>
    );
}

export default Filters;
