import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
const { width } = Dimensions.get('window');

//components
import Header from '../components/Header';
import List from '../components/List';
import Loader from '../components/Loader';

//actions
import { getAssetsList } from '../actions/assets.action';

class Assets extends Component {

    constructor() {
        super();
        this.state = {
            loader: true
        }
    }

    componentWillMount() {
        this.props.getAssetsList(this.props.navigation.state.params.operationID);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.assets && nextProps.assets.length) {
            this.setState({
                loader: false
            });
        }
    }

    listTapHandler = (title, operationID, assetID) => {
        this.props.navigation.navigate('Documents', {
            title, operationID, assetID
        })
    }

    renderList = (list) => {
        return list.map((listItem, index) => {
                let operationID = this.props.navigation.state.params.operationID;
                let {name, total_claims, id} = listItem;
                let voyage = total_claims == 0 ? 'No Vovages':
                            (total_claims == 1?total_claims+' Voyage':
                            total_claims+' Voyages');
                return <List 
                    key={index} 
                    handler={(title, operationID, assetID)=>this.listTapHandler(name, operationID, id)} 
                    title={name} 
                    byLine = {voyage}
                    paddingVertical = {25}
                />
            }
        )
    }
    
    render() {
        return(
            !this.state.loader ?
            <View style={styles.container}>
                <View style={styles.operationWrapper}>
                    <Header navigation={this.props.navigation} withBack={true} title={this.props.navigation.state.params.title} />
                    <ScrollView style={styles.scrollWrapper}>
                        {
                            this.props.assets && 
                            this.props.assets.length &&
                            this.props.assets[0].mobile_assets && 
                            this.props.assets[0].mobile_assets.length &&
                            <View>
                                <View style={styles.sectionTitle}>
                                    <Text style={styles.sectionTitleText}>Mobile Assets</Text>
                                </View>
                                {this.renderList(this.props.assets[0].mobile_assets)}
                            </View>
                        }
                        {
                            this.props.assets && 
                            this.props.assets.length &&
                            this.props.assets[0].stationary_assets && 
                            this.props.assets[0].stationary_assets.length &&
                            <View>
                                <View style={styles.sectionTitle}>
                                    <Text style={styles.sectionTitleText}>Stationary Assets</Text>
                                </View>
                                {this.renderList(this.props.assets[0].stationary_assets)}
                            </View>
                        }
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
    sectionTitleText: {
        marginLeft: 35,
        color: '#f0f2f3',
        fontSize: 18,
        fontFamily: 'robotoRegular'
    }
})

const mapStateToProps = (state) => ({
    assets: state.assets.data,
})

const mapDispatchToProps = (dispatch) => ({
    getAssetsList: (id) => dispatch(getAssetsList(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Assets);