import React, {Component} from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    DatePickerAndroid,
    TextInput,
    CheckBox,
    Dimensions,
    Alert,
    FlatList,
    TouchableHighlight,
    ImageBackground,
    TimePickerAndroid
} from "react-native";
import Header from "./common/Header";
import FetchUtil from "./util/FetchUtil";
const {height, width} = Dimensions.get('window');
export default class PlanPublish extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startTime: '',
            locationType: true,//true 为自动定位
            location: '',
            views: [
                {chekced:true,name:'天安门',id:1},
                {chekced:false,name:'天安门1',id:2},
                {chekced:false,name:'天安门1',id:3},
                {chekced:false,name:'天安门1',id:4},
                {chekced:false,name:'天安门1',id:5},
                {chekced:false,name:'天安门1',id:6},
                {chekced:false,name:'天安门1',id:7},
                {chekced:false,name:'天安门1',id:8},
            ]
        };
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let initialPosition = position.coords.latitude+','+position.coords.longitude;
                console.log(position);
                let url = 'https://api.map.baidu.com/geocoder/v2/?output=json';
                let data = {
                    ak: 'IHUAG9ZfCOzg290s0Sb5sStev5iqhfAs',
                    location: initialPosition,
                    mcode:'7B:E1:EE:4B:B5:CE:B0:10:9C:2D:13:5F:63:6A:E2:F7:3C:F4:EE:46;com.travel_guide'
                };
                if(data){
                    let param="";
                    for(let i in data){
                        param+='&'+i +"="+data[i];
                    }
                    //  param=param.replace('&',"?");
                    url+=param;
                }
                fetch(url, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    }
                }) .then((response) => response.json())
                    .then((data) => {
                        console.log(data)
                        if(data){
                            this.setState({
                                location: data.result.formatted_address
                            });
                        }else{
                            Alert.alert('提示', '网络链接出错');
                        }
                    })
                    .catch((error) => {
                        Alert.alert('提示', '网络链接出错');
                        console.error(error);
                    });
            },
            (error) => alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );

    }

    componentWillUnmount() {

    }

    _renderViewListItem = ({item,index}) => {
        return (
            <TouchableOpacity
                activeOpacity={1}
                underlayColor='#FFFFFF'
                style={{
                    flex:1,
                    flexDirection:'row',
                    height:80,
                    marginLeft:10,
                    marginRight:10,
                    borderRadius:4,
                    borderWidth:1,
                    borderColor:'#d4d4d4',
                    backgroundColor:'#ffbe76'
                }}
                onPress={() => {
                    let tmpviews = [...this.state.views];
                    console.log(tmpviews);
                    tmpviews.map((obj,ind)=>{
                        if(obj.id == item.id){
                            obj.checked = !obj.checked;
                        }
                    })
                    this.setState({
                        views: tmpviews
                    })
                }}>
                <View style={{
                    flex:1,
                    height:80,
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                    <Text style={{color:'#ffffff',fontSize: 20}}>{item.name}</Text>
                </View>
                <View style={{justifyContent:'center', alignItems:'center'}}>
                    <CheckBox
                        trackColor={'#ffffff'}
                        value={item.checked}
                        onValueChange={(newValue) => {
                            console.log(newValue)
                            let tmpviews = [...this.state.views];
                            console.log(tmpviews);
                            tmpviews.map((obj,ind)=>{
                                if(obj.id == item.id){
                                    obj.checked = !obj.checked;
                                }
                            })
                            this.setState({
                                views: tmpviews
                            })
                        }}
                    />
                </View>
            </TouchableOpacity>
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
                    title={'发布计划'}
                    headRightFlag={true}
                    isText={true}
                    rightText={'提交'}
                    onPressRightBtn={()=>{
                        this.props.navigation.navigate('PlanDetail',{
                            start:this.state.location
                        })
                    }}
                />
                <View style={{flex:1,padding:10}}>
                    <TouchableOpacity style={styles.inputView} onPress={()=>{
                        try {
                            DatePickerAndroid.open({
                                // 要设置默认值为今天的话，使用`new Date()`即可。
                                // 下面显示的会是2020年5月25日。月份是从0开始算的。
                                date: new Date()
                            }).then(({action, year, month, day})=>{
                                if (action !== DatePickerAndroid.dismissedAction) {
                                    console.log(year,month,day);
                                    // 这里开始可以处理用户选好的年月日三个参数：year, month (0-11), day
                                    let tmpBirth = year + '-' + (month+1) + '-' + day;
                                    // this.setState({
                                    //     startTime: tmpBirth
                                    // },()=>{
                                        try {
                                            TimePickerAndroid.open({
                                                hour: new Date().getHours(),
                                                minute: new Date().getMinutes(),
                                                is24Hour: true, // Will display '2 PM'
                                            }).then(({action, hour, minute})=>{
                                                if (action !== TimePickerAndroid.dismissedAction) {
                                                    let tempBody = (hour < 10 ? ('0'+hour) : hour)+':'+(minute < 10 ? ('0'+minute) : minute);
                                                    this.setState({
                                                        startTime: tmpBirth + ' ' +tempBody
                                                    })
                                                }
                                            })
                                        } catch ({code, message}) {
                                            console.warn('Cannot open time  picker', message);
                                        }
                                    // })
                                }
                            });

                        } catch ({code, message}) {
                            console.warn('Cannot open date picker', message);
                        }
                    }}>
                        <Image
                            source={require('./images/icon/time.png')}
                            style={styles.icon}
                        />
                        <TextInput
                            placeholder='出发日期'
                            editable={false}
                            underlineColorAndroid={'transparent'}
                            value={this.state.startTime}
                            style={styles.inputText}
                        />
                    </TouchableOpacity>
                    <View style={{
                        width: width > 600 ? '50%' : '80%',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        marginTop: 13
                    }}>
                        <CheckBox
                            value={this.state.locationType}
                            onValueChange={(newValue) => {
                                console.log(newValue)
                                this.setState({
                                    locationType: newValue
                                })
                            }}
                        />
                        <View style={{flex:1,justifyContent: 'center'}}>
                            <Text>{'自动定位'}</Text>
                        </View>
                        <CheckBox
                            value={!this.state.locationType}
                            onValueChange={(newValue) => {
                                this.setState({
                                    locationType: !newValue
                                })
                            }}
                        />
                        <View style={{flex:1,justifyContent: 'center'}}>
                            <Text>{'手动定位'}</Text>
                        </View>
                    </View>
                    <View style={styles.inputView}>
                        <Image
                            source={require('./images/icon/start_point.png')}
                            style={styles.icon}
                        />
                        <TextInput
                            placeholder={this.state.locationType ? this.state.location : '请输入起点位置'}
                            editable={!this.state.locationType}
                            onChangeText={(text) => {this.setState({location:text})}}
                            underlineColorAndroid={'transparent'}
                            value={this.state.location}
                            style={styles.inputText}
                        />
                    </View>
                    <View style={{marginTop:10}}>
                        <Text>{'请选择景点'}</Text>
                    </View>
                    <View style={{flex:1,paddingTop:10,paddingBottom:10}}>
                        <FlatList
                            keyExtractor={(item, index) => String(index)}
                            data={this.state.views}
                            renderItem={this._renderViewListItem}
                            refreshing={false}
                            ItemSeparatorComponent={() => <View style={{height:10}}/>}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        />
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
    inputView: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#d1d1d2',
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    inputText: {
        flex: 1,
        fontSize: 14,
        color: '#999',
        padding: 0,
        marginTop: 13,
        marginBottom: 13,
    },

});
