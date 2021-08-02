import React from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';
import { NativeStackNavigationOptions } from 'react-native-screens/lib/typescript/native-stack';
import { globalStyles } from '../../constant/Styles';
import { SqlUtil } from '../../helper/utils/SqlUtil';
import BasePage from './BasePage';

export default class CheckServerPage extends BasePage<{}> {

  state = {
    label: '' 
  }

  constructor(props: any) {
    super(props);

    let navOptions: NativeStackNavigationOptions = {
      ...this.baseNavigationOptions,
      headerShown: false
    }
    this.props.navigation.setOptions(navOptions)
  }

  componentDidMount() {
    this.checkServer();
  }

  checkServer() {
    this.setState({
      label: '检查服务器中' 
    })
    setTimeout(() => {
      this.updateChatData();
    }, 1000);
  }

  updateChatData( ) {
    this.setState({
      label: '更新数据中'
    })
    setTimeout(() => {
      // this.props.navigation.replace('LoginPage');
    }, 1000);
  }

  render () {

    const { label } = this.state;

    return (
      <View style={[globalStyles.container, {alignItems:'center', justifyContent: 'center'}]}>
        <View>
          <ActivityIndicator />
          <Text style={{marginTop: 30}}>{label}...</Text>
          <Button title="创建数据库" onPress={()=>{
            SqlUtil.executeSQL('SELECT * FROM sqlite_sequence LIMIT 1000');
          }}></Button>
        </View>
      </View>
    );
  }
}