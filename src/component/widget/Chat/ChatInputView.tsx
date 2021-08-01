import React from 'react';
import { Text, TouchableOpacity, View, ViewStyle, TextInput, FlatList, Platform } from 'react-native';
import Color from '../../../constant/Color';
import { isIphoneX, getBottomSpace } from 'react-native-iphone-x-helper'
import { RefObject } from 'react';

type Props = {
  style?: ViewStyle,
  onSend: (text: string)=>void,
  listRef?: RefObject<FlatList>
}

export default class ChatInputView extends React.PureComponent <Props> {
  
  text: string = '';
  textInputRef: RefObject<TextInput> = React.createRef();

  onChangeText =(text: string) => {
    this.text = text;
  }

  onSend = () => {
    if (this.text.length <= 0) {
      return;
    }
    console.log('发送');
    const { onSend } = this.props;
    onSend && onSend(this.text);
    this.clear();
  }

  clear = () => {
    this.textInputRef.current?.clear();
    this.text = '';
  }

  render () {

    const { style, listRef } = this.props;

    return (
      <View style={{backgroundColor: '#f6f6f6', paddingHorizontal: 10, paddingVertical: 8, flexDirection: 'row', alignItems: 'center', paddingBottom: isIphoneX()?getBottomSpace()+8:8}}>
        <View style={[{backgroundColor: Color.white, maxHeight: 100, minHeight: 40, justifyContent: 'center', flex: 1, borderRadius: 10, paddingHorizontal: 10}, {...style}]}>
          <TextInput ref={this.textInputRef} style={{paddingVertical: 5}} multiline returnKeyType='default' placeholder='请输入...' 
          onFocus={()=>{
            setTimeout(() => {
              listRef?.current?.scrollToEnd({animated: true});
            }, Platform.OS === 'ios' ? 100 : 300);
          }}
          onChangeText={this.onChangeText} />
        </View>
        <TouchableOpacity style={{marginLeft: 15, marginHorizontal: 10}} onPress={()=>{
          this.onSend();
        }}>
          <Text style={{color: Color.default_actionColor}}>发送</Text>
        </TouchableOpacity>
      </View>
    );
  }
}