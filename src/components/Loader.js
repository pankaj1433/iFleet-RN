import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
const { width } = Dimensions.get('window');

class Loader extends Component {
    
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.operationWrapper}>
                    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                        <ActivityIndicator size="large" color="#3688cc" />
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
    operationWrapper: {
        width: width,
        backgroundColor: '#fff',
        flex:1,
    },
    sectionTitle: {
        width: width,
        flexDirection: 'row',
        height: 45,
        backgroundColor: '#2f6da1',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#344e94'
    },
})

const mapStateToProps = (state) => ({
    // assets: state.assets.data,
})

const mapDispatchToProps = (dispatch) => ({
    // getAssetsList: (id) => dispatch(getAssetsList(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Loader);