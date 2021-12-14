import React from "react";
import { connect } from "react-redux";
import { Dropdown } from "react-bootstrap";
import { useHistory } from "react-router";
import PropTypes from "prop-types";

import { logout } from "../../actions/users";

import CustomToggle from "../Utils/CustomToggle";

function UserDropdown({ username, logout }) {
    const history = useHistory();
    const handleLogout = async () => {
        history.push("/login");
        await logout();
    };
    return (
        <Dropdown
            className="align-content-center d-none d-sm-flex"
            navbar={true}
            alignRight={true}
        >
            <Dropdown.Toggle as={CustomToggle}>{username}</Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item className="text-danger" onClick={handleLogout}>
                    Logout
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

UserDropdown.propTypes = {
    username: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ username: state.user.user.name });

export default connect(mapStateToProps, { logout })(UserDropdown);
