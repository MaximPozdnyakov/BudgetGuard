import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const GuestRoute = ({ component: Component, isUserAuthenticated, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                !isUserAuthenticated ? (
                    <Component {...rest} {...props} />
                ) : (
                    <Redirect to="/operations" />
                )
            }
        />
    );
};

GuestRoute.propTypes = {
    isUserAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    isUserAuthenticated: state.user.isUserAuthenticated
});

export default connect(mapStateToProps)(GuestRoute);
