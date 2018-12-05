const configInitialState = {
    data: ''
};

export const setConfig = (state = configInitialState, action) => {
    switch(action.type) {
        case 'SET_CONFIG':
            if ( action.data !== '' ) {
                return { ...state, data: action.data }
            }
            else {
                return state;
            }
        default: 
            return state;
    }
};