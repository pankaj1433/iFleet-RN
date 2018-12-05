import FetchIntercept from '../utils/FetchIntercept'
import API from '../utils/ApiConstants';

export const getDocumentsList = (assetID = 175 ,operationID = 25) => {
    return (dispatch, getState) => {
        FetchIntercept(`${API.LIST_DOCUMENTS}${assetID}/${operationID}`, { method: 'GET' })
        .then( res => {
            if (res.folder && res.folder.length > 0) {
                dispatch({ type: 'GET_DOCUMENT_LIST' , data : res.folder});
            }
        });
    };
};