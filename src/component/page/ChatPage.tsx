import React from 'react';
import { FlatList, ScrollView, Text, TextInput, TouchableOpacity, View, Animated, Button, Platform } from 'react-native';
import { NativeStackNavigationOptions } from 'react-native-screens/lib/typescript/native-stack';
import BasePage from './BasePage';
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../../constant/Color';
import { sp } from '../../helper/utils/ScreenUtil';
import { globalStyles } from '../../constant/Styles';
import { KeyboardAccessoryView } from '@flyerhq/react-native-keyboard-accessory-view'
import { GestureResponderHandlers } from 'react-native'
import ChatInputView from '../widget/Chat/ChatInputView';
import { RefObject } from 'react';
import { isIphoneX, getBottomSpace } from 'react-native-iphone-x-helper'
import MessageItem from '../widget/Chat/MessageItem';

export enum CHAT_TYPE{
  'SingleChat',
  'GroupChat'
};

const data = [
  // {
  //   message: '明天出来吃饭',
  //   avatar: 'https://tupian.qqw21.com/article/UploadPic/2021-7/202171622301582153.jpg',
  //   isOwn: false,
  // },
  // {
  //   message: '👌，明天几点',
  //   avatar: 'https://tupian.qqw21.com/article/UploadPic/2021-5/202152118133933757.jpg',
  //   isOwn: true
  // },
  // {
  //   message: '我想下，迟点告诉你',
  //   avatar: 'https://tupian.qqw21.com/article/UploadPic/2021-7/202171622301582153.jpg',
  //   isOwn: false,
  // },
  // {
  //   message: '确定后你和我说，我准备系',
  //   avatar: 'https://tupian.qqw21.com/article/UploadPic/2021-5/202152118133933757.jpg',
  //   isOwn: true,
  // },
  // {
  //   message: '好',
  //   avatar: 'https://tupian.qqw21.com/article/UploadPic/2021-7/202171622301582153.jpg',
  //   isOwn: false,
  // },
  // {
  //   message: '想好了，明天下午5点，广州酒家不见不散',
  //   avatar: 'https://tupian.qqw21.com/article/UploadPic/2021-7/202171622301582153.jpg',
  //   isOwn: false,
  // },{
  //   message: '行，明天见',
  //   avatar: 'https://tupian.qqw21.com/article/UploadPic/2021-5/202152118133933757.jpg',
  //   isOwn: true,
  // }
]

export default class ChatPage extends BasePage<{}> {

  state = {
    dataSource: data
  }

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
    // const title = this.props.route.params ? this.props.route.params.title : '';
    return <Text style={{fontSize: sp(34)}}>{this.props.route.params.name}</Text>
  }

  _listRef: RefObject<FlatList> = React.createRef();
  _renderScrollable = (panHandlers: GestureResponderHandlers) => (
    <FlatList
      ref={this._listRef}
      data={this.state.dataSource}
      // inverted
      keyboardDismissMode='interactive'
      keyExtractor={(item ,index)=>(item+''+index)}
      renderItem={this._renderItem}
      showsHorizontalScrollIndicator={false}
      {...panHandlers}
    />
  )

  _renderItem = ({item, index}) => (
    <MessageItem message={item} />
  )

  render () {
    
    return (
      <View style={[globalStyles.container, {}]}>
        <KeyboardAccessoryView
          contentContainerStyle={{marginBottom: 0}}
          renderScrollable={this._renderScrollable}
          spaceBetweenKeyboardAndAccessoryView={-getBottomSpace()}
          contentOffsetKeyboardOpened={0}
        >
          <ChatInputView listRef={this._listRef} onSend={(text)=>{
            if (this.state.dataSource.length % 2 === 0) {
              this.setState({
                dataSource: [...this.state.dataSource, {
                  message: text,
                  avatar: 'https://tupian.qqw21.com/article/UploadPic/2021-5/202152118133933757.jpg',
                  isOwn: true,
                }]
              })
            }else {
              this.setState({
                dataSource: [...this.state.dataSource, {
                  message: text,
                  avatar: 'https://tupian.qqw21.com/article/UploadPic/2021-7/202171622301582153.jpg',
                  isOwn: false,
                }]
              })
            }
            setTimeout(() => {
              this._listRef.current?.scrollToEnd({animated: Platform.OS ==='ios' ? true : false});
            }, 100);
          }}/>
        </KeyboardAccessoryView>
      </View>
    );
  }
}