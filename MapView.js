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

export default class MapView extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	lng:'',
			lat:'',
			address:''
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
                        console.log(this.state);
                        DeviceEventEmitter.emit('mapView',{
                            lng:this.state.lng,
                            lat:this.state.lat,
                            address:this.state.address
                        });
                        this.props.navigation.goBack();
                    }}
                    backTitle={'返回'}
                    title={'景区地图'}
                />
                <WebView
                    source={{uri: 'file:///android_asset/nearby.html'}}//file:///android_asset/nearby.html
                    style={{flex:1}}
					geolocationEnabled={true}
					javaScriptEnabled={true}
					onMessage={(event) => {
						console.log(event.nativeEvent.data);
						let tmpPoint = event.nativeEvent.data;
						let point = tmpPoint.split(',');
						this.setState({
							lng:point[0],
							lat:point[1],
							address:point[2]
						})
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
