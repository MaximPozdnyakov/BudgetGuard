import React from "react";
import { Route, Redirect } from "react-router-dom";

import { connect } from "react-redux";

import { If, Then, Else } from "react-if";

const RedirectIfAuthenticated = ({
    component: Component,
    isUserAuthenticated,
    ...rest
}) => {
    return (
        <If condition={!isUserAuthenticated}>
            <Then>
                <Route
                    {...rest}
                    render={props => <Component {...rest} {...props} />}
                />
            </Then>
            <Else>
                <Redirect to="/" />
            </Else>
        </If>
    );
};

const mapStateToProps = state => ({
    isUserAuthenticated: state.users.isUserAuthenticated
});

export default connect(mapStateToProps)(RedirectIfAuthenticated);
