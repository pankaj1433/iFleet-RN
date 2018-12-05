import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView  } from 'react-native';
import { connect } from 'react-redux';
const { width } = Dimensions.get('window');

//components
import Header from '../components/Header';
import List from '../components/List'

class Voyage extends Component {

    listTapHandler = (title) => {
        this.props.navigation.navigate('Documents', {
            title
        })
    }

    renderList = (list) => {
        return list.map((listItem, index) => 
            <List 
                key={index} 
                handler={(title)=>this.listTapHandler(listItem.title)}
                paddingVertical = {35} 
                title={listItem.title}/>
        )
    }
    
    render() {

        const data = [
            {title: 'Voyage #1', date: 'From : 27/03/2018   to   30/03/2018'},
            {title: 'Voyage #2', date: 'From : 27/03/2018   to   30/03/2018'},
            {title: 'Voyage #3', date: 'From : 27/03/2018   to   30/03/2018'},
        ]

        return(
            <View style={styles.container}>
                <View style={styles.operationWrapper}>
                    <Header 
                        navigation={this.props.navigation} 
                        withBack={true} 
                        title={this.props.navigation.state.params.title} 
                    />
                    <ScrollView style={styles.scrollWrapper}>
                        <View>
                            <View style={styles.sectionTitle}>
                                <Text style={styles.sectionTitleText}>{this.props.navigation.state.params.subTitle}</Text>
                            </View>
                            {this.renderList(data)}
                        </View>
                    </ScrollView>
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
        flex:1,
        width: width,
        backgroundColor: '#fff',
    },
    sectionTitle: {
        width: width,
        flexDirection: 'row',
        height: 40,
        backgroundColor: '#2f6da1',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    sectionTitleText: {
        marginLeft: 35,
        color: '#f0f2f3',
        fontSize: 18,
        fontFamily: 'robotoRegular'
    }
})

const mapStateToProps = (state) => ({
    // loggedIn: state.login.isLoggedIn,
})

const mapDispatchToProps = (dispatch) => ({
    // login: () => dispatch(login()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Voyage);