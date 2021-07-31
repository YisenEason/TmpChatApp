import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { NativeStackNavigationOptions } from 'react-native-screens/lib/typescript/native-stack';
import BasePage from './BasePage';
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../../constant/Color';
import { sp } from '../../helper/utils/ScreenUtil';

export enum CHAT_TYPE{
  'SingleChat',
  'GroupChat'
};

export default class ChatPage extends BasePage<{}> {

  constructor(props: any) {
    super(props);

    let navOptions: NativeStackNavigationOptions = {
      ...this.baseNavigationOptions,
      headerRight: this._headerRightBtn,
      headerCenter: this._headerCenter,
    }
    this.props.navigation.setOptions(navOptions)
  }

  _headerRightBtn = () => {
    return (
      <TouchableOpacity onPress={()=>{
        this.props.navigation.push('ChatDetailPage', {
          ChatType: CHAT_TYPE.SingleChat
        });
      }}>
        <Icon name='ellipsis-horizontal-outline' color={Color.default_actionColor} size={25}></Icon>
      </TouchableOpacity>
    );
  }

  _headerCenter = () => {
    return <Text style={{fontSize: sp(34)}}>{this.props.route.params.name}</Text>
  }

  render () {

    console.log(this.props);
    
    return (
      <View>

      </View>
    );
  }
}