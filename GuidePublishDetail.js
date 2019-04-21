import React, {Component} from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView, TextInput,Dimensions,
    WebView,
    FlatList
} from "react-native";
import Header from "./common/Header";
import Slider from "react-native-slider";
import Icons from 'react-native-vector-icons/Ionicons';
import ImagePickerManager from "react-native-image-picker";
const {height, width} = Dimensions.get('window');

export default class GuidePublishDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',//攻略标题
			jdxc: 0.2,
			tnxh: 3,
			jsgs: 0.5,
			zbms: 1,
			uploadImgs: [],//上传的景区图片
		};
	}

	componentDidMount() {

		this.setState({})
	}

	componentWillUnmount() {

	}

	openImagePicker = () => {
		let photoOptions = {
			//底部弹出框选项
			title: '请选择',
			cancelButtonTitle: '取消',
			takePhotoButtonTitle: '拍照',
			chooseFromLibraryButtonTitle: '打开相册',
			cameraType: 'back',
			quality: 1,
			// maxWidth: 36,
			// maxHeight: 36,
			allowsEditing: false,
			noData: false,
			storageOptions: {
				skipBackup: true,
				path: 'file'
			}
		};

		//打开图像库：
		ImagePickerManager.showImagePicker(photoOptions, (response) => {
			if (response.didCancel) {
				//选择了取消
			} else {
				if (response.error) {
					alert('您选择的图片异常，请更换有效图片再试！');
					return;
				}

				let imageType;
				if (response.fileName && response.fileName.indexOf('HEIC') == -1) {
					imageType = response.fileName.substr(response.fileName.lastIndexOf('.') + 1);
				} else {
					imageType = response.uri.substr(response.uri.lastIndexOf('.') + 1);
				}
				const trueType = ['jpg', 'JPG', 'jpeg', 'JPEG', 'png', 'PNG', 'gif', 'GIF'];
				if (trueType.indexOf(imageType) > -1) {
					//与上一节中的代码相同！
					// DeviceEventEmitter.emit('changeLoading', 'true');
					let formData = new FormData();
					let file = {
						uri: response.uri,
						type: 'multipart/form-data',
						name: response.fileName && response.fileName.indexOf('HEIC') == -1 ? response.fileName : 'image.png'
					};
					formData.append("file", file);
					let url = Path.resetHeadImage + '?uuId=' + this.state.uuid + '&ticket=' + this.state.ticket + '&jidNode=' + this.state.basic.jidNode + '&userId=' + this.state.basic.userId;
					fetch(url, {
						method: 'POST',
						headers: {
							'Content-Type': 'multipart/form-data',
						},
						body: formData,
					}).then((response) => response.json()).then((responseData) => {
						console.log(responseData);
						let item = responseData.data[0]
						let tmpArr = {...this.state.uploadImgs};
						tmpArr.push(item.data);
						this.setState({uploadImgs: tmpArr});
					}, () => {
						alert('图片上传失败！');
					}).catch((error) => {
						alert('图片上传失败！');
					});
				} else {
					alert('无效图片格式，仅支持“gif,jpeg,jpg,png”');
				}
			}
		});
	}

	_renderImg = ({item, index}) => {
		return (
			<View style={styles.upBtn}>
				<Image
					source={{uri:item}}
					resizeMode={'contain'}
					style={{width: 80, height: 80}}
				/>
			</View>
		)
	}

	render() {
		const {uploadImgs} = this.state;
		return (
			<View style={styles.container}>
				<Header
					headLeftFlag={true}
					onPressBackBtn={() => {
						this.props.navigation.goBack();
					}}
					backTitle={'返回'}
					title={'填写攻略信息'}
				/>
				<ScrollView style={{flex:1}}>
					<View style={{
						height: 40,
						marginTop: 10,
						borderColor: '#d4d4d4',
						borderWidth: 1,
						borderRadius: 4,
						marginLeft: 10,
						marginRight: 10
					}}>
						<TextInput
							placeholder='攻略标题'
							onChangeText={(text) => {
								this.setState({title: text})
							}}
							underlineColorAndroid={'transparent'}
							value={this.state.title}
						/>
					</View>
					<View style={{borderTopWidth: 1, borderTopColor: '#d4d4d4', marginTop: 10}}/>
					<View style={{flex: 1, padding: 10}}>
						<Text>{'您对景区的评分'}</Text>
						<View style={{padding: 5}}>
							<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
								<Text style={{marginRight: 10}}>{'景点行程'}</Text>
								<View
									style={{
										flexDirection: 'row',
										flex: 1,
										justifyContent: 'center',
										alignItems: 'center'
									}}>
									<Text style={{marginRight: 10}}>{'0'}</Text>
									<Slider
										style={{flex: 1}}
										minimumTrackTintColor={'#009688'}
										thumbTintColor={'#009688'}
										value={this.state.jdxc}
										minimumValue={0}
										step={1}
										maximumValue={5}
										onValueChange={value => this.setState({jdxc: value})}
									/>
									<Text style={{marginLeft: 10}}>{this.state.jdxc}</Text>
								</View>
							</View>
							<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
								<Text style={{marginRight: 10}}>{'体能消耗'}</Text>
								<View
									style={{
										flexDirection: 'row',
										flex: 1,
										justifyContent: 'center',
										alignItems: 'center'
									}}>
									<Text style={{marginRight: 10}}>{'0'}</Text>
									<Slider
										style={{flex: 1}}
										minimumTrackTintColor={'#009688'}
										thumbTintColor={'#009688'}
										value={this.state.tnxh}
										minimumValue={0}
										step={1}
										maximumValue={5}
										onValueChange={value => this.setState({tnxh: value})}
									/>
									<Text style={{marginLeft: 10}}>{this.state.tnxh}</Text>
								</View>
							</View>
							<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
								<Text style={{marginRight: 10}}>{'景色感受'}</Text>
								<View
									style={{
										flexDirection: 'row',
										flex: 1,
										justifyContent: 'center',
										alignItems: 'center'
									}}>
									<Text style={{marginRight: 10}}>{'0'}</Text>
									<Slider
										style={{flex: 1}}
										minimumTrackTintColor={'#009688'}
										thumbTintColor={'#009688'}
										value={this.state.jsgs}
										minimumValue={0}
										step={1}
										maximumValue={5}
										onValueChange={value => this.setState({jsgs: value})}
									/>
									<Text style={{marginLeft: 10}}>{this.state.jsgs}</Text>
								</View>
							</View>
							<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
								<Text style={{marginRight: 10}}>{'周边美食'}</Text>
								<View
									style={{
										flexDirection: 'row',
										flex: 1,
										justifyContent: 'center',
										alignItems: 'center'
									}}>
									<Text style={{marginRight: 10}}>{'0'}</Text>
									<Slider
										style={{flex: 1}}
										minimumTrackTintColor={'#009688'}
										thumbTintColor={'#009688'}
										value={this.state.zbms}
										minimumValue={0}
										step={1}
										maximumValue={5}
										onValueChange={value => this.setState({zbms: value})}
									/>
									<Text style={{marginLeft: 10}}>{this.state.zbms}</Text>
								</View>
							</View>
						</View>
					</View>
					<View style={{borderTopWidth: 1, borderTopColor: '#d4d4d4', marginTop: 10}}/>
					<View style={{flex: 1, padding: 10}}>
						<View style={{padding: 5, borderWidth: 1, borderColor: '#d4d4d4', borderRadius: 4}}>
							<TextInput
								style={{textAlignVertical: 'top'}}
								placeholder='分享您对景区的看法'
								onChangeText={(text) => {
									this.setState({title: text})
								}}
								underlineColorAndroid={'transparent'}
								multiline={true}
								numberOfLines={5}
								value={this.state.title}
							/>
						</View>
						{uploadImgs.length > 0 ? (
							<View style={{flex: 1}}>
								<FlatList
									numColumns={3}
									data={uploadImgs}
									keyExtractor={(item, index) => String(index)}
									renderItem={this._renderImg}
								/>
							</View>
						) : null}
						<TouchableOpacity onPress={() => {
							if(uploadImgs.length >= 6){
								alert('最多上传6张')
							}else{
								//打开上传照片
								//判断图片类型是jpg
								this.openImagePicker();
							}
						}} style={styles.upAddBtn}>
							<Icons name={'ios-add'} size={36} color={'#d4d4d4'}/>
							<Text style={{
								fontSize: 15,
								color: '#d4d4d4'
							}}>{'上传照片'}</Text>
						</TouchableOpacity>
					</View>
					<View style={{borderTopWidth: 1, borderTopColor: '#d4d4d4', marginTop: 10}}/>
					<View style={{padding:5}}>
						<Text>{'请在景区地图上标注您的驻留位置'}</Text>
						{/*地图区域*/}
						<Text style={{marginTop:5}}>
							{this.props.navigation.state.params.lng ? this.props.navigation.state.params.address : ''}
						</Text>
						<TouchableOpacity
							style={[styles.btn,{marginTop:5}]}
							onPress={()=>{
								this.props.navigation.navigate('MapView');
							}}
						>
							<Text style={{
								fontSize: 15,
								color: '#fff'
							}}>{'点击查看景区地图'}</Text>
						</TouchableOpacity>
					</View>

                    <View style={{padding:10}}>
                        <TouchableOpacity onPress={() => {
                            //点击确定
                        }} style={styles.btn}>
                            <Text style={{
                                fontSize: 15,
                                color: '#fff'
                            }}>{'确认发布'}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF"
	},
	btn: {
		borderRadius: 4,
		backgroundColor: '#009688',
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10
	},
	upBtn: {
		flex:1,
		// width: 80,
		height: 80,
		// borderWidth: 1,
		// borderColor: '#d4d4d4',
		// borderRadius: 4,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10
	},
	upAddBtn: {
		width: 80,
		height: 80,
		borderWidth: 1,
		borderColor: '#d4d4d4',
		borderRadius: 4,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10
	}
});