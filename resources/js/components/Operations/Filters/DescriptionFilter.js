import React, { useState } from "react";

import { connect } from "react-redux";
import { setSearch } from "../../../actions/transactions";

import { Form } from "react-bootstrap";

function DescriptionFilter(props) {
    const { setSearch } = props;

    const [searchInput, setSearchInput] = useState("");

    function onChangeSearch(e) {
        setSearchInput(e.target.value);
        setSearch(e.target.value);
    }
    return (
        <Form.Group controlId="categoriesSelect">
            <Form.Label className="text-secondary">By note</Form.Label>
            <Form.Control
                value={searchInput}
                onChange={onChangeSearch}
                placeholder="By key word"
            />
        </Form.Group>
    );
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { setSearch })(DescriptionFilter);
