const initialState = { 
    documentList: [],
};

export default (state = initialState, action) => {
    switch(action.type) {
        case 'GET_DOCUMENT_LIST': {
                return { ...state, documentList: action.data }
            return state;
        }
        break;
        default:
            return state;
    }
};