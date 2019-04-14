import React, {Component} from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView, TextInput,
    FlatList
} from "react-native";
import Header from "./common/Header";
import Slider from "react-native-slider";
import Icons from 'react-native-vector-icons/Ionicons';

export default class GuidePublishDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',//攻略标题
            jdxc: 0.2,
            tnxh: 3,
            jsgs: 0.5,
            zbms: 1,
            uploadImgs: [1, 2, 3, 4, 5, 6],//上传的景区图片
        };
    }

    componentDidMount() {

        this.setState({})
    }

    componentWillUnmount() {

    }

    _renderImg = ({item, index}) => {
        return (
            <View style={styles.upBtn}>
                <Image
                    source={require('./images/default_img.png')}
                    resizeMode={'contain'}
                    style={{width: 80, height: 80}}
                />
            </View>
        )
    }

    render() {
        const {uploadImgs} = this.state;
        return (
            <View style={styles.container}>
                <Header
                    headLeftFlag={true}
                    onPressBackBtn={() => {
                        this.props.navigation.goBack();
                    }}
                    backTitle={'返回'}
                    title={'填写攻略信息'}
                />
                <ScrollView>
                    <View style={{
                        height: 40,
                        marginTop: 10,
                        borderColor: '#d4d4d4',
                        borderWidth: 1,
                        borderRadius: 4,
                        marginLeft: 10,
                        marginRight: 10
                    }}>
                        <TextInput
                            placeholder='攻略标题'
                            onChangeText={(text) => {
                                this.setState({title: text})
                            }}
                            underlineColorAndroid={'transparent'}
                            value={this.state.title}
                        />
                    </View>
                    <View style={{borderTopWidth: 1, borderTopColor: '#d4d4d4', marginTop: 10}}/>
                    <View style={{flex: 1, padding: 10}}>
                        <Text>{'您对景区的评分'}</Text>
                        <View style={{padding: 5}}>
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{marginRight: 10}}>{'景点行程'}</Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                    <Text style={{marginRight: 10}}>{'0'}</Text>
                                    <Slider
                                        style={{flex: 1}}
                                        minimumTrackTintColor={'#009688'}
                                        thumbTintColor={'#009688'}
                                        value={this.state.jdxc}
                                        minimumValue={0}
                                        step={1}
                                        maximumValue={5}
                                        onValueChange={value => this.setState({jdxc: value})}
                                    />
                                    <Text style={{marginLeft: 10}}>{this.state.jdxc}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{marginRight: 10}}>{'体能消耗'}</Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                    <Text style={{marginRight: 10}}>{'0'}</Text>
                                    <Slider
                                        style={{flex: 1}}
                                        minimumTrackTintColor={'#009688'}
                                        thumbTintColor={'#009688'}
                                        value={this.state.tnxh}
                                        minimumValue={0}
                                        step={1}
                                        maximumValue={5}
                                        onValueChange={value => this.setState({tnxh: value})}
                                    />
                                    <Text style={{marginLeft: 10}}>{this.state.tnxh}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{marginRight: 10}}>{'景色感受'}</Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                    <Text style={{marginRight: 10}}>{'0'}</Text>
                                    <Slider
                                        style={{flex: 1}}
                                        minimumTrackTintColor={'#009688'}
                                        thumbTintColor={'#009688'}
                                        value={this.state.jsgs}
                                        minimumValue={0}
                                        step={1}
                                        maximumValue={5}
                                        onValueChange={value => this.setState({jsgs: value})}
                                    />
                                    <Text style={{marginLeft: 10}}>{this.state.jsgs}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{marginRight: 10}}>{'周边美食'}</Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                    <Text style={{marginRight: 10}}>{'0'}</Text>
                                    <Slider
                                        style={{flex: 1}}
                                        minimumTrackTintColor={'#009688'}
                                        thumbTintColor={'#009688'}
                                        value={this.state.zbms}
                                        minimumValue={0}
                                        step={1}
                                        maximumValue={5}
                                        onValueChange={value => this.setState({zbms: value})}
                                    />
                                    <Text style={{marginLeft: 10}}>{this.state.zbms}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{borderTopWidth: 1, borderTopColor: '#d4d4d4', marginTop: 10}}/>
                    <View style={{flex: 1, padding: 10}}>
                        <View style={{padding: 5, borderWidth: 1, borderColor: '#d4d4d4', borderRadius: 4}}>
                            <TextInput
                                style={{textAlignVertical: 'top'}}
                                placeholder='分享您对景区的看法'
                                onChangeText={(text) => {
                                    this.setState({title: text})
                                }}
                                underlineColorAndroid={'transparent'}
                                multiline={true}
                                numberOfLines={5}
                                value={this.state.title}
                            />
                        </View>
                        {uploadImgs.length > 0 ? (
                            <View style={{flex: 1}}>
                                <FlatList
                                    numColumns={3}
                                    data={uploadImgs}
                                    keyExtractor={(item, index) => String(index)}
                                    renderItem={this._renderImg}
                                />
                            </View>
                        ) : null}
                        <TouchableOpacity onPress={() => {
                            if(uploadImgs.length >= 6){
                                alert('最多上传6张')
                            }else{
                                //打开上传照片
                                //判断图片类型是jpg
                            }
                        }} style={styles.upAddBtn}>
                            <Icons name={'ios-add'} size={36} color={'#d4d4d4'}/>
                            <Text style={{
                                fontSize: 15,
                                color: '#d4d4d4'
                            }}>{'上传照片'}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{borderTopWidth: 1, borderTopColor: '#d4d4d4', marginTop: 10}}/>
                    <View style={{padding:10}}>
                        <Text>{'请在景区地图上标注您的驻留位置'}</Text>
                        {/*地图区域*/}
                    </View>

                    <View style={{padding:10}}>
                        <TouchableOpacity onPress={() => {
                            //点击确定
                        }} style={styles.btn}>
                            <Text style={{
                                fontSize: 15,
                                color: '#fff'
                            }}>{'确认发布'}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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
        borderRadius: 4,
        backgroundColor: '#009688',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    upBtn: {
        flex:1,
        // width: 80,
        height: 80,
        // borderWidth: 1,
        // borderColor: '#d4d4d4',
        // borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    upAddBtn: {
        width: 80,
        height: 80,
        borderWidth: 1,
        borderColor: '#d4d4d4',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    }
});
