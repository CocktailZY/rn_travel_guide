import React, {Component} from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView, WebView
} from "react-native";
import Header from "./common/Header";
import Global from "./util/Global";

export default class MapView extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	endName: '西单',//props.navigation.state.params.end
		};
    }

    componentDidMount() {
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
                <Header
                    headLeftFlag={true}
                    onPressBackBtn={() => {
                        this.props.navigation.goBack();
                    }}
                    backTitle={'返回'}
                    title={'景区导航'}
                />
                <WebView
                    source={{uri: 'file:///android_asset/guide.html?start=故宫'+'&end='+this.state.endName}}//file:///android_asset/nearby.html
                    style={{flex:1}}
					geolocationEnabled={true}
					javaScriptEnabled={true}
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
