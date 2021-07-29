import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, NavigationContainerRef, ParamListBase, RouteProp } from "@react-navigation/native";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import React, { RefObject } from "react";
import { Platform, Text, View } from "react-native";
import { Lightbox, Router, Scene } from "react-native-router-flux";
import Icon from 'react-native-vector-icons/Ionicons';
import LoadingModal from "./component/modal/LoadingModal";
import AddFrientPage from "./component/page/AddFrientPage";
import AddressListPage from "./component/page/AddressListPage";
import AdvicePage from "./component/page/AdvicePage";
import ChangePwd from "./component/page/ChangePwd";
import ChatListPage from "./component/page/ChatListPage";
import EditUserInfo from "./component/page/EditUserInfo";
import FirstPage from "./component/page/FirstPage";
import ForgetPwd from "./component/page/ForgetPwd";
import LoginPage from "./component/page/LoginPage";
import NewFriendPage from "./component/page/NewFriendPage";
import UserInfo from "./component/page/UserInfo";
import Header from "./component/widget/Header";
import LoginPageContainer from "./redux/container/LoginPageContainer";

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const NotModalStack = createStackNavigator();

function ChatTabScreen() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="ChatListPage" component={ChatListPage} />
    </MainStack.Navigator>
  );
}

function UserInfoTabScreen() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="UserInfo" component={UserInfo} />
    </MainStack.Navigator>
  );
}

function AddressListTabScreen() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="AddressListPage" component={AddressListPage} />
    </MainStack.Navigator>
  );
}

function TabStackScreen() {
  return (
    <Tab.Navigator screenOptions={({route})=>({
      tabBarIcon: ({focused,size,color})=>{
        if (route.name === '聊天') {
          return (<Icon style={{marginTop: 3}} name='chatbubbles-outline' size={size} color={color} />);
        }else if (route.name === '我') {
          return (<Icon style={{marginTop: 3}} name='person-outline' size={size} color={color} />);
        }else if (route.name === '通讯录') {
          return (<Icon style={{marginTop: 3}} name='people-circle-outline' size={size} color={color} />);
        }
      }
    })}>
      <Tab.Screen name="聊天" component={ChatTabScreen} />
      <Tab.Screen name="通讯录" component={AddressListTabScreen} />
      <Tab.Screen name="我" component={UserInfoTabScreen} />
    </Tab.Navigator>
  );
}

function NotModalScrren() {
  return (
    <NotModalStack.Navigator mode='card' initialRouteName='LoginPage' screenOptions={{headerShown: false, cardStyleInterpolator: Platform.OS === 'ios' ? CardStyleInterpolators.forHorizontalIOS : CardStyleInterpolators.forFadeFromBottomAndroid}}>
      {/* Tab */}
      <NotModalStack.Screen name="Tab" component={TabStackScreen} options={{title: '首页'}}></NotModalStack.Screen>
      {/* Screen */}
      <NotModalStack.Screen name="UserInfo" component={UserInfo}></NotModalStack.Screen>
      <NotModalStack.Screen name="LoginPage" component={LoginPage}></NotModalStack.Screen>
      <NotModalStack.Screen name="ForgetPwd" component={ForgetPwd}></NotModalStack.Screen>
      <NotModalStack.Screen name="ChangePwd" component={ChangePwd} options={{title: '重置密码'}}></NotModalStack.Screen>
      <NotModalStack.Screen name="AdvicePage" component={AdvicePage} options={{title: '建议与反馈'}}></NotModalStack.Screen> 
      <NotModalStack.Screen name="EditUserInfo" component={EditUserInfo} options={{title: '编辑个人信息'}}></NotModalStack.Screen> 
      <NotModalStack.Screen name="NewFriendPage" component={NewFriendPage}></NotModalStack.Screen> 
      <NotModalStack.Screen name="AddFrientPage" component={AddFrientPage} options={{title: '添加好友'}}></NotModalStack.Screen> 

    </NotModalStack.Navigator>
  );
}

export let rootNavRef: NavigationContainerRef | null;

export default class RouterPage extends React.Component {
  render () {
    
    return (
      <NavigationContainer ref={(ref)=>{rootNavRef=ref}}>
        <RootStack.Navigator initialRouteName="NotModalScrren" mode='modal'>
          {/* Screen */}
          <RootStack.Screen name="NotModalScrren" component={NotModalScrren} options={{headerShown: false}} />
          {/* modal */}
          <RootStack.Screen name="LoadingModal" component={LoadingModal} options={{headerShown:false, cardStyle: {backgroundColor: 'transparent'}, animationEnabled: false}} />
        </RootStack.Navigator>
      </NavigationContainer>
    )
  }
}