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

export default class MapView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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
                    title={'景区地图'}
                />
                <WebView
                    source={{uri: 'file:///android_asset/nearby.html'}}//file:///android_asset/nearby.html
                    style={{flex:1}}
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
