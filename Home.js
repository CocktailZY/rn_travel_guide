import React, {Component} from 'react';
import {View, Text, TouchableOpacity, TextInput, Image, StyleSheet, Dimensions, ScrollView,
    TouchableHighlight, FlatList, ImageBackground
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Swiper from 'react-native-swiper';

import Global from './util/Global';
import FetchUtil from './util/FetchUtil';
import Config from './util/Config';
import Constant from './util/Constant';

const {height, width} = Dimensions.get('window');
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTypeSource: [],//分类列表
        }
    }

    componentDidMount() {
        //this._getTypes();
        this.setState({
            dataTypeSource: [
                {name:'古建筑',icon: require('./images/old_build.png'),id:3},
                {name:'公园',icon: require('./images/park.png'),id:4},
                {name:'美食',icon: require('./images/food.png'),id:5},
                {name:'园林',icon: require('./images/yuanlin.png'),id:6},
                {name:'寺庙',icon: require('./images/simiao.png'),id:7},
                {name:'海滩',icon: require('./images/beach.png'),id:8},
                {name:'山川',icon: require('./images/mountain.png'),id:9},
                {name:'游乐园',icon: require('./images/yuole.png'),id:10},
            ]
        })
    }
    //加载类型
_getTypes(){
     let url=Config.TYPE
    FetchUtil.httpGet(url,null,(data)=>{
        this.setState({
            dataTypeSource:data
        })
    })
}
    //ViewList

    _renderTypeListItem = ({item,index}) => {
        return (
            <TouchableHighlight
                activeOpacity={1}
                underlayColor='#FFFFFF'
                style={{
                    flex:1,
                    height:80,
                    marginLeft:10,
                    marginRight:10,
                    borderRadius:4,
                    borderWidth:1,
                    borderColor:'#d4d4d4',
                    backgroundColor:'#ffbe76'
                }}
                onPress={() => {
                    this.props.navigation.navigate('ViewList', {
                       typeId: item.id//类型id
                    });
                }}>
                <ImageBackground source={item.icon} style={{flex:1,height:80,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'#ffffff',fontSize: 20}}>{item.name}</Text>
                </ImageBackground>
            </TouchableHighlight>
        )
    };


    render() {
        const { dataTypeSource } = this.state;
        return (
            <View style={{flex: 1, backgroundColor: '#e5e5e5'}}>
                {/*搜索框*/}
                <View style={{
                    backgroundColor: '#f0f0f0',
                    height: 48,
                }}>

                    <TouchableOpacity style={{
                        flex: 1,
                        flexDirection: 'row',
                        margin: 8,
                        backgroundColor: '#FFFFFF',
                        borderWidth: 1,
                        borderRadius: 6,
                        borderColor: '#CCCCCC'
                    }} onPress={()=>{this.props.navigation.navigate('ViewList')}}>

                        <View style={{
                            flex: 1,
                            height: 30,
                            flexDirection: 'row',
                            backgroundColor: '#FFFFFF',
                            borderColor: 'transparent',
                            borderWidth: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 6,
                            paddingTop: 0,
                            paddingBottom: 0,

                        }}>
                            <Text style={{color: '#CCCCCC', fontSize: 15, lineHeight: 30, paddingRight: 10}}>{'搜索'}</Text>
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
                            this.props.navigation.navigate('PlanPublish',{
                                type:1
                            })
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
                            this.props.navigation.navigate('PlanPublish',{
                                type:2
                            })
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
                            this.props.navigation.navigate('PlanPublish',{
                                type:3
                            })
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
                    <View style={{flex:1,paddingTop:10,paddingBottom:10}}>
                        <FlatList
                            keyExtractor={(item, index) => String(index)}
                            data={dataTypeSource}
                            renderItem={this._renderTypeListItem}
                            refreshing={false}
                            ItemSeparatorComponent={() => <View style={{height:10}}/>}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        />
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

