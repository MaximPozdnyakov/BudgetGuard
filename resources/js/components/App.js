import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";

import { fetchTransactions } from "../actions/transactions";
import { fetchWallets } from "../actions/wallets";
import { fetchUser } from "../actions/users";

import { checkDataLoaded } from "../selectors/selectors";

import Loader from "./Utils/Loader";
import MessagesToast from "./Utils/MessagesToast";
import Header from "./Header/Header";
import GuestRoute from "./Routes/GuestRoute";
import PrivateRoute from "./Routes/PrivateRoute";
import TransactionsRoute from "./Routes/TransactionsRoute";

import Overview from "./Overview/Overview";
import Operations from "./Operations/Operations";
import LoginPage from "./Login/LoginPage";
import WalletPage from "./Wallet/WalletPage";
import RegisterPage from "./Register/RegisterPage";
import Home from "./Home";
import Page404 from "./Page404";

function App({ fetchUser, fetchTransactions, fetchWallets, isDataLoaded }) {
    useEffect(() => {
        (async () => {
            await fetchUser();
            await Promise.all([fetchWallets(), fetchTransactions()]);
        })();
    }, []);

    if (!isDataLoaded) return <Loader />;
    return (
        <>
            <MessagesToast />
            <Header />
            <Container className="px-0 px-sm-5 container-main">
                <Switch>
                    <GuestRoute exact path="/" component={Home} />
                    <GuestRoute
                        exact
                        path="/register"
                        component={RegisterPage}
                    />
                    <GuestRoute exact path="/login" component={LoginPage} />
                    <PrivateRoute exact path="/wallet" component={WalletPage} />
                    <TransactionsRoute
                        exact
                        path="/operations"
                        component={Operations}
                    />
                    <TransactionsRoute
                        exact
                        path="/overview"
                        component={Overview}
                    />
                    <Route component={Page404} />
                </Switch>
            </Container>
        </>
    );
}

App.propTypes = {
    fetchUser: PropTypes.func.isRequired,
    fetchTransactions: PropTypes.func.isRequired,
    fetchWallets: PropTypes.func.isRequired,
    isDataLoaded: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({ isDataLoaded: checkDataLoaded(state) });

export default connect(mapStateToProps, {
    fetchUser,
    fetchTransactions,
    fetchWallets
})(App);
