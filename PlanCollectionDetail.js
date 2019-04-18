/*
 * 文章详情
 * 页面元素 标题 发起人 点赞数 发表时间 点赞人员列表 讨论区
 *
 */
import React, {Component} from 'react';
import {
    StyleSheet, Text, View, Modal,
    Platform, TouchableOpacity, Dimensions, Image, ScrollView, FlatList, TextInput,
    ActivityIndicator, TouchableWithoutFeedback, Keyboard, DeviceEventEmitter, Alert, Linking
} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Config from "./util/Config";
import Global from "./util/Global";
import FetchUtil from "./util/FetchUtil";

const {height, width} = Dimensions.get('window');
const SCREEN = width < 600 ? 6 : 10;
const MARGIN = (SCREEN - 2) * 20;
const headSize = (width - MARGIN) / SCREEN;
let commentPage = 1;

export  default  class PlanCollectionDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            planId: '',//props.navigation.state.params.planId,
            planInfo: {},
            routeList: [],//评论列表
            inviteContent: '',//评论全部内容
            placeholder: '',//占位文字
            commentPid: 0,
        }
    };

    componentDidMount() {
       this._getPlanDetails();
    };

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        commentPage = 1;
    }

    _getPlanDetails = () => {
        let url=Config.PLAN_DETAIL+"?token=lhy&userId="+Global.user.id;
        let param={
            id:this.state.planId
        };
        FetchUtil.httpGet(url,param,(data)=>{
            this.setState({
                routeList:data.list,
                planInfo:data
            });
        })
    };

    render() {
        return (
            <View style={styles.container}>
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
                    centerComponent={{text: '规划详情', style: {color: '#fff', fontSize: 18}}}
                />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    onScroll={this._scrollInviteDetails}
                    keyboardDismissMode={'on-drag'}>
                    <View style={styles.inviteInfor}>
                        <Text style={styles.inforTitle}>{this.state.planInfo.name}</Text>
                        <Text style={styles.inforTitle}>{this.state.planInfo.describle}</Text>
                    </View>
                    <View style={[styles.inviteBox, {
                        backgroundColor: '#f0f0f0',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }]}>
                        <Text style={[styles.inviteTitle, {flex: 1}]}>线路</Text>
                    </View>
                    <View style={[styles.inviteBox, {flex: 1}]}>
                        {
                            this.state.routeList.map((item, index) => {
                                // console.log(item);
                                return <View key={index}
                                             style={[styles.inviteGroup, index == 0 ? {borderTopColor: 'transparent'} : null]}>
                                    <View style={{flex: 1, marginLeft: 10}}>
                                        <View style={{flexDirection: 'row', paddingLeft: 6}}>
                                            <View style={[styles.flex1, {padding: 8}]}>
                                                <View style={styles.itemTitleView}>
                                                    <Text style={styles.itemTitleText} numberOfLines={1}>{item.destination}</Text>
                                                </View>
                                                <View style={styles.bottomSeparator}></View>
                                                <View style={{flexDirection: 'row'}}>
                                                    <View style={{width: 80}}>
                                                        <Text style={styles.itemBottomText} numberOfLines={1}>{item.startTime}</Text>
                                                    </View>
                                                    <View style={{width: 80}}>
                                                        <Text style={styles.itemBottomText} numberOfLines={1}>{item.endTime}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            })
                        }
                        {this._commentFooter()}
                    </View>
                </ScrollView>
                <View style={styles.inviteComment}>
                    <TextInput
                        ref={'commentInput'}
                        style={styles.inviteCommentInput}
                        multiline={true}
                        value={this.state.inviteContent}
                        onChangeText={(text) => this.setState({
                            inviteContent: text,
                        })}
                        onBlur={() => {
                            this.setState({
                                inviteContent: '',//评论内容清空
                                commentPid: 0,
                            })
                        }}
                        placeholder={'请输入评论内容'}
                        underlineColorAndroid={'transparent'}/>
                    <TouchableOpacity style={styles.btn} onPress={() => {
                        this._inviteComment()
                    }}>
                        <Text style={{fontSize: 14, color: '#fff'}}>评论</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        position: 'relative'
    },
    inviteBox: {
        flex: 1,
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15
    },
    itemTitleView: {flex: 1, flexDirection: 'row', alignItems: 'center'},
    itemTitleText: {fontSize: 18, fontWeight: 'bold', marginLeft: 5, width: (width - 30) * 0.9},
    itemBottomText: {fontSize: 13, color: '#b5b5b5'},
    inviteInfor: {
        paddingTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#FFFFFF',
    },
    inforTitle: {
        fontSize: 16,
        color: '#333',
        paddingBottom: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    btn: {
        padding: 3,
        paddingLeft: 8,
        paddingRight: 8,
        backgroundColor: '#3498db',
        borderRadius: 4,
        marginLeft: 10,
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginTop: 5,
        marginBottom: 5
    },
    inviteHeadImg: {
        width: headSize,
        height: headSize,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderRadius: 4
    },
    headMoreBtn: {
        width: headSize,
        height: headSize,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        top: 0,
    },
    inviteTitle: {
        color: '#333',
        fontSize: 16,
        borderLeftColor: '#ff9226',
        borderLeftWidth: 5,
        paddingLeft: 8
    },
    onlyTitle: {
        color: '#333',
        fontSize: 12
    },
    inviteComment: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        paddingLeft: 15,
        paddingRight: 15,
        borderTopColor: '#d7d7d7',
        borderTopWidth: 1,
    },
    inviteCommentInput: {
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
    inviteGroup: {
        flexDirection: 'row',
        marginBottom: 10,
        borderTopWidth: 1,
        borderTopColor: '#ebebeb',
        paddingTop: 10,
    },
    inviteFileIcon: {
        width: 26,
        height: 26,
        marginRight: 5,
        marginLeft: 5
    },
    inviteFileInfor: {
        flex: 1,
        justifyContent: 'center',
    },
    footer: {
        flexDirection: 'row',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    footerText: {
        fontSize: 14,
        color: '#999'
    },
    replyView: {
        flex: 1,
        paddingLeft: 6
    },
    commitTime: {flex: 1, marginRight: 10, textAlign: 'right', fontSize: 11, color: '#aaa'},
    replyBtn: {fontSize: 13, color: '#6173ff'},
});

export default TopicDetail;
