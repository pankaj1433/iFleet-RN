import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Dimensions, Platform  } from 'react-native';
import { connect } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { width } = Dimensions.get('window');

//actions
import { generateOTP } from '../actions/login.action'

class RequestOTP extends Component {


    constructor () {
        super();
        this.state = {
            selectedMobile: "",
        }
    }

    componentWillReceiveProps(nextProps) {
        let {userName, mobiles} = nextProps.navigation.state.params;
        if(nextProps.otpStatus) {
            nextProps.navigation.navigate('EnterOTP', {
                mobiles: this.state.selectedMobile,
                userName: userName
            });
        }
    }

    requestOTP = () => {
        let payload = {
                        "number": this.state.selectedMobile, 
                        "username": this.props.navigation.state.params.userName 
                        };
        this.props.generateOTP(payload);
            
    }

    render() {
        let {userName, mobiles} = this.props.navigation.state.params;
        return(
            <View style={styles.container}>
                <View style={styles.fieldContainer}>
                    <View style={{flex:1}}>
                        <View style={[styles.fieldWrapper,{marginTop: 15}]}>
                            {
                                mobiles && mobiles.length &&
                                mobiles.map((mobile,index) => 
                                    <TouchableOpacity  
                                    key = {index}
                                    onPress={() => this.setState({
                                        selectedMobile: mobile.number
                                    })}
                                    >
                                    <Text style={styles.userfieldInput}>{mobile.number}</Text>
                                    </TouchableOpacity>
                                )
                            }
                            <Text style={styles.userfieldInput}>Selected: {this.state.selectedMobile}</Text>
                        </View>
                        <View style={{flex:1}}>
                            <TouchableOpacity onPress={this.requestOTP} style={styles.loginButton}>
                                <Text style={styles.loginButtontext}>
                                    Request OTP
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
        fontSize: 20,
        fontFamily: 'robotoLight',
        textAlign: 'center',
        height: 30,
        marginLeft: 20,
        paddingVertical: 30,
        letterSpacing: 0,
        paddingRight: 40,
    },
    fieldWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    generateOTP: (payload) => dispatch(generateOTP(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RequestOTP);