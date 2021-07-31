import { StackNavigationOptions } from '@react-navigation/stack';
import React, { FC } from 'react';
import { Alert, Button, Image, Text, TouchableOpacity, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { NativeStackNavigationOptions } from 'react-native-screens/lib/typescript/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect, createSelectorHook, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import Color from '../../constant/Color';
import { globalStyles } from "../../constant/Styles";
import { showConfirmModal } from '../../helper/utils/ModalUtil';
import { sp } from '../../helper/utils/ScreenUtil';
import { RootState } from '../../redux/Store';
import ProfileItem from '../widget/ProfileItem';
import StatuBar from '../widget/StatuBar';
import BasePage from "./BasePage";

class UserDetail extends BasePage<{}> {

  constructor(props: any) {
    super(props);

    let navOptions: NativeStackNavigationOptions = {
      ...this.baseNavigationOptions,
      headerCenter: this._headerCenter,
    }
    this.props.navigation.setOptions(navOptions)
  }

  _headerCenter = () => {
    return <Text style={{fontSize: sp(34)}}>{''}</Text>
  }


  render () {
    
    return (
      <View style={globalStyles.container}>
        <StatuBar />
        <View style={{backgroundColor: Color.white}}>
          <View style={{backgroundColor: Color.white, flexDirection: 'row', paddingVertical: 30, paddingHorizontal: 20}}>
            <Image style={{height: 80, width: 80, borderRadius: 10, backgroundColor: Color._e6ece9}} source={{uri: ''}} />
            <View style={{flex: 1, paddingHorizontal: 10, paddingTop: 0}}>
              <Text style={{fontSize: sp(32), color: Color.default_fontColor}} numberOfLines={1}>{'周小七'}</Text>
              <Text style={{marginTop: 5, color: Color.default_subFontColor, fontSize: sp(28)}} numberOfLines={1}>编号：{'12312'}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={()=>{
          this.props.navigation.navigate('ChatPage', {
            user: '聊天'
          });
        }}>
          <View style={{backgroundColor: Color.white, marginTop: 10, padding: 15, justifyContent: 'center', flexDirection: 'row', alignItems: 'center'}}>
            <Icon style={{}} name='chatbubble-outline' color={Color.default_actionColor} size={18}></Icon>
            <Text style={{color: Color.default_actionColor, textAlign: 'center', marginLeft: 5}}>发消息</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default UserDetail;