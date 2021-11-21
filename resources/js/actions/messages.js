export const setMessage = ({ messages, type, isError }) => dispatch => {
    dispatch({ type: "SET_MESSAGES", payload: { messages, type, isError } });
};
