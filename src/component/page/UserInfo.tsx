import { StackNavigationOptions } from '@react-navigation/stack';
import React, { FC } from 'react';
import { Button, Image, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../../constant/Color';
import { globalStyles } from "../../constant/Styles";
import { sp } from '../../helper/utils/ScreenUtil';
import StatuBar from '../widget/StatuBar';
import BasePage from "./BasePage";

export default class UserInfo extends BasePage<{}> {

  constructor(props: any) {
    super(props);

    let navOptions: StackNavigationOptions = {
      ...this.baseNavigationOptions,
      headerShown: false
    }
    this.props.navigation.setOptions(navOptions)
  }

  render () {
    return (
      <View style={globalStyles.container}>
        <StatuBar />
        <View style={{backgroundColor: Color.white, flexDirection: 'row', paddingTop: 100, paddingBottom: 20, alignItems: 'center', paddingLeft: 30, paddingRight: 20}}>
          <Image style={{height: 80, width: 80, borderRadius: 10}} source={{uri: 'http://m.imeitou.com/uploads/allimg/2021060310/yiuviwkiqho-lp.jpg'}} />
          <View style={{flex: 1, paddingHorizontal: 10}}>
            <Text style={{fontWeight: 'bold', fontSize: sp(32), color: Color.default_fontColor}} numberOfLines={1}>我的昵称我的昵称</Text>
            <Text style={{marginTop: 10, color: Color.default_fontColor, fontSize: sp(28)}} numberOfLines={1}>编号：sdlfkjsdlkfj</Text>
          </View>
          <Icon name='chevron-forward-outline' size={20} color={Color.default_fontColor} />
        </View>
        <ProfileItem style={{marginTop: 20}} icon='construct-outline'  division={false} title='字典' onPress={()=>{}} />
        <ProfileItem style={{marginTop: 20}} icon="lock-closed-outline" title="聊天密码" onPress={()=>{}} />
        <ProfileItem style={{marginTop: 0}} icon='create-outline' title="帮助与反馈" onPress={()=>{}} />
        <ProfileItem style={{marginTop: 0}} icon='settings-outline' title="设置" division={false} onPress={()=>{}} />
        <Button title="退出登录" onPress={()=>{
          this.props.navigation.replace('LoginPage');
        }}></Button>
      </View>
    );
  }
}

const ProfileItem: FC<{
  style?:ViewStyle,
  division?:Boolean,
  title: String,
  icon: String | undefined
  onPress: ()=>void
}> = ({style, division=true, title, onPress, icon}) => {
  return (
    <TouchableOpacity style={{...style}} onPress={onPress}>
      <View style={{backgroundColor: Color.white, paddingVertical: 15, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center'}}>
        <Icon name={icon} size={20} color={Color.default_fontColor} />
        <Text style={{flex: 1, marginLeft: 10,fontSize: sp(32)}}>{title}</Text>
        <Icon name='chevron-forward-outline' size={20} color={Color.default_fontColor} />
      </View>
      {
        division &&
        <View style={{height: 0.5, width: '100%', backgroundColor: Color.default_divisionColor, position: 'absolute', bottom:0}} />
      }
    </TouchableOpacity>
  );
}