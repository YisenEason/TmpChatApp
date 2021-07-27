import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../../constant/Color';
import { sp } from '../../helper/utils/ScreenUtil';

type Props = {
  label?: String;
  isPassword?: Boolean
}

const Input: React.FC<Props & TextInputProps> = (props) => {

  console.log('aaa');
  
  const [ hidePassword, setHidePassword ] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={{fontSize: sp(32), color: Color._000000}}>{props.label}</Text>
      <View style={{justifyContent: 'center', alignItems:'center', flexDirection: 'row'}}>
        <TextInput {...props} secureTextEntry={hidePassword} style={{flex: 1, fontSize: sp(32), height: 50, color: Color._000000}} placeholderTextColor={Color._b4bbc3}></TextInput>
        {
          props.isPassword &&
          <TouchableOpacity style={{right: 0, paddingHorizontal: 10}} onPress={()=>{
            setHidePassword(!hidePassword);
          }}>
            <Icon name={hidePassword ? 'eye-outline' : 'eye-off-outline'} size={25}/>
          </TouchableOpacity>
        }
      </View>
      <View style={{height: 0.5, width: '100%', backgroundColor: Color._000000}}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
  }
})

export default Input;