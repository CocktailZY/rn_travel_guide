import React, {Component} from "react";
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	ScrollView, FlatList, TextInput
} from "react-native";
import Header from "./common/Header";
import Config from "./util/Config";
import FetchUtil from "./util/FetchUtil";
import Global from "./util/Global";

export default class GuideList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			views: [],//推荐热门景点
			viewName: '',//手动输入框的景点名称
			pageNum:1,
			selectViewId:"",//选择景点id
		};
	}
	//查询推介景点
	_getViews(){
		let url=Config.VIEWS+"?token=lhy";
		let param={

			pageNum:this.state.pageNum,
			pageSize:5
		};
		FetchUtil.httpGet(url,param,(data)=>{
			this.setState({
				views:data.recordList
			});
		})
	}
	//查询景点是否重在
	_getViewByName(viewName,callback){
		let url=Config.GET_VIEW_SPOT_BY_NAME+"?token=lhy";
		let param={};
		if(viewName==""){
			alert('请输入景点名称');
		}else{
			param={
				name:this.state.viewName,
			};
			FetchUtil.httpGet(url,param,(data)=>{
				if(data && data.length>0){
					this.setState({
						selectViewId: data[0].id
					},()=>{
						callback()
					});
				}else{
					alert("该景点不存在，请重新输入");
					this.setState({
						viewName: ""
					});
				}
			});
		}
	}
	componentDidMount() {
		this._getViews();
		// this.setState({
		//     views:[
		//         {viewName:'颐和园1',content:'颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园'},
		//         {viewName:'颐和园2',content:'颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园'},
		//         {viewName:'颐和园3',content:'颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园'},
		//         {viewName:'颐和园4',content:'颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园'},
		//     ]
		// })
	}

	componentWillUnmount() {

	}

	/**
	 * 热门景点渲染
	 * @param item
	 * @param index
	 * @returns {*}
	 * @private
	 */
	_renderItem = ({item,index}) => {
		return (
			<TouchableOpacity
				onPress={() => {
					this.props.navigation.navigate("GuidePublishDetail", {
						id:item.id
					});
				}}
				style={[
					styles.friendList,
				]}
			>
				<Image
					source={
						item.list.lenght>0?
							{
								uri:
									Config.PREVIEWIMAGE +"?id=" +item.list[0].imageId

							}
							:
							require('./images/food.png')
					}
					style={styles.headFriend}
				/>
				<View style={styles.textFriend}>
					<Text style={{color: "#333",fontSize:18,marginBottom: 3}} numberOfLines={1}>{item.name}</Text>
				</View>
			</TouchableOpacity>
		); //5C5C5C
	};

	render() {
		return (
			<View style={styles.container}>
				<Header
					headLeftFlag={true}
					onPressBackBtn={() => {
						this.props.navigation.goBack();
					}}
					backTitle={'返回'}
					title={'攻略发布'}
				/>
				<View style={{flex:1,padding:10}}>
					<Text>{'推荐热门景点'}</Text>
					<FlatList
						keyExtractor={(item, index) => String(index)}
						data={this.state.views}
						renderItem={this._renderItem}
						refreshing={false}
						ItemSeparatorComponent={() => <View style={{height:10,borderBottomWidth: 1,borderBottomColor:'#d4d4d4'}}/>}
						showsVerticalScrollIndicator={false}
						showsHorizontalScrollIndicator={false}
					/>
				</View>
				<View style={{padding:10,borderTopWidth: 1,borderTopColor:'#d4d4d4'}}>
					<Text>{'输入景点'}</Text>
					<View style={{height:40,marginTop:10,borderColor:'#d4d4d4',borderWidth: 1,borderRadius: 4}}>
						<TextInput
							placeholder='景点名称'
							onChangeText={(text)=>{
								this.setState({
									viewName:text
								})
							}}
							underlineColorAndroid={'transparent'}
							value={this.state.viewName}
						/>
					</View>
					<TouchableOpacity onPress={() => {
						this._getViewByName(this.state.viewName,()=>{
							if(this.state.selectViewId==''){
								alert('请选择景点或输入景点');
							}else{
								this.props.navigation.navigate("GuidePublishDetail", {
									id:this.state.selectViewId
								});
							}
						})
					}} style={styles.btn}>
						<Text style={{
							fontSize: 15,
							color: '#fff'
						}}>{'确定'}</Text>
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
	friendList: {
		flexDirection: "row",
	},
	headFriend: {
		width: 100,
		height: 60,
		borderRadius: 4,
		marginRight: 11,
		marginTop: 10,
	},
	textFriend: {
		flex: 1,
		justifyContent: 'center',
		// alignItems: 'center'
	},
	btn: {
		borderRadius: 4,
		backgroundColor: '#009688',
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10
	}

});
