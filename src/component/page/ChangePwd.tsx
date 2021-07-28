import { StackNavigationOptions } from '@react-navigation/stack';
import React from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../../constant/Color';
import { globalStyles } from "../../constant/Styles";
import { hideLoading, showLoading } from '../../helper/utils/ModalUtil';
import { sp } from '../../helper/utils/ScreenUtil';
import Input from '../widget/Input';
import StatuBar from '../widget/StatuBar';
import BasePage from "./BasePage";

export default class ChangePwd extends BasePage<{}> {

	oldPassword: string = '';
	newPassword: string = '';

	state = {
	}

	constructor(props: any) {
		super(props);
	}

  vaildInput() {
    if (this.oldPassword.length <= 0 || this.newPassword.length <= 0) {
      return false;
    }
    return true;
  }

	submit() {
    
    if (!this.vaildInput()) {
      Alert.alert('请输入完整信息')
      return;
    }

		showLoading();
		// 请求中
		setTimeout(() => {
			hideLoading();
      Alert.alert("修改成功");
		}, 1000);
	}

	back() {
		this.props.navigation.pop();
	}

	render() {

		return (
			<View style={[globalStyles.container, { }]}>
				<StatuBar />
				<ScrollView style={{ flex: 1 }} scrollEnabled={false}>
					<View style={{ marginTop: 0 }}>
						<View style={{ paddingHorizontal: 30, marginTop: 40 }}>
							<Input isPassword={true} label='旧密码:' placeholder='请输入旧密码' onChangeText={(text) => {
								this.oldPassword = text;
							}}></Input>
						</View>
						<View style={{ paddingHorizontal: 30, marginTop: 20 }}>
							<Input isPassword={true} label='新密码:' placeholder='请输入新密码' onChangeText={(text) => {
								this.newPassword = text;
							}}></Input>
						</View>
						<TouchableOpacity onPress={() => {
							this.submit();
						}} style={{ width: '80%', height: 44, borderRadius: 10, backgroundColor: Color.white, alignSelf: 'center', marginTop: 50, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{color: Color._000000}}>提交</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		);
	}
}