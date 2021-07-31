import React from 'react';
import { Image, Platform, SectionList, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackNavigationOptions } from 'react-native-screens/lib/typescript/native-stack';
import BasePage from './BasePage';
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../../constant/Color';
import { sp } from '../../helper/utils/ScreenUtil';
import FriendItem from '../widget/FriendItem';
import { globalStyles } from '../../constant/Styles';
import StatuBar from '../widget/StatuBar';
import SectionListIndexView from '../widget/SectionListIndexView';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

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

export default class CreateChatPage extends BasePage<{}> {

  constructor(props: any) {
    super(props);

    let navOptions: NativeStackNavigationOptions = {
      ...this.baseNavigationOptions,
      headerShown: true,
      stackAnimation:  Platform.OS === 'ios' ? 'flip' : 'default',
      headerCenter: this._headerCenter,
      headerLeft: this._headerLeftBtn,
      headerRight: this._headerRightBtn
    }
    this.props.navigation.setOptions(navOptions)

  }

  componentDidMount() {
  }

  getSectionListIndexDataSource(): string[] {
    let indexDataSource: string[] = [];
    dataSource.map((item) => {
      indexDataSource.push(item.title);
    })
    return indexDataSource;
  }

  _headerCenter = () => {
    return <Text style={{ fontSize: sp(34) }}>{'选择联系人'}</Text>
  }

  _headerLeftBtn = () => {
    return (
      <TouchableOpacity style={{}} onPress={() => {
        this.props.navigation.pop();
      }}>
        <Icon name='close-outline' color={Color.default_actionColor} size={23}></Icon>
      </TouchableOpacity>
    );
  }

  _headerRightBtn = () => {
    return (
      <TouchableOpacity style={{}} onPress={() => {
        this.props.navigation.navigate('ChatPage', {
          name: '聊天'
        });
      }}>
        <Icon name='checkmark-outline' color={Color.default_actionColor} size={23}></Icon>
      </TouchableOpacity>
    );
  }

  _renderItem = ({ item, index }) => {

    const selected = index === 3;

    return (
      <TouchableWithoutFeedback onPress={()=>{
        console.log('aa');
      }}>
        <View style={{flexDirection: 'row', backgroundColor: Color.white, alignItems: 'center'}}>
          {
            selected && 
            <Icon style={{paddingLeft: 15}} name='radio-button-on-outline' size={24} color={Color._f65257}></Icon>
          }
          {
            !selected &&
            <Icon style={{paddingLeft: 15}} name='radio-button-off-outline' size={24} color={Color.default_subFontColor}></Icon>
          }
          <FriendItem name={item} avatar='' style={{flex: 1}} disable={true} />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  _renderSectionHeader = ({ section }) => {
    return (
      <View style={{ paddingVertical: 5, paddingLeft: 16, backgroundColor: Color.default_backgroundColor }}>
        <Text>{section.title}</Text>
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
          sections={dataSource}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => { return item + '' + index }}
          renderSectionHeader={this._renderSectionHeader}
        ></SectionList>
        <SectionListIndexView dataSource={this.getSectionListIndexDataSource()} style={{ zIndex: 999, position: 'absolute', width: 30, right: 0 }} onChange={(index) => {
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