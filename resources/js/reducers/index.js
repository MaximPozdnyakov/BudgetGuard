import { combineReducers } from "redux";
import transactions from "./transactions";
import messages from "./messages";
import wallets from "./wallets";
import users from "./users";

export default combineReducers({
    transactions,
    messages,
    wallets,
    users
});
