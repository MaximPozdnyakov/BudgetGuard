import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import rootReducer from "./reducers";
import { getInitialDateRange } from "./helpers/transactions";

const initialState = {
    messages: { messages: "", type: "", isError: false },
    user: { user: {}, isUserAuthenticated: false, isUserLoaded: false },
    wallets: { wallets: [], isWalletsLoaded: false, currentWallet: {} },
    transactions: {
        transactions: [],
        isTransactionsLoaded: false,
        filters: {
            search: "",
            moneyRange: [0, 0],
            categories: [],
            dateRange: getInitialDateRange()
        }
    }
};

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
