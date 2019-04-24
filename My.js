import React, {Component} from 'react';
import {View, Text, TouchableOpacity, TextInput, Image, StyleSheet, Dimensions, CheckBox,
    TouchableWithoutFeedback, ScrollView
} from 'react-native';

import Icons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Global from './util/Global';
import Header from "./common/Header";

const {height, width} = Dimensions.get('window');
export default class My extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#ffffff'}}>
                <Header
                    headLeftFlag={false}
                    onPressBackBtn={() => {
                        this.props.navigation.goBack();
                    }}
                    backTitle={'返回'}
                    title={'我的'}
                />
                <ScrollView style={{flex:1,padding:10,marginBottom:10}}>
                    <TouchableWithoutFeedback
                        style={{flex: 1}}
                        onPress={() => {
							this.props.navigation.navigate('MyInfo');
                        }}>
                        <View style={[styles.jobBtn, {
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#009688',
                        }]}>
                            <FontAwesome name={'info-circle'} color={'#FFFFFF'} size={26}/>
                            <Text style={styles.jobBtnText}>我的个人信息</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        style={{flex: 1}}
                        onPress={() => {
                            this.props.navigation.navigate('MyViewList');
                        }}>
                        <View style={[styles.jobBtn, {
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#009688',
                            marginTop: 10
                        }]}>
                            <FontAwesome name={'search'} color={'#FFFFFF'} size={26}/>
                            <Text style={styles.jobBtnText}>我浏览的景点</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        style={{flex: 1}}
                        onPress={() => {
                            this.props.navigation.navigate('MyCommentGuideList');
                        }}>
                        <View style={[styles.jobBtn, {
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#009688',
                            marginTop: 10
                        }]}>
                            <FontAwesome name={'commenting-o'} color={'#FFFFFF'} size={26}/>
                            <Text style={styles.jobBtnText}>我评论的攻略</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        style={{flex: 1}}
                        onPress={() => {
                            this.props.navigation.navigate('MyZanGuideList');
                        }}>
                        <View style={[styles.jobBtn, {
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#009688',
                            marginTop: 10
                        }]}>
                            <FontAwesome5 name={'thumbs-up'} color={'#FFFFFF'} size={30}/>
                            <Text style={styles.jobBtnText}>我点赞的攻略</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        style={{flex: 1}}
                        onPress={() => {
                            this.props.navigation.navigate('MyGuideList');
                        }}>
                        <View style={[styles.jobBtn, {
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#009688',
                            marginTop: 10,
                            marginBottom: 10
                        }]}>
                            <MaterialIcons name={'publish'} color={'#FFFFFF'} size={30}/>
                            <Text style={styles.jobBtnText}>我发布的攻略</Text>
                        </View>
                    </TouchableWithoutFeedback>
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
    jobBtn: {
        flexDirection:'row',
        height: 120,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.8
    },
    jobBtnText: {
        fontSize: 16,
        color: 'white',
        marginLeft: 10
    }
});

