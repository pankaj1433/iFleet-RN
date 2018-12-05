import React, { Component } from 'react';
import { View, Image, StatusBar, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions  } from 'react-native';
import { connect } from 'react-redux';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
import { shadowOne } from "../utils/shadowConfig";

const List = (props) =>{
    let {title, byLine, handler, paddingVertical} = props;
    return(
        title ?
        <View style={styles.shadowBox}>
            <TouchableOpacity onPress={()=>handler()} style={[styles.container,{paddingVertical: paddingVertical}]}>
                <View style={styles.leftWrapper}>
                    <Text style={styles.title}>{title}</Text> 
                    {
                        !!byLine && <Text style={styles.byline}>{byLine}</Text>
                    }
                </View>
                <Feather style={styles.rightIcon} name="chevron-right" size={35} color="#1b495a" />
            </TouchableOpacity>
        </View>
        :null
    );
}


const styles = StyleSheet.create({
    container: {
        width: width,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 35,
        paddingRight: 30,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#e5e5e7',
    },
    title: {
        color: '#222121',
        fontSize: 20,
        fontFamily: 'robotoRegular',
        marginBottom: 5
    },
    byline: {
        color: '#222121',
        fontSize: 13,
        fontFamily: 'robotoLight',
    },
    leftWrapper: {
        
    },
    rightIcon: {
    }
})

export default List;