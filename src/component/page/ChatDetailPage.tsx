import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackNavigationOptions } from 'react-native-screens/lib/typescript/native-stack';
import BasePage from './BasePage';
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../../constant/Color';
import { sp } from '../../helper/utils/ScreenUtil';
import { globalStyles } from '../../constant/Styles';
import { showConfirmModal } from '../../helper/utils/ModalUtil';
import { CHAT_TYPE } from './ChatPage';

type State = {
  chatType: CHAT_TYPE
}

export default class ChatDetailPage extends BasePage<{}> {

  state: State;

  constructor(props: any) {
    super(props);

    let navOptions: NativeStackNavigationOptions = {
      ...this.baseNavigationOptions,
      headerCenter: this._headerCenter,
      stackAnimation: 'default'
    }
    this.props.navigation.setOptions(navOptions)

    this.state = {
      chatType: CHAT_TYPE.GroupChat
    }
  }

  _headerCenter = () => {
    return <Text style={{ fontSize: sp(34) }}>{'聊天信息'}</Text>
  }

  _userItemView = (name: string, avatar: string, onTap?: () => void) => {
    return (
      <TouchableOpacity onPress={onTap}>
        <View style={{ width: 70, alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
          <Image style={{ height: 50, width: 50, borderRadius: 5, marginTop: 5 }} source={{ uri: avatar }} />
          <Text style={{ marginTop: 5, fontSize: sp(22), color: Color.default_fontColor }} numberOfLines={1}>{name}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {

    console.log(this.props);

    const { chatType } = this.state;

    return (
      <ScrollView style={globalStyles.container}>
        <View style={{ backgroundColor: Color.white, flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 10, paddingVertical: 10 }}>
          {
            [1, 2, 3, 4, 5, 6].map((item, index) => {
              return (
                <View style={{ width: '20%' }}>
                  {this._userItemView(item + '用户', 'https://tupian.qqw21.com/article/UploadPic/2021-7/202171622301582153.jpg', () => {
                    this.props.navigation.push('UserDetail');
                  })}
                </View>
              );
            })
          }
          <View style={{ width: '20%' }}>
            {this._userItemView('', 'https://img2.baidu.com/it/u=2923799513,3224783014&fm=26&fmt=auto&gp=0.jpg')}
          </View>
          <View style={{ width: '20%' }}>
            {this._userItemView('', 'https://tse3-mm.cn.bing.net/th/id/OIP-C.dr_750vMNqldrvN0xRhiKQAAAA?w=165&h=180&c=7&o=5&pid=1.7')}
          </View>
        </View>

        {
          chatType === CHAT_TYPE.SingleChat &&
          <View>
            <TouchableOpacity onPress={() => {
              this.props.navigation.push('SearchPage', {
                searchType: 'chat_history'
              });
            }}>
              <View style={{ backgroundColor: Color.white, marginTop: 20, padding: 15, justifyContent: 'center' }}>
                <Text>查找聊天记录</Text>
                <Icon style={{ position: 'absolute', right: 15 }} name='chevron-forward' color={Color.default_subFontColor} size={25}></Icon>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              // 清空操作
              showConfirmModal('提示', '确认清空聊天记录?', () => {
              })
            }}>
              <View style={{ backgroundColor: Color.white, marginTop: 20, padding: 15, justifyContent: 'center' }}>
                <Text>清空聊天记录</Text>
                <Icon style={{ position: 'absolute', right: 15 }} name='chevron-forward' color={Color.default_subFontColor} size={25}></Icon>
              </View>
            </TouchableOpacity>
          </View>
        }

        {
          chatType === CHAT_TYPE.GroupChat &&
          <View>

            <TouchableOpacity>
              <View style={{ backgroundColor: Color.white, marginTop: 20, padding: 15, justifyContent: 'center' }}>
                <Text>群聊名称</Text>
                <View style={{position: 'absolute', right: 15, flexDirection: 'row', alignItems: 'center'}}>
                  <Text>群聊123</Text>
                  <Icon style={{ }} name='chevron-forward' color={Color.default_subFontColor} size={25}></Icon>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={{ backgroundColor: Color.white, marginTop: 0.5, padding: 15, justifyContent: 'center' }}>
                <Text>群聊公告</Text>
                <Text style={{marginTop: 5, fontSize: sp(24), color: Color.default_subFontColor}}>每天准时打卡，准守群规</Text>
                <Icon style={{position: 'absolute', right: 15}} name='chevron-forward' color={Color.default_subFontColor} size={25}></Icon>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              this.props.navigation.push('SearchPage', {
                searchType: 'chat_history'
              });
            }}>
              <View style={{ backgroundColor: Color.white, marginTop: 20, padding: 15, justifyContent: 'center' }}>
                <Text>查找聊天记录</Text>
                <Icon style={{ position: 'absolute', right: 15 }} name='chevron-forward' color={Color.default_subFontColor} size={25}></Icon>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              // 清空操作
              showConfirmModal('提示', '请确认该操作?', () => {
              })
            }}>
              <View style={{ backgroundColor: Color.white, marginTop: 20, padding: 15, justifyContent: 'center' }}>
                <Text style={{textAlign: 'center', color: Color._f65257}}>删除并退出</Text>
              </View>
            </TouchableOpacity>
          </View>
        }

      </ScrollView>
    );
  }
}