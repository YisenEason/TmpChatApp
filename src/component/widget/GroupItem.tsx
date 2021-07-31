import React from 'react';
import { FC } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Color from '../../constant/Color';

type Props = {
  users: [],
  name: string,
  onTap?: ()=>void
}

const GroupItem: FC<Props> = ({users, name, onTap}) => {
  return (
    <TouchableOpacity onPress={onTap}>
      <View style={{backgroundColor: Color.white, height: 65, flexDirection: 'row', alignItems: 'center'}}>
        <View style={{backgroundColor: Color.default_divisionColor, borderRadius: 5, height: 52, width: 52, marginLeft: 15, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', padding: 2}}>
          {
            users.map((item:any)=>{
              return (
                <Image style={{height: 15, width: 15, margin: 0.5, borderRadius: 2}} source={{uri: item.avatar}} />
              );
            })
          }
        </View>
        <Text style={{marginLeft: 15}}>{name}</Text>
        <View style={{backgroundColor: Color.default_divisionColor, height: 0.5, width: '80%', position: 'absolute', right: 0, bottom: 0}} />
      </View>
    </TouchableOpacity>
  );
}

export default GroupItem;