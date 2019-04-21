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

export default class PlanDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            start:props.navigation.state.params.start,
            // about:props.navigation.state.params.about,
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
                    title={'计划明细'}
                />
                <View style={{flex:1,padding:10}}>
                    <Text style={{fontSize:18,marginBottom: 10}}>{`出发地：${this.state.start}`}</Text>
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
