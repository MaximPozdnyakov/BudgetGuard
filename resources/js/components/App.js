import React, { useEffect } from 'react'

import { If, Else, Then } from 'react-if';

import { connect } from 'react-redux';
import { getTransactions } from '../actions/transactions';

import { Route, Switch } from 'react-router-dom';

import { Container, Spinner } from 'react-bootstrap';

import Operations from './Operations/Operations';
import Overview from './Overview/Overview';
import Header from './Navbar/Header';

function App(props) {
    useEffect(() => {
        props.getTransactions();
    }, []);

    return (
        <If condition={props.isTransactionsLoaded}>
            <Then>
                <Header/>
                <Container>
                    <Switch>
                        <Route exact path="/" component={ Operations }/>
                        <Route exact path="/overview" component={ Overview }/>
                    </Switch>
                </Container>
            </Then>
            <Else>
                <div className="d-flex spinner-wrapper justify-content-center align-content-center">
                    <Spinner animation="border" variant="primary" />
                </div>
            </Else>
        </If>
    )
}
const mapStateToProps = (state) => ({
    isTransactionsLoaded: state.transactions.isTransactionsLoaded,
});

export default connect(mapStateToProps, { getTransactions })(App);
