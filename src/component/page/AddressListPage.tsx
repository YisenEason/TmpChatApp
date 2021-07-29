import { StackNavigationOptions } from '@react-navigation/stack';
import React, { RefObject } from 'react';
import { Button, FlatList, Image, NativeModules, PanResponder, PanResponderInstance, Platform, SectionList, StatusBar, Text, TouchableOpacity, UIManager, View, ViewStyle } from "react-native";
import Color from '../../constant/Color';
import { globalStyles } from "../../constant/Styles";
import FriendItem from '../widget/FriendItem';
import SectionListIndexView from '../widget/SectionListIndexView';
import StatuBar from '../widget/StatuBar';
import BasePage from "./BasePage";


const dataSource = [
  {title: 'a', data: [1,2,3,4,5,6,7,8,9,10]}, 
  {title: 'b', data: [1,2,3,4,5,6,7,8,9,10]}, 
  {title: 'c', data: [1,2,3,4,5,6,7,8,9,10]},
  {title: 'd', data: [1,2,3,4,5,6,7,8,9,10]},
  {title: 'e', data: [1,2,3,4,5,6,7,8,9,10]},
  {title: 'f', data: [1,2,3,4,5,6,7,8,9,10]},
  {title: 'g', data: [1,2,3,4,5,6,7,8,9,10]},
  {title: 'h', data: [1,2,3,4,5,6,7,8,9,10]},
  {title: 'x', data: [1,2,3,4,5,6,7,8,9,10]},
  {title: 'y', data: [1,2,3,4,5,6,7,8,9,10]},
  {title: 'z', data: [1,2,3,4,5,6,7,8,9,10]},
  {title: 'p', data: [1,2,3,4,5,6,7,8,9,10]},
];
export default class AddressListPage extends BasePage<{}> {

  constructor(props: any) {
    super(props);

    let navOptions: StackNavigationOptions = {
      ...this.baseNavigationOptions,
      title: '通讯录'
    }
    this.props.navigation.setOptions(navOptions)

  }

  componentDidMount() {
  }

  getSectionListIndexDataSource(): string[] {
    let indexDataSource: string[] = [];
    dataSource.map((item)=>{
      indexDataSource.push(item.title);
    })
    return indexDataSource;
  }

  _renderItem = ({item, index}) => {
    return (
      <FriendItem name={item} avatar='' onTap={()=>{
        console.log(index);
        
      }} />
    );
  }

  _renderSectionHeader = ({section}) => {
    return (
      <View style={{paddingVertical: 5, marginLeft: 16}}>
        <Text>{section.title}</Text>
      </View>
    );
  }

  _renderListHeaderComponent = () => {
    return (
      <View>
        <FriendItem icon='person-add-outline' name='新的朋友' avatar='' onTap={()=>{
          this.props.navigation.navigate('NewFriendPage');
        }} />
        <FriendItem icon='chatbubbles-outline' name='群聊' avatar='' />
      </View>
    );
  }

  sectionListRef: React.RefObject<SectionList> = React.createRef();

  render () {
    return (
      <View style={[globalStyles.container, {justifyContent: 'center'}]}>
        <StatuBar />
        {/* <FriendItem name='1' avatar='http://m.imeitou.com/uploads/allimg/2021060310/yiuviwkiqho-lp.jpg' /> */}
        <SectionList
          showsVerticalScrollIndicator={false}
          ref={this.sectionListRef}
          sections={dataSource}
          renderItem={this._renderItem}
          keyExtractor={({item, index})=>(Math.random() + '' +index)}
          renderSectionHeader={this._renderSectionHeader}
          ListHeaderComponent={this._renderListHeaderComponent}
        ></SectionList>
        <SectionListIndexView dataSource={this.getSectionListIndexDataSource()} style={{position: 'absolute', width: 30, right: 0}} onChange={(index)=>{
          this.sectionListRef.current?.scrollToLocation({sectionIndex: index, animated: false, itemIndex: 0})
        }} />
      </View>
    );
  }
}

