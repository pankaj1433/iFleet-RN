import FetchIntercept from '../utils/FetchIntercept'
import API from '../utils/ApiConstants';

export const getOperationList = () => {
    return (dispatch, getState) => {
        FetchIntercept(API.LIST_OPERATIONS, { method: 'GET' })
        .then( res => {
            if (res.data && res.data.length > 0) {
                dispatch({ type: 'GET_OPERATIONS' , data : res.data});
            }
        });
    };
};