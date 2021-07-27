
import React from 'react';
import { Text, View } from 'react-native';
import { globalStyles } from '../../constant/Styles';
import WebSocketClient from '../../helper/manager/WebSocketClient';
import StatuBar from '../widget/StatuBar';
import BasePage from './BasePage';

export default class ChatListPage extends BasePage<{}> {

  constructor(props:any) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={globalStyles.container}>
        <StatuBar />
        <Text>列表</Text>
      </View>
    );
  }
}