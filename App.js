/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import { Text } from 'react-native';
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from './Home';
import Collection from './Collection';
import GuideList from './GuideList';
import My from './My';

import Login from './Login';
import Regist from './Regist';
import ViewList from './ViewList';
import ViewDetail from './ViewDetail';
import GuidePublish from './GuidePublish';
import GuidePublishDetail from './GuidePublishDetail';
import ViewCollection from './ViewCollection';
import PlanCollectionDetail from './PlanCollectionDetail';
import PlanCollection from './PlanCollection';
console.disableYellowBox = true;
console.warn("YellowBox is disabled.");

const FootTab = createBottomTabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            title: "首页",
            tabBarIcon:({ focused, horizontal, tintColor })=>{
                return <Ionicons name={'ios-home'} size={25} style={{color:tintColor}}/>
            }
        }
    },
    GuideList: {
        screen: GuideList,
        navigationOptions: {
            title: "攻略",
            tabBarIcon:({ focused, horizontal, tintColor })=>{
                let iconName = `book${focused ? '' : '-outline'}`;
                return <MaterialCommunityIcons name={iconName} size={25} style={{color:tintColor}}/>
            }
        }
    },
    Collection: {
        screen: Collection,
        navigationOptions: {
            title: "收藏",
            tabBarIcon:({ focused, horizontal, tintColor })=>{
                let iconName = `ios-star${focused ? '' : '-outline'}`;
                return <Ionicons name={iconName} size={25} style={{color:tintColor}}/>
            }
        }
    },
    My: {
        screen: My,
        navigationOptions: {
            title: "我的",
            tabBarIcon:({ focused, horizontal, tintColor })=>{
                let iconName = `settings${focused ? '' : '-outline'}`;
                return <MaterialCommunityIcons name={iconName} size={25} style={{color:tintColor}}/>
            }
        }
    },
}, {
    tabBarOptions: {
        activeTintColor: '#009688',
        inactiveTintColor: 'gray',

    },
});

const RootStack = createStackNavigator({
    Login: { screen: Login },
    Regist: { screen: Regist },
    FootTab: { screen: FootTab},
    ViewList: { screen: ViewList},
    ViewDetail: { screen: ViewDetail},
    GuidePublish: { screen: GuidePublish},
    GuidePublishDetail: { screen: GuidePublishDetail},
    ViewCollection: { screen: ViewCollection},
    PlanCollection:{ screen: PlanCollection},
    PlanCollectionDetail: { screen: PlanCollectionDetail},

}, {
    initialRouteName: 'FootTab', // 默认显示界面
    defaultNavigationOptions: {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
        // title:'消息',
        header: null,
        gesturesEnabled: false,

    },
    mode: 'card',  // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
    headerMode: 'screen', // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
    onTransitionStart: (transitionProps,prevTransitionProps) => {
    },
    onTransitionEnd: (transitionProps,prevTransitionProps) => {
    }
});

export default createAppContainer(RootStack);