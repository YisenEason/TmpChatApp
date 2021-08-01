import React from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';
import Color from '../../../constant/Color';
import { sp } from '../../../helper/utils/ScreenUtil';
import Icon from 'react-native-vector-icons/Ionicons';
import { DeviceEventEmitter } from 'react-native';
import sendMsgQueen, { SendMsgRespone } from './SendMsgQueen';
import { EmitterSubscription } from 'react-native';

type Props = {
  message: any;
}

export default class MessageItem extends React.PureComponent<Props> {

  state = {
    isSending: true,
    isErr: false
  }

  constructor(props) {
    super(props)
    console.log('aa');
    this.sendReqeset();
  }

  sendReqeset() {
    let key = this.props.message.message + new Date().getTime();
    let sub: EmitterSubscription = DeviceEventEmitter.addListener(key, (resp: SendMsgRespone)=>{
      console.log(resp);
      if (resp.isComplete) {
        this.state.isSending = false;
        this.state.isErr = false;
        this.forceUpdate();
      }
    });
    console.log(new Date());
    sendMsgQueen.addSubscription(key, sub);
  }

  render() {

    const isOwn = this.props.message && this.props.message.isOwn;
    const { isSending, isErr } = this.state;

    let alertView = null;
    if (isSending) {
      alertView = (
        <View style={[{ width: 10, position: 'absolute' }, isOwn ? { left: -25 } : { right: -25 }]}>
          <ActivityIndicator color={Color.default_subFontColor} />
        </View>
      )
    }else if (!isSending && isErr) {
      alertView = (
        <View style={[{ width: 20, position: 'absolute', justifyContent: 'center', alignItems: 'center' }, isOwn ? { left: -25 } : { right: -25 }]}>
          <TouchableOpacity>
            <Icon name='alert-circle' color={Color._f65257} size={18}></Icon>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={{ flexDirection: isOwn ? 'row-reverse' : 'row', padding: 10 }}>
        <View style={{ marginTop: 0 }}>
          <Image style={{ height: 35, width: 35, borderRadius: 5, backgroundColor: Color.white }} source={{ uri: this.props.message.avatar }} />
        </View>
        <View style={{ flex: 1, flexDirection: isOwn ? 'row-reverse' : 'row' }}>
          <View style={{ backgroundColor: isOwn ? '#95EC68' : 'white', marginLeft: isOwn ? 50 : 15, marginRight: isOwn ? 15 : 50, borderRadius: 5, padding: 10, justifyContent: 'center' }}>
            <Text style={{ lineHeight: sp(40), fontSize: sp(32), color: Color.default_fontColor }}>{this.props.message.message}</Text>
            {alertView}
          </View>
        </View>

      </View>
    );
  }
}