import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet, Dimensions, CheckBox,Alert } from 'react-native';

import Global from './util/Global';
import FetchUtil from './util/FetchUtil';
import Config from './util/Config';
import MD5 from './util/MD5';
const {height, width} = Dimensions.get('window');
export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            pwd: '',
            confirmText: '',
            confirm: ''+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10),
            autoLogin: true
        }
    }

    componentDidMount() {
        //console.log(this.state.confirm);
		//this.setState({
		//	confirmText: this.state.confirm
		//})
    }

    setNameAndPwd = (key,value) => {
        switch (key) {
            case 'name': this.setState({name:value}); break;
            case 'pwd': this.setState({pwd:value}); break;
            default: this.setState({confirmText:value});
        }
    };

    _login = () => {
        console.log(this.state.confirmText);
        console.log(this.state.confirm);
        if(this.state.confirmText != this.state.confirm){
            alert('验证不通过');
        }
        else{
            let url=Config.LOGIN+"?token=lhy";
            let param={
                userCode:this.state.name,
                password:MD5.hex_md5(this.state.pwd)
            }
            FetchUtil.httpGet(url,param,(data)=>{
                if(data.status){
                    Global['user']=data.user;
                    this.props.navigation.navigate('Home')
                }else{
                    Alert.alert('提示', '用户名密码错误');
                }
            });
            //存全局变量

        }
    };

    render(){
        return (
            <View style={{flex:1,backgroundColor: '#e5e5e5',justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.inputView}>
                    <Image
                        source={require('./images/icon/icon_user.png')}
                        style={styles.icon}
                    />
                    <TextInput
                        ref={(TextInput) => {
                            this._userNameBox = TextInput;
                        }}
                        placeholder='用户名'
                        onChangeText={(text) => this.setNameAndPwd('name',text)}
                        underlineColorAndroid={'transparent'}
                        value={this.state.name}
                        style={styles.inputText}
                    />
                </View>
                <View style={styles.inputView}>
                    <Image
                        source={require('./images/icon/icon_password.png')}
                        style={styles.icon}
                    />
                    <TextInput
                        ref={(TextInput) => {
                            this._pwdBox = TextInput;
                        }}
                        placeholder='密码'
                        secureTextEntry={true}
                        onChangeText={(text) => this.setNameAndPwd('pwd',text)}
                        underlineColorAndroid={'transparent'}
                        value={this.state.pwd}
                        style={styles.inputText}
                    />
                </View>
                <View style={styles.inputView}>
                    <Image
                        source={require('./images/icon/work_plat_o.png')}
                        style={styles.icon}
                    />
                    <TextInput
                        ref={(TextInput) => {
                            this._pwdConfirmTextBox = TextInput;
                        }}
                        placeholder={'验证码'}
                        onChangeText={(text) => this.setNameAndPwd('confirmText',text)}
                        underlineColorAndroid={'transparent'}
                        value={this.state.confirmText}
                        style={styles.inputText}
                    />
                    <View style={{
                        width:50,
                        height:40,
                        borderWidth: 1,
                        borderColor: '#009688',
                        justifyContent:'center',
                        alignItems:'center'
                    }}>
                        <Text style={{color:'#009688',fontSize:20}}>
                            {this.state.confirm}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => {
                    this._login()
                }} style={styles.btn}>
                    <Text style={{
                        fontSize: 15,
                        color: '#fff'
                    }}>登录</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate('Regist');
                }} style={styles.btn}>
                    <Text style={{
                        fontSize: 15,
                        color: '#fff'
                    }}>注册</Text>
                </TouchableOpacity>
                <View style={{
                    width: width > 600 ? '50%' : '80%',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    marginTop: 13
                }}>
                    <CheckBox
                        value={this.state.autoLogin}
                        onValueChange={(newValue) => {
                            this.setState({
                                autoLogin: newValue
                            })
                        }}
                    />
                    <View style={{flex:1,justifyContent: 'center'}}>
                        <Text>{'记住密码'}</Text>
                    </View>
                    <View style={{justifyContent: 'center',paddingRight: 10}}>
                        <Text onPress={()=>{
							Global.role = 'youke';
                        	this.props.navigation.navigate('FootTab');
                        }}>{'我是游客'}</Text>
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
        alignItems: 'center',
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

