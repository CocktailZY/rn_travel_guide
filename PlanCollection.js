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
import {Header, Icon} from 'react-native-elements';
import FetchUtil from './util/FetchUtil';
import Config from './util/Config';
import Global from "./util/Global";
let lastPresTime = 1;
const ITEM_HEIGHT = 100; //item的高度
const HEADER_HEIGHT = 20; //分组头部的高度
export default class PlanCollection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.navigation.state.params.type,
            views: [],
            searchText: "",
            isSearch: false,
            searchContent: "", //上次搜索内容记录
            pageNum:1
        };
    }

    componentDidMount() {
        this._getViewCollection();
    }
    componentWillUnmount() {

    }
    //加载类型
    _getViewCollection(){
        let url=Config.GET_COLLECTIONS+"?token=lhy&userId="+Global.user.id;
        let param={
            type:this.state.typeId,
            pageNum:this.state.pageNum,
            pageSize:Global.pageSize
        };
        FetchUtil.httpGet(url,param,(data)=>{
            this.setState({
                views:data.recordList
            });
        });
    };
    _renderItem = ({item,index}) => {
        return (
            <TouchableHighlight
                activeOpacity={1}
                underlayColor='#FFFFFF'
                style={{backgroundColor: '#FFFFFF'}}
                onPress={() => {
                    this.props.navigation.navigate('PlanCollectionDetail', {
                        planId: item.id//文章详情
                    });
                }}>
                <View style={[styles.flex1, {padding: 8}]}>
                    <View style={styles.itemTitleView}>
                        {/*<Image source={require('../../images/icon_talk.png')} style={{width: 30, height: 30}}/>*/}
                        <Text style={styles.itemTitleText} numberOfLines={1}>{item.name}</Text>
                    </View>
                    <View style={styles.bottomSeparator}></View>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{width: 80}}>
                            <Text style={styles.itemBottomText} numberOfLines={1}>{${item.createTime}}</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    };


    render() {
        return (
            <View style={styles.container}>
                <View style={{ backgroundColor: "#F5F5F5" }}>
                    <Header
                        placement="left"
                        leftComponent={
                            <Icon
                                name='arrow-left'
                                type='font-awesome'
                                color='#ffffff'
                                onPress={() => this.props.navigation.goBack()}
                            />
                        }
                        centerComponent={{text: '收藏线路列表', style: {color: '#fff', fontSize: 18}}}
                        rightComponent={
                           {/* <Icon
                                name='plus'
                                type='font-awesome'
                                color='#ffffff'
                                onPress={() => {this.props.navigation.navigate('TopicPublish')}}
                            />*/}
                        }
                    />
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
    flex1: {flex: 1},
    itemTitleView: {flex: 1, flexDirection: 'row', alignItems: 'center'},
    itemTitleText: {fontSize: 18, fontWeight: 'bold', marginLeft: 5, width: (width - 30) * 0.9},
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
    },
    itemBottomText: {fontSize: 11, color: '#b5b5b5'},
});
