import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet, Dimensions, CheckBox } from 'react-native';

import Icons from 'react-native-vector-icons/Ionicons';

import Global from './util/Global';

const {height, width} = Dimensions.get('window');
export default class My extends Component{
    constructor(props){
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

    render(){
        return (
            <View style={{flex:1,backgroundColor: '#e5e5e5'}}>
                <View style={{backgroundColor: '#F5F5F5'}}>
                    <View style={{
                        flexDirection: 'row',
                        margin: 8,
                        backgroundColor: '#FFFFFF',
                        borderWidth: 1,
                        borderRadius: 6,
                        borderColor: '#CCCCCC'
                    }}>
                        <View style={{flex: 1}}>
                            <TextInput
                                style={{
                                    flex: 1,
                                    height: 30,
                                    backgroundColor: '#FFFFFF',
                                    borderColor: 'transparent',
                                    borderWidth: 1,
                                    borderRadius: 6,
                                    paddingTop: 0,
                                    paddingBottom: 0,
                                    paddingLeft: 8,
                                    paddingRight: 8
                                }}
                                placeholderTextColor={'#CCCCCC'}
                                placeholder={'搜索...'}
                                underlineColorAndroid={'transparent'}
                                multiline={false}
                                onChangeText={(text) => {
                                    this.setState({
                                        searchText: text
                                    })
                                }}
                                returnKeyType={'search'}
                                onSubmitEditing={this._searchView}
                                value={this.state.searchText}
                            />
                        </View>
                        <TouchableOpacity onPress={() => {
                            this._searchView()
                        }}>
                            <View style={{width: 25, height: 30, justifyContent: 'center'}}>
                                <Icons name={'ios-search'} size={25} color={'#CCCCCC'}/>
                            </View>
                        </TouchableOpacity>
                    </View>
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
    }
});

