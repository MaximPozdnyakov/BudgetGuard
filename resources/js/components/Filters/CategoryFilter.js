import React from "react";

import { connect } from "react-redux";
import { setCategories } from "../../actions/transactions";

import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();

import { Form } from "react-bootstrap";

function CategoryFilter(props) {
    const { categories, transactions, setCategories } = props;
    const allCategories = Object.keys(_.groupBy(transactions, "category")).map(
        category => {
            return {
                value: category,
                label: category
            };
        }
    );
    return (
        <Form.Group controlId="categoriesSelect">
            <Form.Label className="text-secondary">By category</Form.Label>
            <Select
                defaultValue={categories.map(category => {
                    return {
                        value: category,
                        label: category
                    };
                })}
                isMulti
                closeMenuOnSelect={false}
                options={allCategories}
                components={animatedComponents}
                onChange={setCategories}
            />
        </Form.Group>
    );
}

const mapStateToProps = state => ({
    transactions: state.transactions.transactions,
    categories: state.transactions.transactionsFilters.categories
});

export default connect(mapStateToProps, { setCategories })(CategoryFilter);
