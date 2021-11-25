import { combineReducers } from "redux";
import transactions from "./transactions";
import messages from "./messages";
import wallets from "./wallets";
import user from "./users";

export default combineReducers({
    transactions,
    messages,
    wallets,
    user
});
