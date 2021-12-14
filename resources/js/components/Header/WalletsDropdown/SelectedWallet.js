import React from "react";
import { Navbar, Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import CustomToggle from "../../Utils/CustomToggle";

function SelectedWallet({ title }) {
    return (
        <Dropdown.Toggle as={CustomToggle}>
            <Navbar.Brand className="font-weight-bold text-dark mr-1">
                {title}
            </Navbar.Brand>
        </Dropdown.Toggle>
    );
}

SelectedWallet.propTypes = {
    title: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    title: state.wallets.currentWallet.title
});

export default connect(mapStateToProps)(SelectedWallet);
