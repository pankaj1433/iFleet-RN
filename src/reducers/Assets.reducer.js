const initialState = { 
    data: [],
};

export default (state = initialState, action) => {
    switch(action.type) {
        case 'GET_ASSETS': {
                return { ...state, data: action.data }
            return state;
        }
        break;
        default:
            return state;
    }
};