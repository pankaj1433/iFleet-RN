import FetchIntercept from '../utils/FetchInterceptLogin';
import API from '../utils/ApiConstants';
import { AsyncStorage } from "react-native";

const checkEmail = (payload) => {
    return FetchIntercept(API.CHECK_EMAIL, { method: 'POST', body: JSON.stringify(payload) })
}

const mobileLogin = (payload) => {
    return FetchIntercept(API.LOGIN, { method: 'POST', body: JSON.stringify(payload) })
}

export const login = (payload) => {
    return (dispatch, getState) => {
        //check user email exist or not.
        checkEmail({"eml": payload.username}).then( res => {
            if(res.s) {
                //get mobile phones associated with the username if email is valid.
                mobileLogin(payload).then( res => {
                    if(res.username) {
                        //TODO : Confirm response when no mobile numebers are present in the API.
                        if(res.mobiles.length > 0)
                            dispatch({ type: 'SAVE_MOBILE' , data : res.mobiles, user: 'old' });
                        else
                            dispatch({ type: 'SAVE_MOBILE' , data : res.mobiles, user: 'new' });
                    }   
                    else {
                        console.log(res,'invalid response from Mobile Login');
                    }
                }).catch(err => {
                    console.log('Mobile Login Api Error', err);
                })
            }
            else {
                console.log(res,'invalid response from email check');
            }
        }).catch(err => {
            console.log('Email Api Error', err);
        })
    };
};

export const generateOTP = (payload) => {
    return (dispatch, getState) => {
        FetchIntercept(API.GENERATE_OTP, { method: 'POST', body: JSON.stringify(payload) }).then( res => {
            if(res.status) {
                dispatch({type: 'OTP_SENT'});
            }
            else {
                console.log(res,'invalid response from generate OTP');
            }
        }).catch(err => {
            console.log('generate OTP Api Error', err);
        })
    };
};

export const verifyOTP = (payload) => {
    return (dispatch, getState) => {
        FetchIntercept(API.VERIFY_OTP, { method: 'POST', body: JSON.stringify(payload) }).then( res => {
            
            if(Object.keys(res).length > 0) {
                for (let property in res) {
                    AsyncStorage.setItem(property, res[property]);
                }
                dispatch({type: 'LOG_IN', user: res});
            }
            else {
                console.log(res,'invalid response from Verify OTP');
            }
        }).catch(err => {
            console.log('Verify OTP Api Error', err);
        })
    };
};

export const silentLogin = (payload) => {
    return (dispatch, getState) => {
        dispatch({type: 'LOG_IN', user: payload});
    };
}

export const logout = () => ({
    type: 'LOG_OUT',
});