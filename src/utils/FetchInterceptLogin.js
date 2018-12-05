import React from 'react';
import { Platform } from 'react-native';
import { Constants } from 'expo';

import store from './../store/index';

const API_ROOT = 'http://52.221.210.155:8118' ;

let xhr = (url, options, localHeaders) => {

    let headers = options.headers||{
        'Content-Type': 'application/json'
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