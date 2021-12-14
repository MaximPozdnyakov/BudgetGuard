import React from "react";
import { Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logout } from "../../../actions/users";

function UserOptions({ username, logout }) {
    return (
        <>
            <Dropdown.Item as="div" className="d-flex d-sm-none">
                {username}
            </Dropdown.Item>
            <Dropdown.Item
                className="text-danger d-flex d-sm-none"
                onClick={logout}
            >
                Logout
            </Dropdown.Item>
        </>
    );
}

UserOptions.propTypes = {
    username: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ username: state.user.user.name });

export default connect(mapStateToProps, { logout })(UserOptions);
