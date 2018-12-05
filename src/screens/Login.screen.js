import React, { Component } from 'react';
import { View, Image, StatusBar, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions  } from 'react-native';
import { connect } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { width } = Dimensions.get('window');

//actions
import { login } from '../actions/login.action'
class Login extends Component {

    constructor() {
        super();
        this.state = {
            userName: 'eric.yong@senseinfosys.com',
            password: 'password'
        }
    }

    componentWillReceiveProps (nextProps) {
        if(nextProps.userType === 'old')    {
            //redirect to with mobile screen request OTP screen.
            nextProps.navigation.navigate('RequestOTP', {
                mobiles: nextProps.mobiles,
                userName: this.state.userName
            });
        }
        if(nextProps.userType === 'new') {
            //redirect to no mobile screen request OTP screen.
            
        }
    }

    login = () => {
        let payload = {
            "username": this.state.userName, 
            "password": this.state.password
        }
        this.props.login(payload);
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.logoWrapper}>
                    <Image resizeMode="contain" style={styles.logo} source={require('../assets/img/logo/logo.png')} />
                </View>
                
                <View style={styles.fieldContainer}>
                    <KeyboardAwareScrollView
                        enableAutomaticScroll={true}
                        enableOnAndroid = {true}
                        showsVerticalScrollIndicator = {false}
                    >
                    <View style={{flex:1}}>
                        <View style={styles.fieldWrapper}>
                            <Image resizeMode="contain" style={[{ width: 20, height: 20},styles.userfieldIcon]} source={require('../assets/img/user/user.png')} />
                            <TextInput
                                style={styles.userfieldInput}
                                onChangeText={(userName) => { this.setState({ userName }) }}
                                value={this.state.userName}
                                underlineColorAndroid={'transparent'}
                                placeholder="Username"
                                placeholderTextColor='#8798c5'
                                returnKeyType='next'
                                // onSubmitEditing={ (e) => { this.refs.passwordField.focus() } }
                            />
                        </View>
                        <View style={[styles.fieldWrapper,{marginTop: 15}]}>
                            <Image resizeMode="contain" style={[{ width: 20, height: 20},styles.userfieldIcon]} source={require('../assets/img/lock/lock.png')} />
                            <TextInput
                                ref='passwordField'
                                secureTextEntry = {true}
                                style={styles.userfieldInput}
                                onChangeText={(password) => { this.setState({ password }) }}
                                value={this.state.password}
                                underlineColorAndroid={'transparent'}
                                placeholder="Password"
                                placeholderTextColor='#8798c5'
                                returnKeyType='next'
                                // onSubmitEditing={ (e) => { this.refs.passwordField.focus() } }
                            />
                        </View>
                        <View>
                            <TouchableOpacity onPress={this.login} style={styles.loginButton}>
                                <Text style={styles.loginButtontext}>
                                    Login
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </KeyboardAwareScrollView>
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
    logoWrapper: {
        flex: 1,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        flex:1,
        alignSelf: 'center',
        width: width - 80,
    },
    fieldContainer: {
        flex: 1.5,
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
    mobiles: state.login.mobileNumbers,
    userType: state.login.userType,
})

const mapDispatchToProps = (dispatch) => ({
    login: (payload) => dispatch(login(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);