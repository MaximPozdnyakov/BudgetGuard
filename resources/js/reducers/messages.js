const initialState = {
    isError: false,
    type: "",
    messages: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case "SET_MESSAGES":
            return {
                isError: action.payload.isError,
                type: action.payload.type,
                messages: action.payload.messages
            };
        default:
            return state;
    }
}
