import React, { Component } from 'react';
import { View, Image, StatusBar, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions  } from 'react-native';
import { connect } from 'react-redux';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

//utility comonents.
import {dataFilter} from '../utils/Filters';

class DocumentList extends Component {

    constructor() {
        super();
        this.state = {
            optionVisible: false
        }
    }

    openOptions = () => {
        this.setState({
            optionVisible: true
        })
    }

    closeOptions = () => {
        this.setState({
            optionVisible: false
        })
    }

    render () {
        let {title, handler, paddingVertical, isDirectory, file} = this.props;
        return(
            title ?
            <View style={styles.shadowBox}>
                <TouchableOpacity onPress={()=>handler()} style={[styles.container,{paddingVertical: 30}]}>
                    <View style={styles.leftWrapper}>
                        <View style={{marginRight: 10}}>
                            {isDirectory ?
                                <Feather name="folder" size={25} color="#1b495a" />
                                :<Feather name="file" size={25} color="#1b495a" />
                            } 
                        </View>
                        <View>
                            <Text style={styles.title}>{title}</Text>
                            {!isDirectory && <Text style={styles.byline}>{dataFilter(file.filesize)}</Text>}
                        </View>
                        
                    </View>
                    <Feather onPress = {()=>this.openOptions()} style={styles.rightIcon} name="more-horizontal" size={30} color="#1b495a" />
                    {
                        this.state.optionVisible && 
                        <View style={styles.optionWrapper}>
                            <TouchableOpacity style={styles.optionButton}>
                                <Feather name="edit-3" size={30} color="#fff" />
                                <Text style={styles.optionText}>Rename</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.optionButton}>
                                <Feather name="download" size={30} color="#fff" />
                                <Text style={styles.optionText}>Download</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.optionButton}>
                                <Feather name="trash" size={30} color="#fff" />
                                <Text style={styles.optionText}>Delete</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress = {this.closeOptions} style={styles.optionButton}>
                                <View style={{flex:1,justifyContent: 'center', alignItems: 'center'}}>
                                    <Feather name="x" size={42} color="#fff" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    }
                </TouchableOpacity>
            </View>
            :null
        );
    }
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
        fontSize: 17,
        fontFamily: 'robotoRegular',
        marginBottom: 5
    },
    byline: {
        color: '#222121',
        fontSize: 12,
        fontFamily: 'robotoLight',
    },
    leftWrapper: {
        flexDirection: 'row',
        width: width - 130,
        paddingRight: 15
    },
    optionWrapper: {
        backgroundColor: '#3688cc99',
        height: 80,
        width: width-35,
        position: 'absolute',
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionButton: {
        backgroundColor: '#3688cc99',
        height: 80,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    optionText: {
        fontFamily: 'robotoRegular',
        fontSize: 15,
        color: '#fff',
        textAlign: 'center',
    }
})

export default DocumentList;