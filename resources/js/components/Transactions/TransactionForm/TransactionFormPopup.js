import React from "react";
import { Button, Popover } from "react-bootstrap";
import PropTypes from "prop-types";

import Cross from "../../Icons/Cross";
import TransactionForm from "./TransactionForm";

const TransactionFormPopup = ({ toggleForm }) => (
    <Popover className="popover-container">
        <Popover.Content className="p-3">
            <Button
                variant="white"
                className="icon-right p-0 z-max"
                onClick={toggleForm}
            >
                <Cross />
            </Button>
            <TransactionForm {...{ toggleForm }} />
        </Popover.Content>
    </Popover>
);

TransactionFormPopup.propTypes = {
    toggleForm: PropTypes.func.isRequired
};

export default TransactionFormPopup;
