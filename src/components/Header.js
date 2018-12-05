import React, { Component } from 'react';
import { View, Image, StatusBar, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions  } from 'react-native';
import { connect } from 'react-redux';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const Header = (props) =>{
    let {title, withBack, navigation,hasLogout, logoutHandler} = props;
    return(
        title ?
        <View style={styles.container}>
            {
                withBack &&
                <Feather onPress={()=>navigation.goBack()} style={styles.backIcon} name="chevron-left" size={30} color="#fff" />
            }
            {
                withBack ? 
                <Text style={styles.title}>{title}</Text> :
                <Text style={[styles.title,{marginLeft: 35}]}>{title}</Text> 
            }
            {
                hasLogout && 
                <View style={{flex:1,alignItems:'flex-end'}}>
                    <Feather onPress={()=>logoutHandler()} style={styles.rightMenu} name="more-vertical" size={28} color="#f0f2f3" />
                </View>
            }
        </View>
        :null
    );
}


const styles = StyleSheet.create({
    container: {
        width: width,
        flexDirection: 'row',
        height: 65,
        backgroundColor: '#3688cc',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingRight: 20,
        // marginTop: 20,
    },
    title: {
        color: '#f0f2f3',
        fontSize: 20,
        fontFamily: 'robotoRegular'
    },
    backIcon: {
        paddingRight: 5,
        paddingVertical: 5,
    },
    rightMenu: {
        paddingRight: 5,
        paddingVertical: 5,
        color: '#fff',
        alignContent: 'flex-end'
    }
})

export default Header;