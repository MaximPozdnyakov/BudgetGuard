import React from 'react'

import { Route, Switch } from 'react-router-dom';

import { Container } from 'react-bootstrap';

import Operations from './Operations/Operations';
import Overview from './Overview/Overview';
import Nav from './Navbar/Nav';

function App() {
    return (
        <>
            <Nav/>
            <Container>
                <Switch>
                    <Route exact path="/" component={ Operations }/>
                    <Route exact path="/overview" component={ Overview }/>
                </Switch>
            </Container>
        </>
    )
}

export default App
