import { StackNavigationOptions } from '@react-navigation/stack';
import React from 'react';
import { Alert, Button, Image, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import ImageCropPicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../../constant/Color';
import { globalStyles } from "../../constant/Styles";
import User from '../../dto/User';
import userManager from '../../helper/manager/UserManager';
import { hideLoading, showLoading } from '../../helper/utils/ModalUtil';
import { sp } from '../../helper/utils/ScreenUtil';
import StatuBar from '../widget/StatuBar';
import BasePage from "./BasePage";

class EditUserInfo extends BasePage<{}> {

	constructor(props: any) {
		super(props);

		let navOptions: StackNavigationOptions = {
      ...this.baseNavigationOptions,
      headerRight: this._headerRightBtn
    }
    this.props.navigation.setOptions(navOptions)
	}

	_headerRightBtn = () => {
		return (
			<TouchableOpacity style={{paddingHorizontal: 15}} onPress={this.save}>
				<Text style={{color: Color.default_actionColor, fontSize: sp(30)}}>保存</Text>
			</TouchableOpacity>
		);
	}

	editAvatar = () => {
		ImageCropPicker.openPicker({
			cropping: true,// 允许裁剪
			height: 100,
			width: 100,
		}).then(image => {
			console.log(image);
			
		})
	}

	save = () => {
		showLoading();
		setTimeout(() => {
			hideLoading();
			this.props.navigation.pop();
		}, 1000);
	}

	render() {

		if (!userManager.user) {
			return <></>
		}
		
		const { avatar, nickname } = userManager.user;


		return (
			<View style={globalStyles.container}>
				<StatuBar />
				<View style={{ backgroundColor: Color.white }}>
					<TouchableWithoutFeedback onPress={this.editAvatar}>
						<View style={{paddingHorizontal: 20, paddingVertical: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
							<Text style={{fontSize: sp(30), color: Color.default_fontColor, marginRight: 20}} numberOfLines={1}>头像</Text>
							<View style={{flexDirection: 'row', alignItems: 'center'}}>
								<Image style={{height: 80, width: 80, borderRadius: 10, backgroundColor: Color._e6ece9}} source={{uri: avatar}} />
								<Icon style={{marginLeft: 10}} name='chevron-forward-outline' size={20} color={Color.default_fontColor} />
							</View>
						</View>
					</TouchableWithoutFeedback>
					<View style={{height: 0.5, width: '100%', backgroundColor: Color.default_divisionColor}} />
					<View style={{paddingHorizontal: 20, paddingRight: 30, paddingVertical: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          	<Text style={{fontSize: sp(30), color: Color.default_fontColor, marginRight: 20}} numberOfLines={1}>昵称</Text>
						<TextInput style={{flex: 1, fontSize: sp(30)}} textAlign='right' placeholder="请输入昵称" defaultValue={nickname} />
					</View>
				</View>
			</View>
		);
	}
}

export default EditUserInfo;