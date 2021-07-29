
import React, { RefObject } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
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

class ChatListPage extends BasePage<{}> {

  constructor(props: any) {
    super(props);

    let navOptions: StackNavigationOptions = {
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


  render() {
    return (
      <View style={globalStyles.container}>
        <StatuBar />
        <Text>列表sdfsfs</Text>
        <PopupViewByALPage ref={this.popupViewByALPageRef} style={{ zIndex: 999 }} onSelect={this.popUpViewSelectAction} />

      </View>
    );
  }
}

export default ChatListPage;