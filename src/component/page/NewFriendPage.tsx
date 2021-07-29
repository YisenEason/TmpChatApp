import { StackNavigationOptions } from '@react-navigation/stack';
import React, { RefObject } from 'react';
import { Button, FlatList, Image, NativeModules, PanResponder, PanResponderInstance, Platform, SectionList, StatusBar, Text, TouchableOpacity, UIManager, View, ViewStyle } from "react-native";
import Color from '../../constant/Color';
import { globalStyles } from "../../constant/Styles";
import { sp } from '../../helper/utils/ScreenUtil';
import FriendItem from '../widget/FriendItem';
import SectionListIndexView from '../widget/SectionListIndexView';
import StatuBar from '../widget/StatuBar';
import BasePage from "./BasePage";

export default class NewFriendPage extends BasePage<{}> {

  constructor(props: any) {
    super(props);

    let navOptions: StackNavigationOptions = {
      ...this.baseNavigationOptions,
      title: '新的朋友',
      headerRight: this._headerRightBtn,
    }
    this.props.navigation.setOptions(navOptions)

  }

  componentDidMount() {
  }

  _headerRightBtn = () => {
		return (
			<TouchableOpacity style={{paddingHorizontal: 15}} onPress={this.gotoAddFriendPage.bind(this)}>
				<Text style={{color: Color.default_actionColor, fontSize: sp(30)}}>添加朋友</Text>
			</TouchableOpacity>
		);
	}

  gotoAddFriendPage() {
    console.log('新页面');
    
  }

  _renderItem = ({item, index}) => {
    return (
      <View style={{justifyContent: 'center'}}>
        <FriendItem name={item} avatar='' onTap={()=>{}} />
        <View style={{position: 'absolute', right: 20}}>
          <Text style={{color: Color.default_subFontColor}}>{index == 1 ?'已过期' : '已添加'}</Text>
        </View>
      </View>
    );
  }

  _renderListHeaderComponent = () => {
    return (
      <View style={{paddingVertical: 10, paddingLeft: 16}}>
        <Text>三天前</Text>
      </View>
    );
  }

  render () {
    return (
      <View style={[globalStyles.container, {justifyContent: 'center'}]}>
        <StatuBar />
        {/* <FriendItem name='1' avatar='http://m.imeitou.com/uploads/allimg/2021060310/yiuviwkiqho-lp.jpg' /> */}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={[1,2,3,4,5,6,7]}
          renderItem={this._renderItem}
          keyExtractor={({item, index})=>(Math.random() + '' +index)}
          ListHeaderComponent={this._renderListHeaderComponent}
        ></FlatList>
      </View>
    );
  }
}

