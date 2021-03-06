import { StackNavigationOptions } from '@react-navigation/stack';
import React, { RefObject } from 'react';
import { Button, FlatList, Image, NativeModules, PanResponder, PanResponderInstance, Platform, SectionList, StatusBar, Text, TouchableOpacity, UIManager, View, ViewStyle } from "react-native";
import { NativeStackNavigationOptions } from 'react-native-screens/lib/typescript/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import Color from '../../constant/Color';
import { Frame } from '../../constant/Contants';
import { globalStyles } from "../../constant/Styles";
import { Group } from '../../dto/Group';
import User from '../../dto/User';
import { RootState } from '../../redux/Store';
import FriendItem from '../widget/FriendItem';
import PopupViewByALPage from '../widget/PopupViewByALPage';
import SectionListIndexView from '../widget/SectionListIndexView';
import StatuBar from '../widget/StatuBar';
import BasePage from "./BasePage";


const dataSource = [
  { title: 'a', data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  { title: 'b', data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  { title: 'c', data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  { title: 'd', data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  { title: 'e', data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  { title: 'f', data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  { title: 'g', data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  { title: 'h', data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  { title: 'x', data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  { title: 'y', data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  { title: 'z', data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  { title: 'p', data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
];

type Props = {
  friends: Group[]
}

class AddressListPage extends BasePage<Props> {

  constructor(props: any) {
    super(props);

    let navOptions: NativeStackNavigationOptions = {
      ...this.baseNavigationOptions,
      title: '通讯录',
      headerRight: this._headerRightBtn
    }
    this.props.navigation.setOptions(navOptions)

  }

  componentDidMount() {
  }

  getSectionListIndexDataSource(friends: Group[]): string[] {
    let indexDataSource: string[] = [];
    friends.map((item) => {
      indexDataSource.push(item.title);
    })
    return indexDataSource;
  }

  _headerRightBtn = () => {
    return (
      <TouchableOpacity style={{ paddingHorizontal: 15 }} onPress={() => {
        this.props.navigation.navigate('AddFrientPage');
      }}>
        <Icon name='person-add-outline' color={Color.default_actionColor} size={23}></Icon>
      </TouchableOpacity>
    );
  }

  _renderItem = ({ item, index } : {item: User, index: number}) => {   
     
    return (
      <FriendItem key={JSON.stringify(item)} user={item} onTap={()=>{
        this.props.navigation.navigate('ChatPage', {
          user: item
        });
      }} />
    );
  }

  _renderSectionHeader = ({ section }) => {
    return (
      <View style={{ paddingVertical: 5, paddingLeft: 16, backgroundColor: Color.default_backgroundColor }}>
        <Text>{section.title}</Text>
      </View>
    );
  }

  _renderListHeaderComponent = () => {
    return (
      <View>
        <FriendItem user={{ name: '新的朋友' }} icon='person-add-outline' onTap={() => {
          this.props.navigation.navigate('NewFriendPage');
        }} />
        <FriendItem user={{ name: '群聊' }} icon='chatbubbles-outline' onTap={()=>{
          this.props.navigation.navigate('ChatGroupListPage');
        }} />
      </View>
    );
  }

  sectionListRef: React.RefObject<SectionList> = React.createRef();

  render() {
    return (
      <View style={[globalStyles.container, { justifyContent: 'center' }]}>
        <StatuBar />
        {/* <FriendItem name='1' avatar='http://m.imeitou.com/uploads/allimg/2021060310/yiuviwkiqho-lp.jpg' /> */}
        <SectionList
          showsVerticalScrollIndicator={false}
          ref={this.sectionListRef}
          sections={this.props.friends}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => { return item + '' + index }}
          renderSectionHeader={this._renderSectionHeader}
          ListHeaderComponent={this._renderListHeaderComponent}
        ></SectionList>
        <SectionListIndexView dataSource={this.getSectionListIndexDataSource(this.props.friends)} style={{ zIndex: 999, position: 'absolute', width: 30, right: 0 }} onChange={(index) => {
          try {
            this.sectionListRef.current?.scrollToLocation({ sectionIndex: index, animated: false, itemIndex: 0 })
          } catch (e) {
            console.warn('列表尚未渲染此处，等待渲染');
          }
        }} />
      </View>
    );
  }
}

export default connect((state: any)=>{
  return {
    friends: state.friendReducer.friends
  }
})(AddressListPage);