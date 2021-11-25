const initialState = {
    isError: false,
    type: "",
    messages: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case "SET_MESSAGES":
            return action.payload;
        default:
            return state;
    }
}
