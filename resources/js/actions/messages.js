export const setMessage = (messages, type, isError) => (dispatch, getState) => {
    dispatch({
        type: "SET_MESSAGES",
        payload: {
            isError,
            type,
            messages
        }
    });
};
