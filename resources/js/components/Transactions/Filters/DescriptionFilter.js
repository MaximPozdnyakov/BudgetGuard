import React from "react";
import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

import { setSearch } from "../../../actions/transactions";

function DescriptionFilter({ search, setSearch }) {
    const handleSearchChange = e => setSearch(e.target.value);

    return (
        <Form.Group
            controlId="categoriesSelect"
            className="pr-0 position-relative desc-filter"
        >
            <Form.Label className="text-secondary">By note</Form.Label>
            <Form.Control
                value={search}
                onChange={handleSearchChange}
                placeholder="By key word"
            />
        </Form.Group>
    );
}

DescriptionFilter.propTypes = {
    setSearch: PropTypes.func.isRequired,
    search: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    search: state.transactions.filters.search
});

export default connect(mapStateToProps, { setSearch })(DescriptionFilter);
