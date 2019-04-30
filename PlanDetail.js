import React, {Component} from "react";
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	ScrollView, FlatList, CheckBox
} from "react-native";
import Header from "./common/Header";
import Config from "./util/Config";
import FetchUtil from "./util/FetchUtil";

export default class PlanDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	plans:[],
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
        let url=Config.GET_ROUTES+"?token=lhy&userId="+Global.user.id;//+Global.user.id;
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
                if(data.length == 0){
                	alert('没有查到相关出行路线')
				}else{
					this.setState({plans:data})
				}

            });
        });
    }
	_saveViewCollection(planId,id){
		let url=Config.SAVE_COLLECTION+"?token=lhy&userId="+Global.user.id;//+Global.user.id;
		let param={
			businessId:planId,
			routeId: id,
			type:2
		};
		FetchUtil.httpGet(url,param,(data)=>{
			if(data){
				alert("收藏路线成功");
			}else{
				alert("已经收藏过该路线");
			}

		})
	}
	_renderViewListItem = ({item,index}) => {
		return (
			<View style={{
					flex:1,
					flexDirection:'row',
					padding:10,
					marginLeft:10,
					marginRight:10,
					borderRadius:4,
					borderWidth:1,
					borderColor:'#009688'
				}}>
				<View style={{
					flex:1,
				}}>
					<Text style={{color:'#009688',fontSize: 16}}>
						{`${item.startTime}`}
						<Text style={{color:'#8d8d8d',fontSize: 15}}>{' 出发'}</Text>
					</Text>
					<Text style={{color:'#009688',fontSize: 16}}>{`${item.describle}`}</Text>
					<Text style={{color:'#009688',fontSize: 16}}>
						{`${item.endTime}`}
						<Text style={{color:'#8d8d8d',fontSize: 15}}>{' 到达'}</Text>
					</Text>
					<Text style={{color:'#009688',fontSize: 16}}>
						{`${item.destination}`}
						<Text style={{color:'#8d8d8d',fontSize: 15}}>{' 结束'}</Text>
					</Text>
				</View>
				<TouchableOpacity onPress={() => {
					this._saveViewCollection(item.planId,item.id);
				}} style={[styles.btn]}>
					<Text style={{
						fontSize: 15,
						color: '#fff'
					}}>加入收藏</Text>
				</TouchableOpacity>
			</View>
		)
	};
    render() {
        return (
            <View style={styles.container}>
                <Header
                    headLeftFlag={true}
                    onPressBackBtn={() => {
                        this.props.navigation.goBack();
                    }}
                    backTitle={'返回'}
                    title={'路线明细'}
                />
                <View style={{flex:1,padding:10}}>
                    <Text style={{fontSize:18,marginBottom: 10}}>{`出发地：${this.state.startLocal}`}</Text>
                    {/* FlatList路线列表 */}
					<FlatList
						keyExtractor={(item, index) => String(index)}
						data={this.state.plans}
						renderItem={this._renderViewListItem}
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
	btn: {
		width: 80,
		backgroundColor: '#009688',
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft: 5,
		paddingRight: 5,
	}

});
