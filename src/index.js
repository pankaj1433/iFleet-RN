import React, { Component } from 'react';
import { View, AsyncStorage, Animated, Image, StatusBar, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

//custom components.
import {AppStack} from './navigation/AppStack';
import {LoginStack} from './navigation/LoginStack'

//actions
import {silentLogin} from './actions/login.action';

getUserDetails = async () => {
    try {
        let payload = {
            access_token : await AsyncStorage.getItem('access_token'),
            user_id : await AsyncStorage.getItem('user_id'),
            username : await AsyncStorage.getItem('username'),
            mobile :  await AsyncStorage.getItem('mobile'),
        }
        return payload
    }
    catch (error) {
        console.log('Error in fetching User Details from ASYNC Storage: ', error);
    }
};

class AppEntry extends Component {

    async componentDidMount() {
        let userDetails = await getUserDetails();
        if (userDetails && userDetails.access_token) {
          this.props.silentLogin(userDetails)
        }
    }

    render() {
        return(
            this.props.loggedIn ?
            <View style={styles.root}>
                <AppStack/>
            </View>:
            <View style={styles.root}>
                <LoginStack/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        // marginTop : StatusBar.currentHeight,
        marginTop: 20,
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

const mapStateToProps = (state) => ({
    loggedIn: state.login.isLoggedIn,
})

const mapDispatchToProps = (dispatch) => ({
    silentLogin: (payload) => dispatch(silentLogin(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AppEntry);