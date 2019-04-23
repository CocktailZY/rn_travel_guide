import React, {Component} from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView
} from "react-native";
import Header from "./common/Header";
import Config from "./util/Config";
import FetchUtil from "./util/FetchUtil";

export default class PlanDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startLocal:props.navigation.state.params.start,
            startTime:props.navigation.state.params.startTime,
            selectedViews:props.navigation.state.params.selectedViews,//选中的景点
            type:props.navigation.state.params.type,
            destination:''
            // about:props.navigation.state.params.about,
        };
    }

    componentDidMount() {
       this._getRoutes();
    }

    componentWillUnmount() {

    }
    //查询对应计划类型 且大于等于起始时间的线路
    _getRoutes(){
        let url=Config.GET_ROUTES+"?token=lhy&userId=1";//+Global.user.id;
        let viewNmae=[...this.state.selectedViews];
        this.setState({
            destination:viewNmae.join(','),
        },()=>{
            let param=this.state;
            console.log(param);
            FetchUtil.httpGet(url,param,(data)=>{
                //查询会线路数据
                console.log("++++++++++++++++++++++++++++++++++++");
                console.log(data);

            });
        });
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
                    title={'计划明细'}
                />
                <View style={{flex:1,padding:10}}>
                    <Text style={{fontSize:18,marginBottom: 10}}>{`出发地：${this.state.startLocal}`}</Text>
                    {/* FlatList路线列表 */}
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

});
