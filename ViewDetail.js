import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity, Dimensions,
    ScrollView
} from "react-native";
import Header from './common/Header';
import FetchUtil from './util/FetchUtil';
import Config from './util/Config';
import Constant from './util/Constant';
const {height, width} = Dimensions.get('window');
export default class ViewDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewSpotId:this.props.navigation.state.params.id,
            detailInfo: {

            }
        };
    }

    componentDidMount() {
        // alert(this.props.navigation.state.params.id);
        this._getViewById();
    }
    _getViewById(){
        let url=Config.VIEWSDETAIL;
        let param={
            id:this.state.viewSpotId,
        };
        FetchUtil.httpGet(url,param,(data)=>{
            this.setState({
                detailInfo:data
            });
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
                            'okokokokokokokokokokokokokokokokokokokokokokok'
                        }</Text>
                    </View>
                    <View style={{flex:1,justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => {
                            alert('收藏');
                        }} style={styles.btn}>
                            <Text style={{
                                fontSize: 15,
                                color: '#fff'
                            }}>加入收藏</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            alert('地图导航');
                        }} style={[styles.btn,{marginTop: 22}]}>
                            <Text style={{
                                fontSize: 15,
                                color: '#fff'
                            }}>地图导航</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            alert('查看相关游记攻略');
                        }} style={[styles.btn,{marginTop: 22,marginBottom: 10}]}>
                            <Text style={{
                                fontSize: 15,
                                color: '#fff'
                            }}>查看游记</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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