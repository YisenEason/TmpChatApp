import { StackNavigationOptions } from '@react-navigation/stack';
import React from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../../constant/Color';
import { globalStyles } from "../../constant/Styles";
import { sp } from '../../helper/utils/ScreenUtil';
import Input from '../widget/Input';
import LoadingPlaceholderView from '../widget/LoadingPlaceholderView';
import StatuBar from '../widget/StatuBar';
import BasePage from "./BasePage";

export default class ForgetPwd extends BasePage<{}> {

	state = {
    loading: false
	}

	constructor(props: any) {
		super(props);

		let navOptions: StackNavigationOptions = {
			...this.baseNavigationOptions,
			headerShown: false
		}
		this.props.navigation.setOptions(navOptions)
	}

	submit() {
    this.setState({
      loading: true
    })
    setTimeout(() => {
      this.setState({
        loading: false
      })
      Alert.alert('提交成功')
    }, 1000);
	}

	back() {
		this.props.navigation.pop();
	}

	render() {

    const { loading } = this.state;

		return (
			<View style={[globalStyles.container, { }]}>
				<StatuBar />
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
					<TouchableOpacity style={{ position: 'absolute', top: 100, right: 30 }} onPress={this.back.bind(this)}>
						<Text style={{ color: Color.default_actionColor, fontSize: sp(32) }}>返回登陆</Text>
					</TouchableOpacity>
					<View style={{width: '100%'}}>
						<Text style={{alignSelf: 'center' ,color: Color._000000, paddingHorizontal: 30, fontSize: sp(30) }}>提交后将发送忘记密码消息给管理员</Text>
						<LoadingPlaceholderView loading={loading} style={{height: 50, alignItems:'center', marginTop: 50, marginHorizontal: 50}}>
              <TouchableOpacity onPress={() => {
                this.submit();
              }} style={{width: '100%', height: '100%', borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.default_actionColor }}>
                <Text style={{color: Color.white}}>提交</Text>
              </TouchableOpacity>
            </LoadingPlaceholderView>
					</View>
				</View>
			</View>
		);
	}
}