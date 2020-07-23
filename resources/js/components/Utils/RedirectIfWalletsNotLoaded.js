import React from "react";
import { Route, Redirect } from "react-router-dom";

import { connect } from "react-redux";

import { If, Then, Else } from "react-if";

const RedirectIfWalletsNotLoaded = ({
    component: Component,
    isUserAuthenticated,
    selectedWallet,
    ...rest
}) => {
    return (
        <If
            condition={
                isUserAuthenticated && Object.keys(selectedWallet).length !== 0
            }
        >
            <Then>
                <Route
                    {...rest}
                    render={props => <Component {...rest} {...props} />}
                />
            </Then>
            <Else>
                <If condition={!isUserAuthenticated}>
                    <Then>
                        <Redirect to="/login" />
                    </Then>
                    <Else>
                        <Redirect to="/wallet/create" />
                    </Else>
                </If>
            </Else>
        </If>
    );
};

const mapStateToProps = state => ({
    isUserAuthenticated: state.users.isUserAuthenticated,
    selectedWallet: state.wallets.currentWallet
});

export default connect(mapStateToProps)(RedirectIfWalletsNotLoaded);
