import React from "react";
import PropTypes from "prop-types";

import { Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { selectWallet } from "../../../actions/wallets";

function WalletsOptions({ wallets, selectedWalletId, selectWallet }) {
    const walletsOptions = wallets
        .filter(({ id }) => id != selectedWalletId)
        .map(wallet => (
            <Dropdown.Item key={wallet.id} onClick={() => selectWallet(wallet)}>
                {wallet.title}
            </Dropdown.Item>
        ));

    return (
        <Dropdown.Menu>
            {walletsOptions}
            <Dropdown.Item as="div">
                <NavLink to="/wallet" className="text-success">
                    Create new wallet
                </NavLink>
            </Dropdown.Item>
        </Dropdown.Menu>
    );
}

WalletsOptions.propTypes = {
    selectedWalletId: PropTypes.number.isRequired,
    selectWallet: PropTypes.func.isRequired,
    wallets: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
            initialBalance: PropTypes.string
        })
    ).isRequired
};

const mapStateToProps = state => ({
    wallets: state.wallets.wallets,
    selectedWalletId: state.wallets.currentWallet.id
});

export default connect(mapStateToProps, { selectWallet })(WalletsOptions);
