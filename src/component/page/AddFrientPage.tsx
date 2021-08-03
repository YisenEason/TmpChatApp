
import React from 'react';
import { FC } from 'react';
import { useState } from 'react';
import { Button, ScrollView, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../../constant/Color';
import { globalStyles } from '../../constant/Styles';
import User from '../../dto/User';
import userManager from '../../helper/manager/UserManager';
import { QueryUtil } from '../../helper/utils/QueryUtil';
import { sp } from '../../helper/utils/ScreenUtil';
import AddFriendItem, { AddFriendItem_TYPE } from '../widget/AddFriendItem';
import FriendItem from '../widget/FriendItem';
import LoadingPlaceholderView from '../widget/LoadingPlaceholderView';
import StatuBar from '../widget/StatuBar';
import BasePage from './BasePage';

class AddFrientPage extends BasePage<{}> {

	state = {
		isLoading: false,
		dataSource: [],
	}

	searchText = ''

	constructor(props: any) {
		super(props);
	}

	componentDidMount() {
	}

	search() {
		this.setState({
			isLoading: true
		})
		setTimeout(() => {

			if (this.searchText === 'a') {
				this.setState({
					isLoading: false,
					dataSource: []
				})
				return;
			}
			let user: User = {
				avatar: '',
				name: this.searchText,
				no: new Date().getTime()+'',
        // id: new Date().getTime()
			}
			this.setState({
				isLoading: false,
				dataSource: [user]
			})
		}, 1000);
	}

	render() {

		const { isLoading, dataSource } = this.state;
		
		return (
			<ScrollView style={globalStyles.container} scrollEnabled={false}>
				<StatuBar />
				<SearchTextInput onChangeText={(text) => {
					this.searchText = text;
				}} onEndEditing={(e) => {					
					if (e.nativeEvent.text.length <= 0) {
						return;
					}
					this.search();
					console.log('提交');
				}} returnKeyType='done' />

				<LoadingPlaceholderView loading={isLoading} style={{ marginTop: 20 }}>
					<View style={{ width: '100%' }}>
						{
							this.searchText.length > 0 &&
							<View style={{ paddingHorizontal: 16, marginBottom: 15 }}>
								<Text>为您找到以下用户</Text>
							</View>
						}

						{
							dataSource.map((item: User) => {
								return <AddFriendItem user={item} key={item.name} staus={AddFriendItem_TYPE.Add} addAction={()=>{
                  userManager.addFriends(item);
                }} />
							})
						}
						{
							dataSource.length <= 0 && this.searchText.length > 0 &&
							<View style={{ backgroundColor: Color.white, justifyContent: 'center', alignItems: 'center', height: 100 }}>
								<Text style={{ fontSize: sp(30), color: Color.default_subFontColor }}>用户不存在</Text>
							</View>
						}
					</View>
				</LoadingPlaceholderView>
			</ScrollView>
		);
	}
}

export default AddFrientPage;



const SearchTextInput: FC<{
} & TextInputProps> = (props) => {

	const [showPlaceholder, setShowPlaceholder] = useState(true);

	return (
		<View style={{ backgroundColor: Color.white, margin: 10, borderRadius: 10 }}>
			{
				showPlaceholder &&
				<View style={{ position: 'absolute', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
					<Icon name='search-outline' size={20} color={Color.default_subFontColor} />
					<Text style={{ color: Color.default_subFontColor, marginLeft: 5 }}>用户编号</Text>
				</View>
			}
			<TextInput clearButtonMode='while-editing' style={{ paddingHorizontal: 10, fontSize: sp(30), paddingVertical: 5 }} {...props} onFocus={(e) => {
				setShowPlaceholder(false);
				props.onFocus && props.onFocus(e);
			}} onEndEditing={(e)=>{
				if (e.nativeEvent.text.length <= 0) {
					setShowPlaceholder(true);
				}
				props.onEndEditing && props.onEndEditing(e);
			}} />
			
		</View>
	);
}