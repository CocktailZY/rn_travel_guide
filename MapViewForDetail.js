import React, {Component} from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    DeviceEventEmitter,
    ScrollView, WebView
} from "react-native";
import Header from "./common/Header";
import Global from "./util/Global";

export default class MapViewForDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
		};
    }

    componentDidMount() {
    	console.log('111111111111');
    	console.log({title:this.props.address,point:this.props.point});
        if(Global.user &&Global.user.id){
           // this._getComments();
        }else{
            this.props.navigation.navigate('Login');
            alert('请先登录');
        }
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <WebView
					ref={'mapWebView'}
                    source={{uri: 'file:///android_asset/nearby.html'}}//file:///android_asset/nearby.html
					geolocationEnabled={true}
					style={{height:500,backgroundColor: 'tomato'}}
					javaScriptEnabled={true}
					onMessage={(event) => {
						console.log(event.nativeEvent.data);
						// let tmpPoint = event.nativeEvent.data;
						// let point = tmpPoint.split(',');
						// this.setState({
						// 	lng:point[0],
						// 	lat:point[1],
						// 	address:point[2]
						// })
					}}
					onLoadEnd={() => {
						this.refs.mapWebView.postMessage(this.props.address+'|'+this.props.point)
					}}
                />
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
