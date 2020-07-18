export const setErrors = errors => (dispatch, getState) => {
    dispatch({
        type: "SET_MESSAGES",
        payload: {
            type: "error",
            descriptions: errors
        }
    });
};
