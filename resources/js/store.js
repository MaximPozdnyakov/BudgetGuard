import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {
    user: { user: {}, isUserAuthenticated: false, isUserLoaded: false },
    wallets: { wallets: [], isWalletsLoaded: false, currentWallet: {} },
    transactions: {
        transactions: [],
        isTransactionsLoaded: false,
        transactionsFilters: {}
    }
};

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
