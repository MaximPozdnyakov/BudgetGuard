import { combineReducers } from "redux";
import transactions from "./transactions";
import messages from "./messages";

export default combineReducers({
    transactions,
    messages
});
