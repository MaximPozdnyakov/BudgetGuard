import React, { useEffect } from "react";

import { If, Else, Then } from "react-if";

import { connect } from "react-redux";
import { getTransactions } from "../actions/transactions";

import { Route, Switch } from "react-router-dom";

import { Container, Spinner } from "react-bootstrap";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Operations from "./Operations/Operations";
import Overview from "./Overview/Overview";
import Header from "./Navbar/Header";

function App(props) {
    const { messages } = props;

    useEffect(() => {
        props.getTransactions();
    }, []);

    useEffect(() => {
        if (Object.keys(messages).length !== 0) {
            if (messages.type === "error") {
                for (let typeOfMessage in messages) {
                    messages.descriptions[typeOfMessage].forEach(message =>
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
                for (let typeOfMessage in messages) {
                    messages.descriptions[typeOfMessage].forEach(message =>
                        toast.success(message, {
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
            }
        }
    }, [messages]);

    return (
        <If condition={props.isTransactionsLoaded}>
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
                        <Route exact path="/" component={Operations} />
                        <Route exact path="/overview" component={Overview} />
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
    isTransactionsLoaded: state.transactions.isTransactionsLoaded,
    messages: state.messages.messages
});

export default connect(mapStateToProps, { getTransactions })(App);
