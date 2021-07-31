import React from 'react';
import { FC } from 'react';
import { useState } from 'react';
import { Button, FlatList, Platform, ScrollView, SectionList, SectionListData, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import { NativeStackNavigationOptions } from 'react-native-screens/lib/typescript/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../../constant/Color';
import { globalStyles } from '../../constant/Styles';
import User from '../../dto/User';
import { sp } from '../../helper/utils/ScreenUtil';
import AddFriendItem, { AddFriendItem_TYPE } from '../widget/AddFriendItem';
import ChatUserItem from '../widget/ChatUserItem';
import FriendItem from '../widget/FriendItem';
import Header from '../widget/Header';
import LoadingPlaceholderView from '../widget/LoadingPlaceholderView';
import StatuBar from '../widget/StatuBar';
import BasePage from './BasePage';

type State = {
	searchType: 'default' | 'chat_history', // 搜索全部、搜索聊天记录
	dataSource: any[]
}

export default class SearchPage extends BasePage<{}> {

	isOnlySearchHistory: boolean = false; // 部分业务需求，仅查询聊天记录

	state: State = {
		searchType: 'default',
		dataSource: [
		]
	}

	constructor(props: any) {
		super(props);

		let navOptions: NativeStackNavigationOptions = {
      ...this.baseNavigationOptions,
      headerShown: false,
			stackAnimation: Platform.OS === 'ios' ? 'fade' : 'default',
    }
    this.props.navigation.setOptions(navOptions)

		if (this.props.route.params && this.props.route.params.searchType) {
			this.state.searchType = this.props.route.params.searchType;
			this.isOnlySearchHistory = true;
		}
	}

	changeSearchType = (type: State['searchType']) => {
		this.setState({
			searchType: type,
		})
	}

	_renderListHeaderComponent = () => {
		return (
			<View style={{justifyContent: 'center', alignItems: 'center', padding: 20}}>
				<Text style={{color: Color.default_subFontColor}}>搜索指定内容</Text>
				<View style={{flexDirection: 'row', marginTop: 15}}>
					<TouchableOpacity onPress={()=>{
						this.changeSearchType('chat_history');
					}}>
						<Text style={{color: Color.default_actionColor}}>聊天记录</Text>
					</TouchableOpacity>
					<Text style={{marginHorizontal: 10, color: Color.default_subFontColor}}> | </Text>
					<TouchableOpacity onPress={()=>{
						this.props.navigation.push('NewFriendPage');
					}}>
						<Text style={{color: Color.default_actionColor}}>新的好友</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	_renderItem = () => {
		return <ChatUserItem />
	}

	_renderSectionHeader = (props: any) => {		
		return (
			<View style={{backgroundColor: Color.white, padding:10, marginTop: props.section.index===0 ? 0 : 10}}>
				<Text style={{fontSize: sp(26), color: Color.default_subFontColor}}>{props.section.title}</Text>
			</View>
		);
	}

	_renderSectionFooter = (props: any) => {
		return (
			<TouchableOpacity>
				<View style={{backgroundColor: Color.white, padding: 10}}>
					{/* <Text style={{fontSize: sp(26), color: Color.default_subFontColor}}>{'更多'}</Text> */}
				</View>
			</TouchableOpacity>
		)
	}

	render() {

		const { searchType, dataSource } = this.state;

		return (
			<View style={globalStyles.container}>
				<Header>
					<SearchTextInput onChangeText={(text) => {

					}} onSearch={()=>{
						this.setState({
							dataSource: [
								{
									title: '聊天记录',
									data: [1,2,3],
									index: 0
								},
								{
									title: '好友',
									data: [1,2,3],
									index: 1
								}
							]
						})
					}} returnKeyType='done' 
					onCancel={()=>{
						this.props.navigation.pop();
					}} searchPlaceholder={searchType === 'default' ? '搜索' : '搜索聊天记录'} 
					type={searchType} 
					onChangeSearchType={(type)=>{
						if (this.isOnlySearchHistory) {
							this.props.navigation.pop();
							return;
						}
						this.changeSearchType(type);
					}} />
				</Header>
				<SectionList 
					sections={ dataSource }
					renderItem={this._renderItem}
					keyExtractor={(item, index)=>(item + '' + index)}
					ListHeaderComponent={(searchType === 'default' && dataSource.length <= 0) ? this._renderListHeaderComponent : null}
					renderSectionHeader={this._renderSectionHeader}
					renderSectionFooter={this._renderSectionFooter}
				></SectionList>
			</View>
		);
	}
}

const SearchTextInput: FC<{
	onCancel?: ()=>void,
	searchPlaceholder ?: string,
	onSearch?: (value: string)=>void,
	type: State['searchType'],
	onChangeSearchType?: (type: State['searchType'])=>void
} & TextInputProps> = (props) => {

	const [showPlaceholder, setShowPlaceholder] = useState(true);

	return (
		<View style={{marginTop: 10, borderBottomWidth: 0.5, borderBottomColor: 'rgba(0,0,0,0.1)', height: 65}}>
			
			<View style={{flex: 1, flexDirection: 'row', marginVertical: 10, paddingLeft: props.type === 'default' ? 20 : 0}}>
				<View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
					{
						props.type === 'chat_history' &&
						<TouchableOpacity style={{paddingHorizontal: 10}} onPress={()=>{
							props.onChangeSearchType && props.onChangeSearchType('default');
						}}>
							<Icon name='chevron-back-outline' size={20} color={Color.default_subFontColor} />
						</TouchableOpacity>
					}
					<TextInput clearButtonMode='while-editing' style={{ paddingHorizontal: 10, fontSize: sp(30), paddingVertical: 5, flex: 1, backgroundColor: Color.white, borderRadius: 5}} {...props} onFocus={(e) => {
						setShowPlaceholder(false);
					}} onEndEditing={(e)=>{
						if (e.nativeEvent.text.length <= 0) {
							setShowPlaceholder(true);
							return;
						}
						props.onSearch && props.onSearch(e.nativeEvent.text);
					}}/>
					{
						showPlaceholder &&
						<View style={{ position: 'absolute', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', height: '100%', width: '100%',paddingLeft: props.type === 'default' ? 10 : 50, zIndex: 999}} pointerEvents='none'>
							<Icon name='search-outline' size={20} color={Color.default_subFontColor} />
							<Text style={{ color: Color.default_subFontColor, marginLeft: 5 }}>{props.searchPlaceholder}</Text>
						</View>
					}
				</View>
				<TouchableOpacity onPress={props.onCancel}>
					<View style={{height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15}}>
						<Text style={{color: Color.default_actionColor}}>取消</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
}