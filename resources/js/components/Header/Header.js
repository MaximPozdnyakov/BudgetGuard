import React from "react";
import { Navbar } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import DefaultHeader from "./DefaultHeader";
import WalletsDropdown from "./WalletsDropdown/WalletsDropdown";
import HeaderTabs from "./HeaderTabs";
import UserDropdown from "./UserDropdown";

function Header({ isUserAuthenticated, hasWallets }) {
    if (!isUserAuthenticated || !hasWallets) {
        return <DefaultHeader />;
    }

    return (
        <Navbar className="border-bottom px-3 px-md-5  mb-3 mb-md-5 bg-white">
            <div className="d-flex justify-content-between w-100">
                <WalletsDropdown />
                <HeaderTabs />
                <UserDropdown />
            </div>
        </Navbar>
    );
}

Header.propTypes = {
    isUserAuthenticated: PropTypes.bool.isRequired,
    hasWallets: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    isUserAuthenticated: state.user.isUserAuthenticated,
    hasWallets: state.wallets.wallets.length !== 0
});

export default connect(mapStateToProps)(Header);
