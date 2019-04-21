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

export default class GuideDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showComment: false,//是否显示评论框
            commentPid: '', //评论父id
        };
    }

    componentDidMount() {

        this.setState({})
    }

    componentWillUnmount() {

    }

    render() {
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
                    <Text style={{fontSize:18,marginBottom: 10}}>{`张三在2019-04-21 16:29发布`}</Text>
                    <Text style={{color:'#b5b5b5',marginBottom: 10}}>{'天安门真好'}</Text>

                    <View style={{flex: 1}}>
                        {/* 详情图片区 */}
                        <Text>{'详情图片区'}</Text>
                        {/*<FlatList
                            numColumns={3}
                            data={uploadImgs}
                            keyExtractor={(item, index) => String(index)}
                            renderItem={this._renderImg}
                        />*/}
                    </View>
                    <View style={{flexDirection: 'row',height: 30}}>
                        <TouchableOpacity
                            style={{flexDirection: 'row', justifyContent: 'center',alignItems:'center'}}
                            onPress={()=>{
                                // 点赞
                            }}>
                            {/* 判断点赞状态 */}
                            <Icon
                                name='thumbs-up'
                                color='#009688'
                                size={22}
                            />
                            <Text style={{marginLeft:5}}>{'5'}</Text>
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
                        {/*<FlatList
                            numColumns={3}
                            data={uploadImgs}
                            keyExtractor={(item, index) => String(index)}
                            renderItem={this._renderImg}
                        />*/}
                    </View>
                    <View style={styles.commentBox}>
                        <TextInput
                            ref={'commentInput'}
                            style={styles.commentInput}
                            multiline={true}
                            value={this.state.commentContent}
                            onChangeText={(text) => this.setState({
                                commentContent: text
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
                        }}>
                            <Text style={{fontSize: 14, color: '#fff'}}>评论</Text>
                        </TouchableOpacity>
                    </View>
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
        paddingLeft: 15,
        paddingRight: 15,
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

});
