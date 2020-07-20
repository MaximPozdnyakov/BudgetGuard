import React, { useEffect } from "react";

import { If, Else, Then } from "react-if";

import { connect } from "react-redux";
import { getTransactions } from "../actions/transactions";
import userActions from "../actions/users";

import { Route, Switch, Redirect } from "react-router-dom";

import { Container, Spinner } from "react-bootstrap";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Operations from "./Operations/Operations";
import Overview from "./Overview/Overview";
import Header from "./Navbar/Header";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import ProtectedRoute from "./Utils/ProtectedRoute";
import RedirectIfAuthenticated from "./Utils/RedirectIfAuthenticated";

function App(props) {
    const {
        messages,
        getAuthenticatedUser,
        getTransactions,
        isTransactionsLoaded,
        isUserLoaded
    } = props;

    useEffect(() => {
        // getTransactions();
    }, []);

    useEffect(() => {
        getAuthenticatedUser();
    }, [localStorage.getItem("token")]);

    useEffect(() => {
        if (messages.type === "toast") {
            if (messages.isError) {
                for (let typeOfMessage in messages.messages) {
                    messages.messages[typeOfMessage].forEach(message =>
                        toast.error(message, {
                            position: "bottom-left",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined
                        })
                    );
                }
            } else {
                toast.success(messages.messages, {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
            }
        }
    }, [messages]);

    return (
        <If condition={isUserLoaded}>
            <Then>
                <ToastContainer
                    position="bottom-left"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <Header />
                <Container>
                    <Switch>
                        <ProtectedRoute exact path="/" component={Operations} />
                        <ProtectedRoute
                            exact
                            path="/overview"
                            component={Overview}
                        />
                        <RedirectIfAuthenticated
                            exact
                            path="/register"
                            component={Register}
                        />
                        <RedirectIfAuthenticated
                            exact
                            path="/login"
                            component={Login}
                        />
                    </Switch>
                </Container>
            </Then>
            <Else>
                <div className="d-flex spinner-wrapper justify-content-center align-content-center">
                    <Spinner animation="border" variant="primary" />
                </div>
            </Else>
        </If>
    );
}
const mapStateToProps = state => ({
    isUserLoaded: state.users.isUserLoaded,
    isTransactionsLoaded: state.transactions.isTransactionsLoaded,
    messages: state.messages
});

export default connect(mapStateToProps, {
    getAuthenticatedUser: userActions.getAuthenticatedUser,
    getTransactions
})(App);
