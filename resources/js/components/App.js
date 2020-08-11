import React, { useEffect } from "react";

import { If, Else, Then } from "react-if";

import { connect } from "react-redux";
import { getTransactions } from "../actions/transactions";
import { getWallets } from "../actions/wallets";
import userActions from "../actions/users";

import { Switch, Route } from "react-router-dom";

import { Container, Spinner } from "react-bootstrap";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Operations from "./Operations/Operations";
import Overview from "./Overview/Overview";
import Header from "./Navbar/Header";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import RedirectIfNotAuthenticated from "./Utils/RedirectIfNotAuthenticated";
import RedirectIfAuthenticated from "./Utils/RedirectIfAuthenticated";
import RedirectIfWalletsNotLoaded from "./Utils/RedirectIfWalletsNotLoaded";
import AddWallet from "./Wallet/AddWallet";
import Home from "./Home";
import Page404 from "./Page404";

function App(props) {
    const {
        messages,
        getAuthenticatedUser,
        getTransactions,
        isTransactionsLoaded,
        isUserLoaded,
        isUserAuthenticated,
        isWalletsLoaded,
        getWallets
    } = props;

    useEffect(() => {
        getAuthenticatedUser();
    }, [localStorage.getItem("token")]);

    useEffect(() => {
        if (isUserAuthenticated && !isWalletsLoaded) {
            getWallets();
        }
    }, [isUserAuthenticated]);

    useEffect(() => {
        if (isWalletsLoaded && !isTransactionsLoaded) {
            getTransactions();
        }
    }, [isWalletsLoaded]);

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
        <If
            condition={
                (isUserLoaded &&
                    !isUserAuthenticated &&
                    !isTransactionsLoaded &&
                    !isWalletsLoaded) ||
                (isUserLoaded &&
                    isUserAuthenticated &&
                    isTransactionsLoaded &&
                    isWalletsLoaded)
            }
        >
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
                <Container className="px-0 px-sm-5 container-main">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <RedirectIfWalletsNotLoaded
                            exact
                            path="/operations"
                            component={Operations}
                        />
                        <RedirectIfWalletsNotLoaded
                            exact
                            path="/overview"
                            component={Overview}
                        />
                        <RedirectIfNotAuthenticated
                            exact
                            path="/wallet/create"
                            component={AddWallet}
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
                        <Route component={Page404} />
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
    messages: state.messages,
    isUserAuthenticated: state.users.isUserAuthenticated,
    isWalletsLoaded: state.wallets.isWalletsLoaded
});

export default connect(mapStateToProps, {
    getAuthenticatedUser: userActions.getAuthenticatedUser,
    getTransactions,
    getWallets
})(App);
