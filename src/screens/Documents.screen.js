import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, ActivityIndicator  } from 'react-native';
import { connect } from 'react-redux';
const { width } = Dimensions.get('window');

//components
import Header from '../components/Header';
import DocumentList from '../components/DocumentList';
import Loader from '../components/Loader';

//actions
import {getDocumentsList} from '../actions/documents.action';
import {getDownloadToken} from '../actions/download.action';

class Documents extends Component {

    constructor() {
        super();
        this.state = {
            loader: true,
        }
    }

    componentWillMount() {
        let { assetID, operationID } = this.props.navigation.state.params;
        this.props.getDocumentsList(assetID, operationID);
    }

    componentWillReceiveProps(nextProps) {
        console.log('from will mount doc',nextProps);
        if(nextProps.documents && nextProps.documents.length) {
            this.setState({
                loader: false
            });
        }
    }

    listTapHandler = (id) => {
        console.log(id);
        this.props.getDownloadToken(id);
    }

    renderList = (list) => {
        return list.map((listItem, index) => 
        !listItem.deleted &&
            <DocumentList 
                key={index} 
                handler={(id)=>this.listTapHandler(listItem.id)} 
                title={listItem.name} 
                isDirectory = {listItem.directory || false}
                file = {listItem.file || null}
            />
        )
    }
    
    render() {
        let {documents, navigation} = this.props;
        return(
            !this.state.loader && documents ?
            <View style={styles.container}>
                <View style={styles.operationWrapper}>
                    <Header navigation={navigation} withBack={true} title={navigation.state.params.title} />
                    <ScrollView style={styles.scrollWrapper}>
                        <View>
                            <View style={styles.sectionTitle}>
                                <Text style={styles.sectionTitleText}>{documents.length || 0} Documents</Text>
                                <Text style={styles.downloadText}>Download All</Text>
                            </View>
                            {
                                documents.length &&
                                this.renderList(documents)
                            }
                        </View>
                    </ScrollView>
                </View>
            </View>
            :<Loader/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
    },
    operationWrapper: {
        flex:1,
        width: width,
        backgroundColor: '#fff',
    },
    sectionTitle: {
        width: width,
        flexDirection: 'row',
        height: 40,
        backgroundColor: '#2f6da1',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 35,
        paddingRight: 30,
    },
    sectionTitleText: {
        color: '#f0f2f3',
        fontSize: 16
    },
    downloadText: {
        color : 'rgb(134, 213, 165)',

    }
})

const mapStateToProps = (state) => ({
    documents: state.documents.documentList,
})

const mapDispatchToProps = (dispatch) => ({
    getDocumentsList: (assetID, operationID) => dispatch(getDocumentsList(assetID, operationID)),
    getDownloadToken: (documentID) => dispatch(getDownloadToken(documentID)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Documents);