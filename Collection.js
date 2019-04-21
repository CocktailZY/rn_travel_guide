import React, {Component} from 'react';
import {View, Text, TouchableOpacity, TextInput, Image, StyleSheet, Dimensions, CheckBox,
    TouchableWithoutFeedback
} from 'react-native';

import Icons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Header from "./common/Header";

const {height, width} = Dimensions.get('window');
export default class Collection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
        }
    }

    componentDidMount() {

    }

    _searchView = () => {
        //调模糊查询景点接口
    };

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#ffffff'}}>
                <Header
                    headLeftFlag={false}
                    onPressBackBtn={() => {
                        this.props.navigation.goBack();
                    }}
                    backTitle={'返回'}
                    title={'我的收藏'}
                />
                <View style={{flex:1,padding:10}}>
                    <TouchableWithoutFeedback
                        style={{flex: 1, marginTop: 10}}
                        onPress={() => {
                            this.props.navigation.navigate('ViewCollection',{
                                type:1
                            });
                        }}>
                        <View style={[styles.jobBtn, {
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#009688',
                            marginTop: 10
                        }]}>
                            <MaterialIcons name={'streetview'} color={'#FFFFFF'} size={30}/>
                            <Text style={styles.jobBtnText}>我收藏的景点</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        style={{flex: 1, marginTop: 10}}
                        onPress={() => {
                            this.props.navigation.navigate('ViewCollection',{
                                type:1
                            });
                        }}>
                        <View style={[styles.jobBtn, {
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#009688',
                            marginTop: 10
                        }]}>
                            <FontAwesome5 name={'podcast'} color={'#FFFFFF'} size={30}/>
                            <Text style={styles.jobBtnText}>我收藏的攻略</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        style={{flex: 1, marginTop: 10}}
                        onPress={() => {
                            this.props.navigation.navigate('PlanCollection',{
                                type:2
                            });
                        }}>
                        <View style={[styles.jobBtn, {
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#009688',
                            marginTop: 10
                        }]}>
                            <FontAwesome5 name={'route'} color={'#FFFFFF'} size={30}/>
                            <Text style={styles.jobBtnText}>我收藏的路线</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ffffff',//#F5FCFF
    },
    welcome: {
        alignItems: 'center',
        marginBottom: 30,
    },
    inputView: {
        width: width > 600 ? '50%' : '80%',
        height: width > 600 ? 80 : 50,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#d1d1d2',
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    inputText: {
        flex: 1,
        fontSize: 14,
        color: '#999',
        padding: 0,
        marginTop: 13,
        marginBottom: 13,
    },
    btn: {
        width: width > 600 ? '50%' : '80%',
        borderRadius: 4,
        backgroundColor: '#009688',
        height: width > 600 ? 50 : 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    jobBtn: {
        height: 120,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.8
    },
    jobBtnText: {
        fontSize: 16,
        color: 'white'
    }
});

