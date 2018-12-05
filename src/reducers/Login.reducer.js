const initialState = { 
    isLoggedIn: true,
    userDetails: '',
    mobileNumbers: [],
    userType: '',
    otpStatus: false
};

export default (state = initialState, action) => {
    switch(action.type) {
        case 'LOG_IN': {
            if (state.isLoggedIn === false) {
                return { ...state, isLoggedIn: true, userDetails: action.user }
            }
            return state;
        }
        break;
        case 'LOG_OUT': {
            if (state.isLoggedIn === true) {
                return { ...state, isLoggedIn: false }
            }
            return state;
        }
        break;
        case 'SAVE_MOBILE': {
            if (action.data) {
                return { ...state, mobileNumbers: action.data, userType: action.user }
            }
            return state;
        }
        break;
        case 'OTP_SENT': {
                return { ...state, otpStatus: true }
            return state;
        }
        break;
        default:
            return state;
    }
};