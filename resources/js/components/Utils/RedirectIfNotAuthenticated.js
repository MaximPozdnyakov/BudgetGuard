import React from "react";
import { Route, Redirect } from "react-router-dom";

import { connect } from "react-redux";

import { If, Then, Else } from "react-if";

const RedirectIfNotAuthenticated = ({
    component: Component,
    isUserAuthenticated,
    ...rest
}) => {
    return (
        <If condition={isUserAuthenticated}>
            <Then>
                <Route
                    {...rest}
                    render={props => <Component {...rest} {...props} />}
                />
            </Then>
            <Else>
                <Redirect to="/login" />
            </Else>
        </If>
    );
};

const mapStateToProps = state => ({
    isUserAuthenticated: state.users.isUserAuthenticated
});

export default connect(mapStateToProps)(RedirectIfNotAuthenticated);
