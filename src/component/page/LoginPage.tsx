import React from "react";
import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from "react-native";
import Input from "../widget/Input";
import BasePage from "./BasePage";
import StatuBar from "../widget/StatuBar";
import { globalStyles } from "../../constant/Styles";
import { ScrollView } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/Ionicons';
import { StackNavigationOptions } from "@react-navigation/stack";
import Color from "../../constant/Color";
import { sp } from "../../helper/utils/ScreenUtil";
import userManager from "../../helper/manager/UserManager";

type Props = {
}

class LoginPage extends BasePage<Props> {

  username: String = '';
  password: String = '';

  state = {
    isLoading: false,
    allowSubmit: false,
  }

  constructor(props: any) {
    super(props);

    let navOptions: StackNavigationOptions = {
      ...this.baseNavigationOptions,
      headerShown: false
    }
    this.props.navigation.setOptions(navOptions)
  }

  componentDidMount() {
  }

  login() {
    this.setState({
      isLoading: true
    })
    // 请求中
    setTimeout(() => {

      Alert.alert(`account: ${this.username} \n password: ${this.password}`);
      this.gotoTabPage();
      this.setState({
        isLoading: false
      })
      userManager.saveUser({
        name: 'abc',
        no: 'ab12323cc',
        avatar: 'http://m.imeitou.com/uploads/allimg/2021060310/yiuviwkiqho-lp.jpg'
      });
      userManager.fetchFriends();
    }, 1000);
  }

  setAllowSubmit() {
    let allowSubmit = false;
    if (this.username.length > 0 && this.password.length > 0) {
      allowSubmit = true;
    } else {
      allowSubmit = false;
    }
    this.setState({
      allowSubmit: allowSubmit
    })
  }

  gotoForgetPwdPage() {
    this.props.navigation.navigate("ForgetPwd");
  }

  gotoTabPage() {
    this.props.navigation.replace("Tab");
  }

  render() {

    const { isLoading, allowSubmit } = this.state;

    return (
      <View style={[globalStyles.container]}>
        <StatuBar />
        <ScrollView style={{ flex: 1 }} scrollEnabled={false}>
          <TouchableOpacity style={{ position: 'absolute', top: 100, right: 30 }} onPress={this.gotoForgetPwdPage.bind(this)}>
            <Text style={{ color: Color.default_actionColor, fontSize: sp(32) }}>忘记密码</Text>
          </TouchableOpacity>

          <View style={{ marginTop: 180 }}>
            <Text style={{ color: Color._000000, paddingHorizontal: 30, fontSize: sp(60) }}>登录</Text>
            <View style={{ paddingHorizontal: 30, marginTop: 40 }}>
              <Input label='账号:' placeholder='请输入账号' onChangeText={(text) => {
                this.username = text;
                this.setAllowSubmit();
              }}></Input>
            </View>
            <View style={{ paddingHorizontal: 30, marginTop: 20 }}>
              <Input isPassword={true} label='密码:' placeholder='请输入密码' onChangeText={(text) => {
                this.password = text;
                this.setAllowSubmit();
              }}></Input>
            </View>
            <TouchableOpacity disabled={isLoading || !allowSubmit} onPress={() => {
              this.login();
            }} style={{ width: 80, height: 80, alignSelf: 'flex-end', marginTop: 30, marginRight: 30, justifyContent: 'center', alignItems: 'center' }}>
              {
                isLoading ?
                  <ActivityIndicator size={'large'} color={Color.default_actionColor} /> :
                  <Icon name="chevron-forward-circle-outline" size={80} color={Color.default_actionColor} style={{ opacity: allowSubmit ? 1 : 0.3 }} />
              }
            </TouchableOpacity>
          </View>
        </ScrollView>

      </View>
    )
  }

}

export default LoginPage;