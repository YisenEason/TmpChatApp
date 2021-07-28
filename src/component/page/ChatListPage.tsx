
import React from 'react';
import { Button, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { globalStyles } from '../../constant/Styles';
import StatuBar from '../widget/StatuBar';
import BasePage from './BasePage';
import { refreshUserInfoAction } from '../../redux/actions/UserActions';
import userManager from '../../helper/manager/UserManager';

class ChatListPage extends BasePage<{}> {

  constructor(props:any) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={globalStyles.container}>
        <StatuBar />
        <Text>列表sdfsfs</Text>
      </View>
    );
  }
}

export default ChatListPage;