import React from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';
import { NativeStackNavigationOptions } from 'react-native-screens/lib/typescript/native-stack';
import { globalStyles } from '../../constant/Styles';
import { QueryUtil } from '../../helper/utils/QueryUtil';
import { SqlUtil } from '../../helper/utils/SqlUtil';
import { SetFriendAction } from '../../redux/actions/FriendActions';
import { appDispatch } from '../../redux/Store';
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
    SqlUtil.initDB();
    SqlUtil.initAllTable();
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
      this.props.navigation.replace('LoginPage');
    }, 1000);
  }

  render () {

    const { label } = this.state;

    return (
      <View style={[globalStyles.container, {alignItems:'center', justifyContent: 'center'}]}>
        <View>
          <ActivityIndicator />
          <Text style={{marginTop: 30}}>{label}...</Text>
          <Button title="打开数据库" onPress={()=>{
            SqlUtil.initDB();
          }}></Button>
          <Button title="创建表" onPress={()=>{
            SqlUtil.initAllTable();
          }}></Button>
          <Button title="删除表" onPress={()=>{
            SqlUtil.deleteDB();
          }}></Button>
          <Button title="查询好友" onPress={()=>{
            QueryUtil.queryFrient();
          }}></Button>
          {/* <Button title="新增好友" onPress={()=>{
            QueryUtil.addFriend(4,'123','https://tupian.qqw21.com/article/UploadPic/2021-7/202171622301582153.jpg', 322);
          }}></Button> */}
        </View>
      </View>
    );
  }
}