import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity, Dimensions,
    ScrollView,
    Modal
} from "react-native";
import Header from './common/Header';
import FetchUtil from './util/FetchUtil';
import Config from './util/Config';
import Constant from './util/Constant';
import Global from "./util/Global";
const {height, width} = Dimensions.get('window');
export default class ViewDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewSpotId:this.props.navigation.state.params.id,
            detailInfo: {

            },
            showMap: false,//景区内部构造图是否显示
        };
    }

    componentDidMount() {
        // alert(this.props.navigation.state.params.id);
        this._getViewById();
    }
    _getViewById(){
        let url=Config.VIEWSDETAIL+"?token=lhy";
        let param={
            id:this.state.viewSpotId,
        };
        FetchUtil.httpGet(url,param,(data)=>{
            this.setState({
                detailInfo:data
            });
        });
    };
    _saveViewCollection(){
        let url=Config.SAVE_COLLECTION+"?token=lhy&userId=1"//+Global.user.id;
        let param={
            businessId:this.state.viewSpotId,
            type:1
        };
        FetchUtil.httpGet(url,param,(data)=>{
            if(data){
                alert("收藏景点成功");
            }

        })
    }
    render(){
        return (
            <View style={{flex:1}}>
                <Header
                    headLeftFlag={true}
                    onPressBackBtn={() => {
                        this.props.navigation.goBack();
                    }}
                    backTitle={'返回'}
                    title={'景点信息'}
                />
                <ScrollView>
                    <View style={{flex:2,padding:8,justifyContent: 'center', alignItems: 'center'}}>
                        <Text>{
                            this.state.detailInfo.name
                        }</Text>
                    </View>
                    <View style={{flex:2,padding:8,justifyContent: 'center', alignItems: 'center'}}>
                        <Text>{
                            this.state.detailInfo.address
                        }</Text>
                    </View>
                    <View style={{flex:1,justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                showMap: true
                            })
                        }} style={styles.btn}>
                            <Text style={{
                                fontSize: 15,
                                color: '#fff'
                            }}>查看景区内部地图</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this._saveViewCollection();
                        }} style={[styles.btn,{marginTop: 22}]}>
                            <Text style={{
                                fontSize: 15,
                                color: '#fff'
                            }}>加入收藏</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('MapGuide',{end:this.state.detailInfo.name})
                        }} style={[styles.btn,{marginTop: 22}]}>
                            <Text style={{
                                fontSize: 15,
                                color: '#fff'
                            }}>地图导航</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('GuideList',{viewId:1})
                        }} style={[styles.btn,{marginTop: 22,marginBottom: 10}]}>
                            <Text style={{
                                fontSize: 15,
                                color: '#fff'
                            }}>查看游记</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <Modal
                    visible={this.state.showMap}//
                    //显示是的动画默认none
                    //从下面向上滑动slide
                    //慢慢显示fade
                    animationType={'slide'}
                    //是否透明默认是不透明 false
                    transparent={true}
                    //关闭时调用
                    onRequestClose={() => {
                        this.setState({showMap: false})
                    }}
                >
                    <View style={{flex: 1}}>
                        <View style={{
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingLeft: 20,
                            paddingRight: 20
                        }}>
                            <Image source={require('./images/default_img.png')} resizeMode={'contain'}/>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    btn: {
        width: width > 600 ? '50%' : '80%',
        borderRadius: 4,
        backgroundColor: '#009688',
        height: width > 600 ? 50 : 40,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5,
    }
});