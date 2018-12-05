import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, Platform  } from 'react-native';
import { connect } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { width } = Dimensions.get('window');

//actions
import { verifyOTP } from '../actions/login.action'

class EnterOTP extends Component {


    constructor () {
        super();
        this.state = {
            otp: "",
        }
    }

    componentWillReceiveProps(nextProps) {
        // let {userName, mobiles} = nextProps.navigation.state.params;
        // if(nextProps.otpStatus) {
        //     let payload = {
        //                     "number": mobiles, 
        //                     "username": userName, 
        //                     "otp": "847065", 
        //                     "deviceid": "12345", 
        //                     "devicename": "razer phone!", 
        //                     "deviceos": Platform.OS, 
        //                     "deviceosversion": Platform.Version 
        //                 }
        //     alert('OTP Sent');
        // }
    }

    verifyOTP = () => {
        let {userName, mobiles} = this.props.navigation.state.params;
        let payload = {
                            "number": mobiles, 
                            "username": userName, 
                            "otp": this.state.otp, 
                            "deviceid": "12345", 
                            "devicename": "razer phone!", 
                            "deviceos": Platform.OS, 
                            "deviceosversion": Platform.Version 
                        }
        this.props.verifyOTP(payload);
            
    }

    render() {
        let {userName, mobiles} = this.props.navigation.state.params;
        return(
            <View style={styles.container}>
                <View style={styles.fieldContainer}>
                    <View style={{flex:1}}>
                        <View style={[styles.fieldWrapper,{marginTop: 15}]}>
                            <TextInput
                                ref='otpField'
                                style={styles.userfieldInput}
                                onChangeText={(otp) => { this.setState({ otp }) }}
                                value={this.state.otp}
                                underlineColorAndroid={'transparent'}
                                placeholder="Enter OTP"
                                placeholderTextColor='#8798c5'
                                returnKeyType='next'
                            />
                        </View>
                        <View style={{flex:1}}>
                            <TouchableOpacity onPress={this.verifyOTP} style={styles.loginButton}>
                                <Text style={styles.loginButtontext}>
                                    Verify OTP
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
    },
    fieldContainer: {
        backgroundColor: '#fff',
        flex: 1,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userfieldInput: {
        color: '#8798c5',
        flex: 0.9,
        fontSize: 20,
        fontFamily: 'robotoLight',
        textAlign: 'center',
        height: 30,
        marginLeft: 20,
        letterSpacing: 0,
        paddingRight: 40,
    },
    fieldWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width - 80,
        borderBottomColor: '#e7e7e7', 
        borderBottomWidth: 1 ,
        paddingBottom: 5,
        marginBottom: 20,
    },
    userfieldIcon: {
        flex: 0.1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginButtontext: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'robotoRegular',
    },
    loginButton: {
        paddingVertical: 15,
        width: width - 80,
        alignItems: 'center',
        backgroundColor: '#1c5a94',
        justifyContent: 'center',
        marginTop: 60,
        shadowOffset: {  
            width: 1,  
            height: 1,  
        }, 
        shadowColor: 'black',
        shadowOpacity: 0.3, 
        elevation: 2
    }
})

const mapStateToProps = (state) => ({
    otpStatus: state.login.otpStatus,
})

const mapDispatchToProps = (dispatch) => ({
    verifyOTP: (payload) => dispatch(verifyOTP(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EnterOTP);