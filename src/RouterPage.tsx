import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Icon from 'react-native-vector-icons/Ionicons';
import LoadingModal from "./component/modal/LoadingModal";
import AddFrientPage from "./component/page/AddFrientPage";
import AddressListPage from "./component/page/AddressListPage";
import AdvicePage from "./component/page/AdvicePage";
import ChangePwd from "./component/page/ChangePwd";
import ChatListPage from "./component/page/ChatListPage";
import EditUserInfo from "./component/page/EditUserInfo";
import ForgetPwd from "./component/page/ForgetPwd";
import LoginPage from "./component/page/LoginPage";
import NewFriendPage from "./component/page/NewFriendPage";
import UserInfo from "./component/page/UserInfo";

import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import SearchPage from "./component/page/SearchPage";
import ChatPage from "./component/page/ChatPage";
import ChatDetailPage from "./component/page/ChatDetailPage";
import UserDetail from "./component/page/UserDetail";
import ChatGroupListPage from "./component/page/ChatGroupListPage";
import CreateChatPage from "./component/page/CreateChatPage";


const MainStack = createStackNavigator();
const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();

enableScreens();
const NotModalStack = createNativeStackNavigator();

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
    <NotModalStack.Navigator initialRouteName='LoginPage' screenOptions={{headerShown: false, stackAnimation: 'slide_from_right'}}>
      {/* Tab */}
      <NotModalStack.Screen name="Tab" component={TabStackScreen} options={{title: '首页'}}></NotModalStack.Screen>
      {/* Screen */}
      <NotModalStack.Screen name="UserInfo" component={UserInfo} options={{title: '用户信息'}}></NotModalStack.Screen>
      <NotModalStack.Screen name="LoginPage" component={LoginPage} options={{title: '登陆'}}></NotModalStack.Screen>
      <NotModalStack.Screen name="ForgetPwd" component={ForgetPwd} options={{title: '忘记密码'}}></NotModalStack.Screen>
      <NotModalStack.Screen name="ChangePwd" component={ChangePwd} options={{title: '重置密码'}}></NotModalStack.Screen>
      <NotModalStack.Screen name="AdvicePage" component={AdvicePage} options={{title: '建议与反馈'}}></NotModalStack.Screen> 
      <NotModalStack.Screen name="EditUserInfo" component={EditUserInfo} options={{title: '编辑个人信息'}}></NotModalStack.Screen> 
      <NotModalStack.Screen name="NewFriendPage" component={NewFriendPage} options={{title: '新的朋友'}}></NotModalStack.Screen> 
      <NotModalStack.Screen name="AddFrientPage" component={AddFrientPage} options={{title: '添加好友'}}></NotModalStack.Screen> 
      <NotModalStack.Screen name="SearchPage" component={SearchPage} options={{title: '搜索'}}></NotModalStack.Screen> 
      <NotModalStack.Screen name="ChatPage" component={ChatPage} options={{title: '聊天'}}></NotModalStack.Screen> 
      <NotModalStack.Screen name="ChatDetailPage" component={ChatDetailPage} options={{title: '聊天信息'}}></NotModalStack.Screen> 
      <NotModalStack.Screen name="UserDetail" component={UserDetail} options={{title: '用户详情'}}></NotModalStack.Screen>
      <NotModalStack.Screen name="ChatGroupListPage" component={ChatGroupListPage} options={{title: '群聊列表'}}></NotModalStack.Screen>
      <NotModalStack.Screen name="CreateChatPage" component={CreateChatPage} options={{title: '选择联系人'}}></NotModalStack.Screen>

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