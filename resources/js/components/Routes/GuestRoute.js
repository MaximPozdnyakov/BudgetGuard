import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const GuestRoute = ({ component: Component, isUserAuthenticated, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                !isUserAuthenticated ? (
                    <Component {...rest} {...props} />
                ) : (
                    <Redirect to="/overview" />
                )
            }
        />
    );
};

const mapStateToProps = state => ({
    isUserAuthenticated: state.user.isUserAuthenticated
});

export default connect(mapStateToProps)(GuestRoute);
