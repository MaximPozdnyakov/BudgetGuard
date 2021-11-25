import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({
    component: Component,
    isUserAuthenticated,
    ...rest
}) => {
    return (
        <Route
            {...rest}
            render={props =>
                isUserAuthenticated ? (
                    <Component {...rest} {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

const mapStateToProps = state => ({
    isUserAuthenticated: state.users.isUserAuthenticated
});

export default connect(mapStateToProps)(PrivateRoute);
