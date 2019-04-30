import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Platform,
    BackHandler,
    TextInput,
    SectionList,
    Keyboard, FlatList, Dimensions
} from "react-native";
import Icons from "react-native-vector-icons/Ionicons";
import FetchUtil from './util/FetchUtil';
import Config from './util/Config';
import Constant from './util/Constant';
import Global from "./util/Global";
let lastPresTime = 1;
const ITEM_HEIGHT = 100; //item的高度
const HEADER_HEIGHT = 20; //分组头部的高度
const {height, width} = Dimensions.get('window');
export default class ViewList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            views: [],
            searchText: "",
            isSearch: false,
            searchContent: "", //上次搜索内容记录
            pageNum:1
        };
    }

    componentDidMount() {
        if(Global.user &&Global.user.id){
            this.listCommentsByids();
        }else{
            this.props.navigation.navigate('Login');
            alert('请先登录');
        }
    }
    componentWillUnmount() {

    }
    //加载我浏览过的类型
    listCommentsByids(){
    	console.log(Global);
        if(Global.guideIds && Global.guideIds.length>0){
            let ids=Global.guideIds.join(",");
            let url=Config.listViewByids+"?token=lhy&ids="+ids;//需要加参
            FetchUtil.httpGet(url,null,(data)=>{
            	console.log(data);
                this.setState({
                    views:data
                });
            });
        }
}
    _onBlurText = () => {
        this._searchInputBox.blur();
    };
    _setSearchText = text => {
        this.setState({
            searchText: text
        },()=>{
            //输入完内容去检索
            this._getViews();
        });
    };

    _searchFriend = () => {
        this._searchInputBox.blur();
        if (this.state.searchText.replace(/(^\s*)|(\s*$)/g, "") == "") {
            alert('搜索内容不能为空！');
        }else{
			//调接口
			this._getViews();
		}

    };

    _renderItem = ({item,index}) => {

        return (
            <TouchableOpacity

                onPress={() => {
                    this.props.navigation.navigate("ViewDetail", {
                        id:item.id
                    });
                }}
                style={[
                    styles.friendList,
                ]}
            >
                <Image
                    source={
                        // item.list.lenght>0?
                            {
                                uri:
                                    Config.PREVIEWIMAGE +"?id=" +item.list[0].imageId

                            }
                            // :
                            // require('./images/food.png')
                    }
                    style={styles.headFriend}
                    resizeMode={'contain'}
                />
                <View style={styles.textFriend}>
                    <Text style={{color: "#333",fontSize:18,marginBottom: 3}} numberOfLines={1}>{item.name}</Text>
                    <Text
                        style={{ color: "#333", fontSize: 15 }}
                        numberOfLines={3}
                    >{item.describle}</Text>
                </View>
            </TouchableOpacity>
        ); //5C5C5C
    };


    render() {
        const { showAlert, tipMsg } = this.state;
        return (
            <View style={styles.container}>
                <View style={{ backgroundColor: "#F5F5F5" }}>
                    <View style={styles.searchBox}>
                        <View style={{ flex: 1 }}>
                            <TextInput
                                ref={TextInput => (this._searchInputBox = TextInput)}
                                style={styles.searchInputBox}
                                placeholderTextColor={"#CCCCCC"}
                                placeholder={"搜索..."}
                                underlineColorAndroid={"transparent"}
                                multiline={false}
                                onChangeText={text => this._setSearchText(text)}
                                autoFocus={false}
                                returnKeyType={"search"}
                                onSubmitEditing={this._searchFriend}
                                value={this.state.searchText}
                            />
                        </View>
                        <TouchableOpacity onPress={this._searchFriend}>
                            <View style={{ width: 25, height: 30, justifyContent: "center" }}>
                                <Icons
                                    name={"ios-search"}
                                    size={25}
                                    color={"#CCCCCC"}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        keyExtractor={(item, index) => String(index)}
                        data={this.state.views}
                        renderItem={this._renderItem}
                        refreshing={false}
                        ItemSeparatorComponent={() => <View style={{height:10}}/>}
						ListEmptyComponent={() => <View style={{height: 100, justifyContent: 'center', alignItems: 'center'}}>
							<Text style={{fontSize: 16, color: '#999'}}>暂无数据</Text>
						</View>}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    />
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
    itemTitleView: {flex: 1, flexDirection: 'row', alignItems: 'center'},
  itemTitleText: {fontSize: 18, fontWeight: 'bold', marginLeft: 5, width: (width - 30) * 0.9},
    itemBottomText: {fontSize: 13, color: '#b5b5b5'},
    friendList: {
        flexDirection: "row",
        marginLeft: 10,
        // height: ITEM_HEIGHT,
		justifyContent:'center',
		alignItems:'center',
		paddingBottom: 10,
		paddingTop: 10,
    },
    headFriend: {
        width: 100,
        height: 80,
        borderRadius: 4,
        marginRight: 11
    },
    textFriend: {
        flex: 1,
        marginRight: 10
    },
    searchInputBox: {
        flex: 1,
        height: 30,
        backgroundColor: "#FFFFFF",
        borderColor: "transparent",
        borderWidth: 1,
        borderRadius: 6,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 8,
        paddingRight: 8
    },
    searchBox: {
        flexDirection: "row",
        margin: 8,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderRadius: 6,
        borderColor: "#CCCCCC"
    }
});
