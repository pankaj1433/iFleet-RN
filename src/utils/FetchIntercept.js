import React from 'react';
import { Platform } from 'react-native';
import { Constants } from 'expo';

import store from './../store/index';

const API_ROOT = 'http://52.221.210.155:8118' ;

let xhr = (url, options, localHeaders) => {
    let userDetails = store.getState()["login"]["userDetails"];

    let headers = options.headers||{
        'Content-Type': 'application/json',
        // "authorization": userDetails["access_token"],
        // "uid" : userDetails["user_id"],
        "authorization": "98632dd7bc25454bb51cc73acc13e397",
        "uid" : "420b3beb-a66a-49e6-87de-90d2a9c317b3",
    };

    let reqBody = {
        method: options.method || "POST",
        headers: headers
    };

    if(options.method.toLowerCase() !== 'get') {
            reqBody['body'] = options.body;
    }

    console.log(API_ROOT + url,'<<<<reqBody>>>>>', reqBody)
    return fetch(API_ROOT + url, reqBody)
            .then(handleResponse)
            .catch(handleCommonError)
};

let handleResponse = response => {
    if(response.status === 200) {
        return response.json();
    }
    // store.dispatch({ type: 'SHOW_ALERT', showAlert: true, alertType: 'error' });
    return {};
}
let handleCommonError = err => {
    console.log('Common Fetch Error', err);
    // store.dispatch({ type: 'SHOW_ALERT', showAlert: true, alertType: 'error' });
};

const fetchIntercept = (url, options) => {
    return xhr(url, options);
};

export default fetchIntercept;