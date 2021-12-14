import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const TransactionsRoute = ({
    component: Component,
    isUserAuthenticated,
    hasWallets,
    ...rest
}) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (isUserAuthenticated) {
                    if (hasWallets) {
                        return <Component {...rest} {...props} />;
                    }
                    return <Redirect to="/wallet" />;
                }
                return <Redirect to="/login" />;
            }}
        />
    );
};

TransactionsRoute.propTypes = {
    isUserAuthenticated: PropTypes.bool.isRequired,
    hasWallets: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    isUserAuthenticated: state.user.isUserAuthenticated,
    hasWallets: state.wallets.wallets.length !== 0
});

export default connect(mapStateToProps)(TransactionsRoute);
