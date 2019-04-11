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
let lastPresTime = 1;
const ITEM_HEIGHT = 100; //item的高度
const HEADER_HEIGHT = 20; //分组头部的高度
export default class ViewList extends Component {
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
        if (Platform.OS == "android") {
            this.keyboardDidShowListener = Keyboard.addListener(
                "keyboardDidHide",
                () => {
                    this._onBlurText();
                }
            );
        }

        this.setState({
            views:[
                {viewName:'颐和园',content:'颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园'},
                {viewName:'颐和园',content:'颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园'},
                {viewName:'颐和园',content:'颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园'},
                {viewName:'颐和园',content:'颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园'},
                {viewName:'颐和园',content:'颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园'},
                {viewName:'颐和园',content:'颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园'},
                {viewName:'颐和园',content:'颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园'},
                {viewName:'颐和园',content:'颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园巴拉巴拉巴拉巴拉颐和园'},
            ]
        })
    }
    componentWillUnmount() {
        if (Platform.OS == "android") {
            this.keyboardDidShowListener.remove();
        }
    }

    _onBlurText = () => {
        this._searchInputBox.blur();
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
                    this.props.navigation.navigate("ViewDetail", {
                        id:'1'
                    });
                }}
                style={[
                    styles.friendList,
                ]}
            >
                <Image
                    source={require('./images/food.png')}
                    // source={{
                    //     uri:
                    //         Path.headImgNew +
                    //         "?uuId=" +
                    //         this.state.uuid +
                    //         "&ticket=" +
                    //         this.state.ticket +
                    //         "&imageName=" +
                    //         info.item.photoId +
                    //         "&userId=" +
                    //         this.state.basic.userId +
                    //         "&imageId=" +
                    //         info.item.photoId +
                    //         "&sourceType=singleImage&jidNode=" +
                    //         info.item.jid_node
                    // }}
                    //source={{uri: Path.headImg + '?fileName=' + info.item.photoId + '&uuId=' + this.state.uuid + '&userId=' + this.state.basic.userId + '&ticket=' + this.state.ticket}}
                    style={styles.headFriend}
                />
                <View style={styles.textFriend}>
                    <Text style={{color: "#333",fontSize:18,marginBottom: 3}} numberOfLines={1}>{item.viewName}</Text>
                    <Text
                        style={{ color: "#333", fontSize: 15 }}
                        numberOfLines={3}
                    >{item.content}</Text>
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
                                autoFocus={true}
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
