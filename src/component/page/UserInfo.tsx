import { StackNavigationOptions } from '@react-navigation/stack';
import React, { FC } from 'react';
import { Alert, Button, Image, Text, TouchableOpacity, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { NativeStackNavigationOptions } from 'react-native-screens/lib/typescript/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect, createSelectorHook, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import Color from '../../constant/Color';
import { globalStyles } from "../../constant/Styles";
import User from '../../dto/User';
import { showConfirmModal } from '../../helper/utils/ModalUtil';
import { sp } from '../../helper/utils/ScreenUtil';
import { RootState } from '../../redux/Store';
import ProfileItem from '../widget/ProfileItem';
import StatuBar from '../widget/StatuBar';
import BasePage from "./BasePage";

class UserInfo extends BasePage<{}> {

  constructor(props: any) {
    super(props);

    let navOptions: NativeStackNavigationOptions = {
      ...this.baseNavigationOptions,
      headerShown: false
    }
    this.props.navigation.setOptions(navOptions)
  }

  gotoChangePwdPage() {
    this.props.navigation.navigate("ChangePwd");
  }

  gotoAdvicePage() {
    this.props.navigation.navigate("AdvicePage");
  }

  gotoEditPage() {
    this.props.navigation.navigate("EditUserInfo");
  }

  render () {
    console.log('render UserInfo');
    
    return (
      <View style={globalStyles.container}>
        <StatuBar />

        <TopUserView onPress={()=>{
          this.gotoEditPage();
        }}/>

        <ProfileItem style={{marginTop: 20}} icon="lock-closed-outline" title="重置密码" onPress={()=>{
          this.gotoChangePwdPage();
        }} />
        <ProfileItem style={{marginTop: 0}} icon='create-outline' title="建议与反馈" onPress={()=>{
          this.gotoAdvicePage();
        }} />
        <ProfileItem style={{marginTop: 0}} icon='exit-outline' title="退出登录" onPress={()=>{
          showConfirmModal('确认退出?', '', ()=>{
            this.props.navigation.replace('LoginPage');
          })
        }} />
      </View>
    );
  }
}

export default UserInfo;


const TopUserView = ({onPress}:{onPress: ()=>void}) => {

  const { user }:{user: User} = useSelector((state: RootState) => (state.userReducer));
  
  return (
    <TouchableWithoutFeedback onPress={()=>{
      onPress();
    }}>
      <View style={{backgroundColor: Color.white, flexDirection: 'row', paddingTop: 80, paddingBottom: 20, alignItems: 'center', paddingLeft: 20, paddingRight: 20}}>
        <Image style={{height: 80, width: 80, borderRadius: 10, backgroundColor: Color._e6ece9}} source={{uri: user.avatar}} />
        <View style={{flex: 1, paddingHorizontal: 10}}>
          <Text style={{fontWeight: 'bold', fontSize: sp(32), color: Color.default_fontColor}} numberOfLines={1}>{user.name}</Text>
          <Text style={{marginTop: 10, color: Color.default_fontColor, fontSize: sp(28)}} numberOfLines={1}>编号：{user.no}</Text>
        </View>
        <Icon name='chevron-forward-outline' size={20} color={Color.default_fontColor} />
      </View>
    </TouchableWithoutFeedback>
  );
}