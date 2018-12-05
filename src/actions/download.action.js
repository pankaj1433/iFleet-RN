import FetchIntercept from '../utils/FetchIntercept'
import API from '../utils/ApiConstants';
import { WebBrowser} from 'expo';

export const getDownloadToken = (documentID) => {
    return (dispatch) => {
        FetchIntercept(`${API.REQUEST_DOWNLOAD_TOKEN}${documentID}`, { method: 'GET' })
        .then( res => {
            if(Object.keys(res).length > 0) {
                console.log(res.token,'>>>>>>>res');
                WebBrowser.openBrowserAsync(`http://52.221.210.155:8118${API.DOWNLOAD_FILE}${res.token}`)
                    .then((resp) => {
                        console.log("Finished", resp);
                    })
                    .catch(error => {
                        alert.error(error);
                    });
            }
            else {
                console.log('File Not Found')
            }
        });
    };
};