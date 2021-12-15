import React from "react";
import { Button } from "react-bootstrap";
import Plus from "../../Icons/Plus";
import PropTypes from "prop-types";

function BtnAddTransaction({ toggleForm }) {
    return (
        <Button variant="success" onClick={toggleForm}>
            <Plus />
            <span className="align-self-start font-weight-bold">
                Add transaction
            </span>
        </Button>
    );
}

BtnAddTransaction.propTypes = {
    toggleForm: PropTypes.func.isRequired
};

export default BtnAddTransaction;
