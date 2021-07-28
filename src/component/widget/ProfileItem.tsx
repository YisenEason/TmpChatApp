import React, { FC } from "react";
import { Text, TouchableOpacity, View, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Color from "../../constant/Color";
import { sp } from "../../helper/utils/ScreenUtil";

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

export default ProfileItem;