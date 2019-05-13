import React, { Component } from 'react';
import {
	View, Text, TouchableOpacity, TextInput, Image, StyleSheet, Dimensions, CheckBox,
	DatePickerAndroid, Alert,
} from 'react-native';

import Global from './util/Global';
import Config from "./util/Config";
import MD5 from "./util/MD5";
import FetchUtil from "./util/FetchUtil";

const {height, width} = Dimensions.get('window');
//注册页面
export default class Regist extends Component{
	constructor(props){
		super(props);
		this.state = {
			userCode: '',
			password: '',
			confirmPwd: '',
			userName: '',
			phone: '',
			address: '',
			qq: '',
			birthday: '',
			sex: 0,//男 0 ，女 1
			role:'user',
		}
	}

	componentDidMount() {
	}
	//判断用户名是否重在
	_checkUserName(userCode,callback){
		let url=Config.CHECK_USER_CODE+"?token=lhy";
		let param={userCode:userCode};
		console.log(param);
		FetchUtil.httpGet(url,param,(data)=>{
			if(data){
				Alert.alert('提示', '用户名已经存在');
			}else{
				callback();
			}
		});
	}
	setNameAndPwd = (key,value) => {
		let tempBody = {};
		tempBody[key]=value;
		console.log(tempBody);
		this.setState(tempBody)
	};

	_regist = () => {
		console.log(this.state);
		let tmp = this.state;
		if(tmp.userCode.trim() == ''){alert('用户名不可为空');}
		else if(tmp.password.trim() == ''){alert('密码不可为空');}
		else if(tmp.password.trim() != tmp.confirmPwd.trim()){alert('密码不一致');}
		else if(tmp.phone.trim() == ''){alert('手机不可为空');}
		else if(tmp.userName.trim() == ''){alert('姓名不可为空');}
		// else if(tmp.address.trim() == ''){alert('地址不可为空');}
		// else if(tmp.qq.trim() == ''){alert('qq不可为空');}
		else if(tmp.birthday.trim() == ''){alert('生日不可为空');}
		else{
			//调注册接口
			this._checkUserName(this.state.userCode,()=>{
				let url=Config.REGISTER+"?token=lhy";
				let param=this.state;
				console.log(param);
				FetchUtil.httpGet(url,param,(data)=>{
					if(data){
						Global['user']=data;
						this.props.navigation.navigate('Home');
					}else{
						Alert.alert('提示', '注册失败！用户名可能重复');
					}
				});
			});
			//回调跳转登录页面
			//this.props.navigation.navigate('Home');
		}
	};
	render(){
		return (
			<View style={{flex:1,backgroundColor: '#e5e5e5',justifyContent: 'center', alignItems: 'center'}}>
				<View style={[styles.inputView,this.state.userCode != '' ? {borderBottomColor: '#d1d1d2'} : {borderBottomColor: '#d23a1f',}]}>
					<Image
						source={require('./images/icon/icon_user.png')}
						style={styles.icon}
					/>
					<TextInput
						placeholder='用户名'
						onChangeText={(text) => this.setNameAndPwd('userCode',text)}
						underlineColorAndroid={'transparent'}
						value={this.state.userCode}
						style={styles.inputText}
					/>
				</View>
				<View style={[styles.inputView,this.state.password != '' ? {borderBottomColor: '#d1d1d2'} : {borderBottomColor: '#d23a1f',}]}>
					<Image
						source={require('./images/icon/icon_password.png')}
						style={styles.icon}
					/>
					<TextInput
						placeholder='密码'
						secureTextEntry={true}
						onChangeText={(text) => this.setNameAndPwd('password',text)}
						underlineColorAndroid={'transparent'}
						value={this.state.password}
						style={styles.inputText}
					/>
				</View>
				<View style={[styles.inputView,this.state.confirmPwd != '' ? {borderBottomColor: '#d1d1d2'} : {borderBottomColor: '#d23a1f',}]}>
					<Image
						source={require('./images/icon/icon_password.png')}
						style={styles.icon}
					/>
					<TextInput
						placeholder='确认密码'
						secureTextEntry={true}
						onChangeText={(text) => this.setNameAndPwd('confirmPwd',text)}
						underlineColorAndroid={'transparent'}
						value={this.state.confirmPwd}
						style={styles.inputText}
					/>
				</View>
				<View style={[styles.inputView,this.state.userName != '' ? {borderBottomColor: '#d1d1d2'} : {borderBottomColor: '#d23a1f',}]}>
					<Image
						source={require('./images/icon/icon_user.png')}
						style={styles.icon}
					/>
					<TextInput
						placeholder='姓名'
						onChangeText={(text) => this.setNameAndPwd('userName',text)}
						underlineColorAndroid={'transparent'}
						value={this.state.userName}
						style={styles.inputText}
					/>
				</View>
				<View style={[styles.inputView,this.state.phone != '' ? {borderBottomColor: '#d1d1d2'} : {borderBottomColor: '#d23a1f',}]}>
					<Image
						source={require('./images/icon/phone_o.png')}
						style={styles.icon}
					/>
					<TextInput
						placeholder='手机'
						onChangeText={(text) => this.setNameAndPwd('phone',text)}
						underlineColorAndroid={'transparent'}
						value={this.state.phone}
						style={styles.inputText}
					/>
				</View>
				<View style={styles.inputView}>
					<Image
						source={require('./images/icon/position_o.png')}
						style={styles.icon}
					/>
					<TextInput
						placeholder='地址'
						onChangeText={(text) => this.setNameAndPwd('address',text)}
						underlineColorAndroid={'transparent'}
						value={this.state.address}
						style={styles.inputText}
					/>
				</View>
				<View style={styles.inputView}>
					<Image
						source={require('./images/icon/qq_o.png')}
						style={styles.icon}
					/>
					<TextInput
						placeholder='QQ'
						onChangeText={(text) => this.setNameAndPwd('qq',text)}
						underlineColorAndroid={'transparent'}
						value={this.state.qq}
						style={styles.inputText}
					/>
				</View>
				<TouchableOpacity style={[styles.inputView,this.state.birthday != '' ? {borderBottomColor: '#d1d1d2'} : {borderBottomColor: '#d23a1f',}]} onPress={()=>{
					try {
						DatePickerAndroid.open({
							// 要设置默认值为今天的话，使用`new Date()`即可。
							// 下面显示的会是2020年5月25日。月份是从0开始算的。
							date: new Date()
						}).then(({action, year, month, day})=>{
							if (action !== DatePickerAndroid.dismissedAction) {
								console.log(year,month,day);
								// 这里开始可以处理用户选好的年月日三个参数：year, month (0-11), day
								let tmpBirth = year + '-' + (month+1) + '-' + day;
								this.setState({
									birthday: tmpBirth
								})
							}
						});

					} catch ({code, message}) {
						console.warn('Cannot open date picker', message);
					}
				}}>
					<Image
						source={require('./images/icon/birthday.png')}
						style={styles.icon}
					/>
					<TextInput
						placeholder='生日'
						editable={false}
						underlineColorAndroid={'transparent'}
						value={this.state.birthday}
						style={styles.inputText}
					/>
				</TouchableOpacity>
				<View style={{
					width: width > 600 ? '50%' : '80%',
					flexDirection: 'row',
					justifyContent: 'flex-start',
					marginTop: 13
				}}>
					<CheckBox
						value={this.state.sex == 0 ? true : false}
						onValueChange={(newValue) => {
							let sex = newValue ? 0 : 1;
							this.setState({
								sex: sex
							})
						}}
					/>
					<View style={{flex:1,justifyContent: 'center'}}>
						<Text>{'男'}</Text>
					</View>
					<CheckBox
						value={this.state.sex == 1 ? true : false}
						onValueChange={(newValue) => {
							let sex = newValue ? 0 : 1;
							this.setState({
								sex: sex
							})
						}}
					/>
					<View style={{flex:1,justifyContent: 'center'}}>
						<Text>{'女'}</Text>
					</View>
				</View>
				<TouchableOpacity onPress={() => {
					this._regist();
				}} style={styles.btn}>
					<Text style={{
						fontSize: 15,
						color: '#fff'
					}}>注册</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => {
					this.props.navigation.navigate('Login');
				}} style={styles.btn}>
					<Text style={{
						fontSize: 15,
						color: '#fff'
					}}>返回登录</Text>
				</TouchableOpacity>
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
		borderBottomWidth: 1
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

