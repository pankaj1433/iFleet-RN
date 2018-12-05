import FetchIntercept from '../utils/FetchIntercept'
import API from '../utils/ApiConstants';

export const getAssetsList = (operationID = 25) => {
    return (dispatch, getState) => {
        FetchIntercept(`${API.LIST_OPERATIONS}${operationID}`, { method: 'GET' })
        .then( res => {
            if (res.data && res.data.length > 0) {
                dispatch({ type: 'GET_ASSETS' , data : res.data});
            }
        });
    };
};