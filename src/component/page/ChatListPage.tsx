
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

const dataSource = [{
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
}];

class ChatListPage extends BasePage<{}> {

  state = {
    dataSource: dataSource
  }

  constructor(props: any) {
    super(props);

    let navOptions: NativeStackNavigationOptions = {
      ...this.baseNavigationOptions,
      title: '聊天',
      headerRight: this._headerRightBtn
    }
    this.props.navigation.setOptions(navOptions)
  }

  componentDidMount() {
  }

  popUpView = () => {
    this.popupViewByALPageRef.current?.show();
  }

  popUpViewSelectAction = (index: number) => {
    console.log(index);
    if (index === 1) {
      this.props.navigation.navigate('AddFrientPage');
    }else if (index === 2) {
      this.props.navigation.navigate('SearchPage', {
        
      });
    }else if (index === 0) {
      this.props.navigation.navigate('CreateChatPage');
    }
  }

  popupViewByALPageRef: RefObject<PopupViewByALPage> = React.createRef();
  _headerRightBtnRef: RefObject<TouchableOpacity> = React.createRef();
  _headerRightBtn = () => {
    return (
      <TouchableOpacity ref={this._headerRightBtnRef} style={{ paddingHorizontal: 15 }} onPress={this.popUpView} onLayout={(layout) => {
        this.popupViewByALPageRef.current?.pointViewRef(this._headerRightBtnRef);
      }}>
        <Icon name='add-circle-outline' color={Color.default_actionColor} size={25}></Icon>
      </TouchableOpacity>
    );
  }

  _renderItem = ({item, index}) => {
    console.log(item.name);
    
    return (
      <ChatUserItem name={item.name} avatar={item.avatar} lastChat={item.lastChat} date={item.date} onTap={()=>{
        this.props.navigation.navigate('ChatPage', {
          name: item.name
        });
      }}  />
    );
  }

  render() {

    const { dataSource } = this.state;

    return (
      <View style={globalStyles.container}>
        <StatuBar />
        <FlatList 
          data={dataSource}
          renderItem={this._renderItem}
          keyExtractor={(item, index)=>(item+''+index)}
        />


        {/* 弹窗层 */}
        <PopupViewByALPage ref={this.popupViewByALPageRef} style={{ zIndex: 999 }} onSelect={this.popUpViewSelectAction} />

      </View>
    );
  }
}

export default ChatListPage;