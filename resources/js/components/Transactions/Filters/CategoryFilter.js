import React from "react";
import { connect } from "react-redux";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

import { selectCategoryOptions } from "../../../selectors/selectors";
import { setCategories } from "../../../actions/transactions";

function CategoryFilter({ setCategories, categories, options }) {
    const handleCategoriesChange = options =>
        setCategories(options ? options.map(option => option.value) : []);

    const getCurrentOptions = ({ categories }) =>
        categories.map(category => ({
            value: category,
            label: category
        }));

    return (
        <Form>
            <Form.Group controlId="categoriesSelect">
                <Form.Label className="text-secondary">By category</Form.Label>
                <Select
                    value={getCurrentOptions({ categories })}
                    isMulti
                    closeMenuOnSelect={false}
                    options={options}
                    components={animatedComponents}
                    onChange={handleCategoriesChange}
                />
            </Form.Group>
        </Form>
    );
}

CategoryFilter.propTypes = {
    setCategories: PropTypes.func.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    options: PropTypes.arrayOf(
        PropTypes.exact({
            label: PropTypes.string,
            value: PropTypes.string
        })
    ).isRequired
};

const mapStateToProps = state => ({
    options: selectCategoryOptions(state),
    categories: state.transactions.filters.categories
});

export default connect(mapStateToProps, { setCategories })(CategoryFilter);
