import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

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

PrivateRoute.propTypes = {
    isUserAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    isUserAuthenticated: state.user.isUserAuthenticated
});

export default connect(mapStateToProps)(PrivateRoute);
