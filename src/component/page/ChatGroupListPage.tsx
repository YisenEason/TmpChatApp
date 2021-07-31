
import React, { RefObject } from 'react';
import { Button, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { globalStyles } from '../../constant/Styles';
import StatuBar from '../widget/StatuBar';
import BasePage from './BasePage';
import { refreshUserInfoAction } from '../../redux/actions/UserActions';
import userManager from '../../helper/manager/UserManager';
import { StackNavigationOptions } from '@react-navigation/stack';
import PopupViewByALPage from '../widget/PopupViewByALPage';
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../../constant/Color';
import { NativeStackNavigationOptions } from 'react-native-screens/lib/typescript/native-stack';
import ChatUserItem from '../widget/ChatUserItem';
import GroupItem from '../widget/GroupItem';
import { sp } from '../../helper/utils/ScreenUtil';



const groupDataSource = {
  users: [{
    name: '周冰',
    avatar: 'https://tupian.qqw21.com/article/UploadPic/2021-7/202171622301582153.jpg',
    lastChat: '最近好吗',
    date: '星期一'
  },{
    name: '明小二',
    avatar: 'https://tupian.qqw21.com/article/UploadPic/2021-7/202171421564081031.jpeg',
    lastChat: '明天去玩不',
    date: '星期五'
  },{
    name: '小七',
    avatar: 'https://tupian.qqw21.com/article/UploadPic/2021-5/202152118133933757.jpg',
    lastChat: '我知道有家店的菜很好吃，找个时间，我们一起去试下，保证你满意',
    date: '星期五'
  }],
  chat: ['123123', '1232132', '234324']
};

const groups = [
  groupDataSource
]

class ChatGroupListPage extends BasePage<{}> {

  state = {
    dataSource: groups
  }

  constructor(props: any) {
    super(props);

    let navOptions: NativeStackNavigationOptions = {
      ...this.baseNavigationOptions,
      title: '群聊',
      headerCenter: this._headerCenter
    }
    this.props.navigation.setOptions(navOptions)
  }

  componentDidMount() {
  }

  _headerCenter = () => {
    return <Text style={{ fontSize: sp(34) }}>{'聊天信息'}</Text>
  }

  _renderItem = ({item, index}) => {
    console.log(item);
    
    return (
      <GroupItem users={item.users} name='工作1群' onTap={()=>{
        this.props.navigation.navigate('ChatPage', {
          name: '工作1群'
        });
      }} />
    );
  }

  _renderListFooterComponent = () => {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', height: 50}}>
        <Text style={{color: Color.default_subFontColor}}>1个群聊</Text>
      </View>
    );
  }

  render() {

    const { dataSource } = this.state;

    return (
      <View style={[globalStyles.container, {backgroundColor: Color.white}]}>
        <StatuBar />
        <FlatList 
          data={dataSource}
          renderItem={this._renderItem}
          keyExtractor={(item, index)=>(item+''+index)}
          ListFooterComponent={this._renderListFooterComponent}
        />
      </View>
    );
  }
}

export default ChatGroupListPage;