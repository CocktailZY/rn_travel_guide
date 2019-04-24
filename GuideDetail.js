import React, {Component} from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView, FlatList,
    TextInput
} from "react-native";
import Header from "./common/Header";
import Icon from "react-native-vector-icons/Feather";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import FetchUtil from "./util/FetchUtil";
import Config from "./util/Config";
import Global from "./util/Global";

export default class GuideDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guideInfo:props.navigation.state.params.guideInfo,
            showComment: false,//是否显示评论框
            commentPid: '', //评论父id
            appreciateNum:0,
            imageId:"",//评论图片id
            context:"",//评论内容
            commentList:[],//评论列表
            image:Config.PREVIEWIMAGE +"?id=" +props.navigation.state.params.guideInfo.imageId
        };
    }

    componentDidMount() {
        if(Global.user && Global.user.id){
            this._getAppreciateNum();
            this._commentList();
            let temp={};
            let guideId=this.state.guideInfo.id;
            Global.guideIds.push(guideId);
        }else{
            alert('请先登录');
        }
    }
    componentWillUnmount() {

    }
    //点赞
    _appreciate(){
        let url=Config.SAVE_APPRECIATE+"?token=lhy&userId="+Global.user.id;
        let param={
            businessId:this.state.guideInfo.id
        };
        FetchUtil.httpGet(url,param,(data)=>{
            //跳转到列表页
            this._getAppreciateNum();
        });
    }
    //获取点赞的个数
    _getAppreciateNum(){
        let url=Config.GET_APPRECIATE_NUM+"?token=lhy&userId="+Global.user.id;
        let param={
            businessId:this.state.guideInfo.id
        };
        FetchUtil.httpGet(url,param,(data)=>{
            //跳转到列表页
            this.setState({
                appreciateNum:data
            })
        });
    }
    //评论
    _comment(){
        let url=Config.SAVE_COMMENT+"?token=lhy&userId="+Global.user.id;
        let param={
            pId:this.state.guideInfo.id,
            imageId:this.state.imageId,
            context:this.state.context
        };
        FetchUtil.httpGet(url,param,(data)=>{
            //跳转到列表页
            this._commentList();
        });
    }
    //获取评论列表
    _commentList(){
        console.log(this.state)
        let url=Config.List_DISCUSS+"?token=lhy&userId="+Global.user.id;
        let param={
            pId:this.state.guideInfo.id,
        };
        FetchUtil.httpGet(url,param,(data)=>{
            //跳转到列表页
            this.setState({
                commentList:data
            });
        });
    }

    render() {
        const { guideInfo, image } = this.state;
        return (
            <View style={styles.container}>
                <Header
                    headLeftFlag={true}
                    onPressBackBtn={() => {
                        this.props.navigation.goBack();
                    }}
                    backTitle={'返回'}
                    title={'攻略详情'}
                />
                <View style={{flex:1,padding:10}}>
                    <Text style={{fontSize:16,marginBottom: 10}}>{`发布时间：${guideInfo.createTime}`}</Text>
                    <Text style={{fontSize:16,marginBottom: 10}}>{`发布人：${guideInfo.user.userName}`}</Text>
                    <Text style={{color:'#b5b5b5',marginBottom: 10}}>{guideInfo.context}</Text>

                    <View style={{flex: 1,justifyContent:'center',alignItems:'center'}}>
                        {/* 详情图片区 */}
                        <Image
                            source={{uri:image}}
                            resizeMode={'contain'}
                            style={{width:200,height:300}}
                        />
                    </View>
                    <View style={{flexDirection: 'row',height: 30}}>
                        <TouchableOpacity
                            style={{flexDirection: 'row', justifyContent: 'center',alignItems:'center'}}
                            onPress={()=>{
                                // 点赞
                                this._appreciate();
                            }}>
                            {/* 判断点赞状态 */}
                            <Icon
                                name='thumbs-up'
                                color='#009688'
                                size={22}
                            />
                            <Text style={{marginLeft:5}}>{this.state.appreciateNum?this.state.appreciateNum:0}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{flexDirection: 'row',marginLeft: 30, justifyContent: 'center',alignItems:'center'}}
                            onPress={()=>{
                                // 评论
                                this.setState({
                                    showComment: true
                                })
                            }}>
                            <SimpleLineIcons
                                name='bubble'
                                color='#009688'
                                size={22}
                            />
                            <Text style={{marginLeft:5}}>{'评论'}</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        {/* 评论列表 */}
                        <Text>{'评论列表'}</Text>
                        <FlatList
                            numColumns={3}
                            data={this.state.commentList}
                            keyExtractor={(item, index) => String(index)}
                            renderItem={this._renderImg}
                        />
                    </View>
                    <View style={styles.commentBox}>
                        <TextInput
                            ref={'commentInput'}
                            style={styles.commentInput}
                            multiline={true}
                            value={this.state.content}
                            onChangeText={(text) => this.setState({
                                content: text
                            })}
                            onBlur={() => {
                                this.setState({
                                    commentPid: null,
                                    // commentContent: '',
                                    placeholder: '请输入评论内容'
                                })
                            }}
                            placeholder={this.state.placeholder}
                            underlineColorAndroid={'transparent'}/>
                        <TouchableOpacity style={styles.commentReplyBtn} onPress={() => {
                            //提交评论
                            this._comment();
                        }}>
                            <Text style={{fontSize: 14, color: '#fff'}}>评论</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => {
                        alert('加入收藏');
                    }} style={styles.btn}>
                        <Text style={{
                            fontSize: 15,
                            color: '#fff'
                        }}>加入收藏</Text>
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
    commentBox: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        borderTopColor: '#d7d7d7',
        borderTopWidth: 1,
    },
    commentInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#e1e1e1',
        borderRadius: 4,
        backgroundColor: '#f0f0f0',
        padding: 2,
        paddingLeft: 8,
        paddingRight: 8,
        lineHeight: 24,
    },
    commentReplyBtn: {
        padding: 5,
        paddingLeft: 8,
        paddingRight: 8,
        backgroundColor: '#009688',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
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
