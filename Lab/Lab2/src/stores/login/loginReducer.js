export const loginReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                error: null,
            };
        case "LOGIN_FAILURE":
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };
        case "LOGOUT":
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                error: null,
            };
        default:
            return state;
    }
};  
