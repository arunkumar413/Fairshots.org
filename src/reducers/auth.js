const userSaved = localStorage.getItem("user");

const INITIAL_STATE = {
    user: !(userSaved === "undefined" || userSaved === null) ? JSON.parse(userSaved) : {},
    errorMessage: "",
    notification: "",
    isAuthenticated: !(userSaved === "undefined" || userSaved === null)
};

export default function auth(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "AUTH_ERROR": {
            console.log(action.payload);
            return Object.assign({}, state, {
                user: {},
                errorMessage: action.payload,
                isAuthenticated: false
            });
        }
        case "AUTH_SUCCESS": {
            console.log(action.payload);
            return Object.assign({}, state, {
                user: action.payload,
                isAuthenticated: true,
                errorMessage: ""
            });
        }
        case "AUTH_FORGOT": {
            return Object.assign({}, state, {
                notification: "An e-mail was sent with a link to reset your password"
            });
        }
        case "AUTH_RESETPASSWORD": {
            return Object.assign({}, state, {
                notification: action.payload.msg
            });
        }
        case "AUTH_LOGOUT": {
            localStorage.removeItem("user");
            return Object.assign({}, state, {
                user: {},
                isAuthenticated: false,
                errorMessage: ""
            });
        }
        case "AUTH_RESETMESSAGES": {
            return Object.assign({}, state, {
                notification: "",
                errorMessage: ""
            });
        }
        default:
            return state;
    }
}
