import { StackNavigationOptions } from '@react-navigation/stack';
import React from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../../constant/Color';
import { globalStyles } from "../../constant/Styles";
import { sp } from '../../helper/utils/ScreenUtil';
import Input from '../widget/Input';
import StatuBar from '../widget/StatuBar';
import BasePage from "./BasePage";

export default class ForgetPwd extends BasePage<{}> {

	oldPassword: string = '';
	newPassword: string = '';

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

	setAllowSubmit() {
		let allowSubmit = false;
		if (this.newPassword.length > 0 && this.oldPassword.length > 0) {
			allowSubmit = true;
		} else {
			allowSubmit = false;
		}
		this.setState({
			allowSubmit: allowSubmit
		})
	}

	submit() {
		this.setState({
			isLoading: true
		})
		// 请求中
		setTimeout(() => {
			this.setState({
				isLoading: false
			}, () => {
				Alert.alert("修改成功")
				this.props.navigation.pop();
			})
		}, 1000);
	}

	back() {
		this.props.navigation.pop();
	}

	render() {

		const { isLoading, allowSubmit } = this.state;

		return (
			<View style={[globalStyles.container, { }]}>
				<StatuBar />
				<ScrollView style={{ flex: 1 }} scrollEnabled={false}>
					<TouchableOpacity style={{ position: 'absolute', top: 100, right: 30 }} onPress={this.back.bind(this)}>
						<Text style={{ color: Color._000000, fontSize: sp(32) }}>返回登陆</Text>
					</TouchableOpacity>
					<View style={{ marginTop: 180 }}>
						<Text style={{ color: Color._000000, paddingHorizontal: 30, fontSize: sp(60) }}>忘记密码</Text>
						<View style={{ paddingHorizontal: 30, marginTop: 40 }}>
							<Input isPassword={true} label='新密码:' placeholder='请输入账号' onChangeText={(text) => {
								this.oldPassword = text;
								this.setAllowSubmit();
							}}></Input>
						</View>
						<View style={{ paddingHorizontal: 30, marginTop: 20 }}>
							<Input isPassword={true} label='确认密码:' placeholder='请输入密码' onChangeText={(text) => {
								this.newPassword = text;
								this.setAllowSubmit();
							}}></Input>
						</View>
						<TouchableOpacity disabled={isLoading || !allowSubmit} onPress={() => {
							this.submit();
						}} style={{ width: 80, height: 80, alignSelf: 'flex-end', marginTop: 30, marginRight: 30, justifyContent: 'center', alignItems: 'center' }}>
							{
								isLoading ?
									<ActivityIndicator size={'large'} color={Color._000000} /> :
									<Icon name="chevron-forward-circle-outline" size={80} color={Color.white} style={{ opacity: allowSubmit ? 1 : 0.3 }} />
							}
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		);
	}
}