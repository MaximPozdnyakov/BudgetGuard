import React from 'react'

import { connect } from "react-redux";
import { Provider } from "react-redux";
import store from "./store";
import { getTransactions } from "./actions/transactions";

function Spinner() {
  return (
    <div>
      
    </div>
  )
}

export default connect(mapStateToProps, { getTransactions })(App);

