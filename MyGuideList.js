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
    Keyboard, FlatList
} from "react-native";
import Icons from "react-native-vector-icons/Ionicons";
import Header from "./common/Header";
import Config from "./util/Config";
import Global from "./util/Global";
import FetchUtil from "./util/FetchUtil";
export default class MyGuideList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            views: [],
            searchText: "",
            isSearch: false,
            searchContent: "", //上次搜索内容记录
        };
    }

    componentDidMount() {
       this._getComments();
    }
    //查询我的攻略列表
    _getComments(){
        let url=Config.GET_COMMENTS+"?token=lhy&userId="+Global.user.id;
        FetchUtil.httpGet(url,null,(data)=>{
            this.setState({
                views:data
            });
        });
    }
    componentWillUnmount() {
        if (Platform.OS == "android") {
            this.keyboardDidShowListener.remove();
        }
    }

    _onBlurText = () => {
        // this._searchInputBox.blur();
    };
    _setSearchText = text => {
        this.setState({
            searchText: text
        });
    };

    _searchFriend = () => {
        this._searchInputBox.blur();
        if (this.state.searchText.replace(/(^\s*)|(\s*$)/g, "") == "") {
            alert('搜索内容不能为空！');
        }
        //调接口
    };

    _renderItem = ({item,index}) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate("GuideDetail", {
                        id:'1'
                    });
                }}
                style={{height:80,borderWidth:1,borderColor:'#d4d4d4',marginLeft: 10,marginRight: 10}}
            >
                <View style={{flex:1,justifyContent: 'center',alignItems:'center'}}>
                    <Text style={{color: "#333",fontSize:18,marginBottom: 3}} numberOfLines={1}>{item.title}</Text>
                </View>
                <View style={{flex:1,justifyContent: 'center',alignItems:'center'}}>
                    <Text
                        style={{ color: "#aaaaaa", fontSize: 12 }}
                        numberOfLines={3}
                    >{`发布时间：${item.createTime}  发布人：${item.userName}`}</Text>
                </View>
            </TouchableOpacity>
        ); //5C5C5C
    };


    render() {
        const { showAlert, tipMsg } = this.state;
        return (
            <View style={styles.container}>
                <Header
                    headLeftFlag={false}
                    onPressBackBtn={() => {
                        this.props.navigation.goBack();
                    }}
                    backTitle={'返回'}
                    title={'我发布的攻略'}
                />
                <View style={{padding:10}}>
                    <TouchableOpacity
                        style={{
                            height:160,
                            borderColor:'#d4d4d4',
                            borderWidth:1,
                            borderRadius:4,
                            justifyContent:'center',
                            alignItems:'center'
                        }}
                        onPress={()=>{
                        	if(Global.role != 'youke'){
								this.props.navigation.navigate('GuidePublish')
							}else{
                        		alert('游客模式不能进行该操作！');
							}

                        }}
                    >
                        <Text style={{fontSize:20,color:'#d4d4d4'}}>{'点击此处快速发布游记'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center',
                    marginBottom: 10,
                    paddingLeft: 10,
                    paddingRight: 10
                }}>
                    <TouchableOpacity onPress={() => {
                        alert('按热度排序');
                    }} style={styles.btn}>
                        <Text style={{
                            fontSize: 15,
                            color: '#fff'
                        }}>按热度排序</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        alert('按时间排序');
                    }} style={styles.btn}>
                        <Text style={{
                            fontSize: 15,
                            color: '#fff'
                        }}>按时间排序</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        keyExtractor={(item, index) => String(index)}
                        data={this.state.views}
                        renderItem={this._renderItem}
                        refreshing={false}
                        ItemSeparatorComponent={() => <View style={{height:10}}/>}
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
    friendList: {
        flexDirection: "row",
        marginLeft: 10,
    },
    headFriend: {
        width: 100,
        height: 80,
        borderRadius: 4,
        marginRight: 11
    },
    textFriend: {
        flex: 1,
    },
    btn: {
        width:100,
        borderRadius: 4,
        backgroundColor: '#009688',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
