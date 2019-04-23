import React, {Component} from "react";
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	ScrollView
} from "react-native";
import Header from "./common/Header";
import Icons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import Global from './util/Global';
export default class GuideList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userInfo: {
				name: "",
				phone: "",
				address: "",
				qq: "",
				birthday: "",
				sex:0,//男 0 ，女 1
			}
		};
	}

	componentDidMount() {
        if(Global.user &&Global.user.id){
        	this.setState({
                userInfo:{
                    name: Global.user.userName,
                    phone: Global.user.phone,
                    address: Global.user.address,
                    qq:  Global.user.qq,
                    birthday: Global.user.birthday,
                    sex: Global.user.sex,//男 0 ，女 1
                }
			})

        }else{
            this.props.navigation.navigate('Login');
            alert('请先登录');
        }
	}
	componentWillUnmount() {

	}

	render() {
		const { userInfo } = this.state;
		return (
			<View style={styles.container}>
				<Header
					headLeftFlag={true}
					onPressBackBtn={() => {
						this.props.navigation.goBack();
					}}
					backTitle={'返回'}
					title={'个人信息'}
				/>
				<View style={{flex:1,padding:10}}>
					<View style={styles.menuList}>
						<View style={styles.icons}>
							<Icons name={'ios-person'} size={22} color={'#8d8d8d'}/>
						</View>
						<View style={[styles.menuListText, {borderTopColor: 'transparent'}]}>
							<Text style={styles.settingText}>{userInfo.name}</Text>
						</View>
					</View>
					<View style={styles.menuList}>
						<View style={styles.icons}>
							<Icons name={'ios-phone-portrait'} size={22} color={'#8d8d8d'}/>
						</View>
						<View style={[styles.menuListText]}>
							<Text style={styles.settingText}>{userInfo.phone}</Text>
						</View>
					</View>
					<View style={styles.menuList}>
						<View style={styles.icons}>
							<FontAwesome name={'street-view'} size={22} color={'#8d8d8d'}/>
						</View>
						<View style={[styles.menuListText]}>
							<Text style={styles.settingText}>{userInfo.address}</Text>
						</View>
					</View>
					<View style={styles.menuList}>
						<View style={styles.icons}>
							<FontAwesome5 name={'qq'} size={22} color={'#8d8d8d'}/>
						</View>
						<View style={[styles.menuListText]}>
							<Text style={styles.settingText}>{userInfo.qq}</Text>
						</View>
					</View>
					<View style={styles.menuList}>
						<View style={styles.icons}>
							<FontAwesome5 name={'birthday-cake'} size={22} color={'#8d8d8d'}/>
						</View>
						<View style={[styles.menuListText]}>
							<Text style={styles.settingText}>{userInfo.birthday}</Text>
						</View>
					</View>
					<View style={styles.menuList}>
						<View style={styles.icons}>
							{
								userInfo.sex == 0 ?
									<Icons name={'md-male'} size={20} color={'#8d8d8d'}/>
									: <Icons name={'md-female'} size={22} color={'#8d8d8d'}/>
							}
						</View>
						<View style={[styles.menuListText, {borderBottomWidth: 1, borderBottomColor: '#cecece',}]}>
							<Text style={styles.settingText}>{userInfo.sex == 0 ? '男' : '女'}</Text>
						</View>
					</View>
						<TouchableOpacity onPress={() => {
							this.props.navigation.navigate('Login');
						}} style={styles.btn}>
							<Text style={{
								fontSize: 15,
								color: '#fff'
							}}>退出登录</Text>
						</TouchableOpacity>
				</View>

			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF"
	},
	menuList: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
		height: 48,
	},
	icons: {
		width: 30,
		height: 30,
		justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor:'tomato'
		// marginLeft: 12,
		// marginRight: 10,
	},
	menuListText: {
		flex: 1,
		height: 48,
		justifyContent: 'center',
		borderTopWidth: 1,
		borderTopColor: '#cecece',
	},
	settingText: {
		lineHeight: 48,
		color: '#333',
		fontSize: 14,
	},
	btn: {
		borderRadius: 4,
		backgroundColor: '#009688',
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	}

});