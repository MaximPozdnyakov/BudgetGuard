const initialState = {
    messages: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case "SET_MESSAGES":
            return {
                messages: action.payload
            };
        default:
            return state;
    }
}
