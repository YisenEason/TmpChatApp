import React from 'react';
import { FC } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Color from '../../constant/Color';
import User from '../../dto/User';
import FriendItem from './FriendItem';

export enum AddFriendItem_TYPE {
	Add,
	Exist,
	Expired
}

const AddFriendItem: FC<{
	staus?: AddFriendItem_TYPE,
	user: User
}> = ({ staus = AddFriendItem_TYPE.Exist, user }) => {

	return (
		<View style={{ justifyContent: 'center' }}>
			<FriendItem user={user} avatar='' name='user1' />
			<View style={{ position: 'absolute', right: 20 }}>
				{
					staus === AddFriendItem_TYPE.Add &&
					<TouchableOpacity >
						<View style={{ backgroundColor: Color.default_actionColor, paddingVertical: 10, paddingHorizontal: 15, borderRadius: 5 }}>
							<Text style={{ color: Color.white }}>添加</Text>
						</View>
					</TouchableOpacity>
				}
				{
					(staus === AddFriendItem_TYPE.Exist || staus === AddFriendItem_TYPE.Expired) &&
					<Text style={{ color: Color.default_subFontColor }}>{staus === AddFriendItem_TYPE.Exist ? '已添加' : '已过期'}</Text>
				}
			</View>
		</View>
	);
}

export default AddFriendItem;