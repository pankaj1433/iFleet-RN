import React, { Component } from 'react';
import {    View, 
            Text, 
            StyleSheet, 
            TouchableOpacity, 
            Dimensions, 
            ScrollView, 
            TouchableWithoutFeedback,
            ActivityIndicator  } from 'react-native';
import { connect } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import moment from "moment";

const { width } = Dimensions.get('window');

//components
import Header from '../components/Header';
import List from '../components/List'

//actions
import {logout} from '../actions/login.action'
import {getOperationList} from '../actions/operations.action'

class Operations extends Component {

    constructor() {
        super();
        this.state = {
            showLogout: false,
            loader: true
        }
    }

    componentWillMount() {
        this.props.getOperationList();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.operations && nextProps.operations.length) {
            this.setState({
                loader: false
            })    
            
        }
    }

    toggleLogout = () => {
        this.setState({
            showLogout: !this.state.showLogout
        })
    }

    listTapHandler = (id,title) => {
        this.props.navigation.navigate('Assets', {
            operationID: id,
            title
        })
    }

    renderList = (list) => {
        return list.map((listItem, index) => {
            let {from_time, to_time, name , id} = listItem
            let date = "";
            if(from_time)
                date = date + "From :"+ moment(from_time).format("MM/DD/YYYY");
            if(to_time)
                date = date + " to "+ moment(to_time).format("MM/DD/YYYY")
            return <List key={index} 
                        handler={(id,title)=>this.listTapHandler(id,name)} 
                        title={name} 
                        paddingVertical = {35}
                        byLine = {date}/>
        }
        )
    }
    
    render() {
        let {logout} = this.props;
        return(
            <TouchableWithoutFeedback onPress={()=>this.setState({showLogout: false})} style={{flex:1}}>
                {
                    !!!this.state.loader ?
                    <View style={styles.container}>
                        <View style={styles.operationWrapper}>
                            <Header title="My Operations" hasLogout={true} logoutHandler = {this.toggleLogout} />
                            <ScrollView style={styles.scrollWrapper}>
                                {this.renderList(this.props.operations)}
                            </ScrollView>
                            {   !!this.state.showLogout &&
                                <View style={styles.logoutWrapper}>
                                    <TouchableOpacity onPress={logout} style={styles.logoutButton}>
                                        <Feather style={styles.logoutIcon} name="log-out" size={25} color="#919394" />
                                        <Text style={{color: '#919394',marginLeft: 5}}>Logout</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
                    </View>
                    :
                    <View style={styles.container}>
                        <View style={styles.operationWrapper}>
                            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                                <ActivityIndicator size="large" color="#3688cc" />
                            </View>
                        </View>
                    </View>
                }
            </TouchableWithoutFeedback>
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
    logoutWrapper: {
        position: 'absolute',
        top: 63,
        right: 20,
        backgroundColor: '#fff'
    },
    logoutButton: {
        paddingHorizontal: 30,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#e5e5e5'
    }
})

const mapStateToProps = (state) => ({
    operations: state.operations.data,
})

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout()),
    getOperationList: () => dispatch(getOperationList())
})

export default connect(mapStateToProps, mapDispatchToProps)(Operations);