import React, { FC } from 'react';
import { Image, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../../constant/Color';
import User from '../../dto/User';
import { sp } from '../../helper/utils/ScreenUtil';

type Props = {
  onTap?: () => void
  icon?: string,
  user: User
}

const FriendItem: FC<Props> = ({ user = { nickname: '未知用户' }, onTap, icon }) => {
  return (
    <TouchableOpacity onPress={onTap}>
      <View style={{ backgroundColor: Color.white, flexDirection: 'row', height: 55, alignItems: 'center' }}>
        <View style={{ paddingHorizontal: 16 }}>
          {
            icon !== undefined &&
            <View style={{ height: 40, width: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: Color._a5e8f0, borderRadius: 5 }}>
              <Icon name={icon} size={23} color={Color.white} />
            </View>
          }
          {
            icon === undefined &&
            <Image style={{ height: 40, width: 40, borderRadius: 5, backgroundColor: Color.default_divisionColor }} source={{ uri: user.avatar }} />
          }
        </View>
        <Text style={{ color: Color.default_fontColor, fontSize: sp(28) }}>{user.nickname}</Text>
        <View style={{ position: 'absolute', bottom: 0, left: 72, width: '100%', backgroundColor: Color.default_divisionColor, height: 0.5 }} />
      </View>
    </TouchableOpacity>
  );
}

export default FriendItem;
