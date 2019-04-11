import React, {Component} from 'react';
import {View, Text, TouchableOpacity, TextInput, Image, StyleSheet, Dimensions, ScrollView} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Swiper from 'react-native-swiper';

import Global from './util/Global';

const {height, width} = Dimensions.get('window');
export default class Home extends Component {
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
            <View style={{flex: 1, backgroundColor: '#e5e5e5'}}>
                {/*搜索框*/}
                <View style={{
                    height: 30,
                    flexDirection: 'row',
                    margin: 8,
                    backgroundColor: '#FFFFFF',
                    borderWidth: 1,
                    borderRadius: 6,
                    borderColor: '#CCCCCC'
                }}>
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
                    <TouchableOpacity onPress={() => {
                        this._searchView()
                    }}>
                        <View style={{width: 25, height: 30, justifyContent: 'center'}}>
                            <Icons name={'ios-search'} size={25} color={'#CCCCCC'}/>
                        </View>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    {/*轮播图*/}
                    <View style={{height: 200}}>
                        <Swiper height={200} autoplay={true}
                                dot={null}
                                activeDot={null}
                                paginationStyle={{
                                    bottom: -23, left: null, right: 10
                                }} loop>
                            <View style={styles.slide}>
                                <Image resizeMode='stretch' style={styles.image}
                                       source={require('./images/banner1.jpg')}/>
                            </View>
                            <View style={styles.slide}>
                                <Image resizeMode='stretch' style={styles.image}
                                       source={require('./images/banner3.jpg')}/>
                            </View>
                            <View style={styles.slide}>
                                <Image resizeMode='stretch' style={styles.image}
                                       source={require('./images/banner2.jpg')}/>
                            </View>
                        </Swiper>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            backgroundColor: '#FFFFFF',
                            paddingTop:10,
                            paddingBottom:10
                        }}>
                        <TouchableOpacity style={{flex: 1}} onPress={() => {
                            // this.props.navigation.navigate('Topic')
                        }}>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Icon
                                    name='file-text'
                                    color='#12CBC4'
                                    size={26}
                                />
                                <Text style={{marginTop: 5}}>{'一日游'}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex: 1}} onPress={() => {
                            // this.props.navigation.navigate('Food')
                        }}>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <MaterialCommunityIcons
                                    name='food'
                                    color='#FFC312'
                                    size={30}
                                />
                                <Text style={{marginTop: 5}}>{'二日游'}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex: 1}} onPress={() => {
                            // this.props.navigation.navigate('Motion')
                        }}>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Icons
                                    name='ios-bicycle'
                                    color='#0652DD'
                                    size={30}
                                />
                                <Text style={{marginTop: 5}}>{'三日游'}</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
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
    slide: {
        // flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    image: {
        width: width,
        height: 220
    },
});

