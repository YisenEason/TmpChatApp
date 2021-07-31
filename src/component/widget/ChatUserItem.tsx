import React from 'react';
import { FC } from 'react';
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import Color from '../../constant/Color';
import { sp } from '../../helper/utils/ScreenUtil';

const ChatUserItem: FC<{
  onTap?: (id: string) =>void,
  avatar: string,
  name: string,
  lastChat: string,
  date: string
}> = ({onTap, avatar, name='', lastChat='未找到最近聊天记录', date=''}) => {
  return (
    <TouchableOpacity onPress={()=>{onTap && onTap('')}}>
      <View style={{ backgroundColor: Color.white, flexDirection: 'row', height: 65, alignItems: 'center' }}>
        <View style={{ paddingHorizontal: 16 }}>
          <Image style={{ height: 40, width: 40, borderRadius: 5, backgroundColor: Color.default_divisionColor }} source={{ uri: avatar }} />
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{ color: Color.default_fontColor, fontSize: sp(32), paddingBottom:3 }} numberOfLines={1}>{name}</Text>
            <Text style={{ color: Color.default_subFontColor, fontSize: sp(26), paddingBottom:3, marginRight: 15 }} numberOfLines={1}>{date}</Text>
          </View>
          <View style={{width: '100%', paddingRight: 20, marginTop: Platform.OS =='ios' ? 5 : 0}}>
            <Text style={{ color: Color.default_subFontColor, fontSize: sp(26) }} numberOfLines={1}>{lastChat}</Text>
          </View>
        </View>
        <View style={{ position: 'absolute', bottom: 0, left: 72, width: '100%', backgroundColor: Color.default_divisionColor, height: 0.5 }} />
      </View>
    </TouchableOpacity>
  );
}

export default ChatUserItem;