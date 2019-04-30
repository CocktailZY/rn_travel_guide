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
import Header from "./common/Header";
import FetchUtil from './util/FetchUtil';
import Config from './util/Config';
import Global from "./util/Global";
let lastPresTime = 1;
const ITEM_HEIGHT = 100; //item的高度
const HEADER_HEIGHT = 20; //分组头部的高度
const {height, width} = Dimensions.get('window');
export default class ViewCollection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: props.navigation.state.params.type,
            views: [],
            searchText: "",
            isSearch: false,
            searchContent: "", //上次搜索内容记录
            pageNum:1
        };
    }

    componentDidMount() {
        if(Global.user && Global.user.id){
            this._getViewCollection();
        }else{
            this.props.navigation.navigate('Login');
            alert("请先登录")
        }

    }
    componentWillUnmount() {

    }
    //加载类型
    _getViewCollection(){
        let url=Config.GET_COLLECTIONS+"?token=lhy&userId="+Global.user.id;
        let param={
            type:this.state.type,
            pageNum:this.state.pageNum,
            pageSize:Global.pageSize
        };
        FetchUtil.httpGet(url,param,(data)=>{
            console.log(data);
            this.setState({
                views:data?data:[]
            });
        })
    }
    _renderItem = ({item,index}) => {
        return (
            <TouchableOpacity
                onPress={() => {

                    // this.props.navigation.navigate("ViewDetail", {
                    //     id:item.id
                    // });
                }}
                style={[
                    styles.friendList,
                ]}
            >
                <Image
                    source={

                        item.list.length==0?
                            require('./images/old_build.png')
                        :
                            {
                                uri:
                                    Config.PREVIEWIMAGE +"?id=" +item.list[0].imageId
                            }
                    }
                    style={styles.headFriend}
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
        return (
            <View style={styles.container}>
                <View style={{ backgroundColor: "#F5F5F5" }}>
                    <Header
                        headLeftFlag={true}
                        onPressBackBtn={() => {
                            this.props.navigation.goBack();
                        }}
                        backTitle={'返回'}
                        title={'收藏景点列表'}
                    />
                </View>
                <View style={{ flex: 1,padding:10 }}>
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
        height: ITEM_HEIGHT
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
