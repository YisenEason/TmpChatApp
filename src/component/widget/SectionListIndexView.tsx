import React, { RefObject } from 'react';
import { NativeModules, PanResponder, PanResponderInstance, Platform, StatusBar, Text, View, ViewStyle } from "react-native";
import Color from '../../constant/Color';
import { sp } from '../../helper/utils/ScreenUtil';

export default class SectionListIndexView extends React.Component<{
  style?: ViewStyle
  previewStyle?: ViewStyle
  dataSource: string[]
  onChange?: (index: number) => void
}> {

  _panResponder: PanResponderInstance;
  state = {
    showPreview: false,
    title: ''
  }

  // 绝对Y值
  navTopH: number = 0;
  // 每个Item的高度
  itemH: number = 15;
  // 手势当前所在位置的索引
  index: number = 0;
  // 数据源
  dataSource: string[] = [];

  constructor(props: any) {
    super(props)
    this.dataSource = this.props.dataSource;
    this._panResponder = PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        this.setState({
          showPreview: true
        })
        const y = gestureState.y0 - this.navTopH;
        const index = Math.floor(y / this.itemH);
        this.onIndexChange(index);
      },
      onPanResponderMove: (evt, gestureState) => {
        const y = gestureState.moveY - this.navTopH;
        const index = Math.floor(y / this.itemH);
        this.onIndexChange(index);
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        console.log('松开');
        this.setState({
          showPreview: false
        })
      },
      onPanResponderTerminate: (evt, gestureState) => { },
      onShouldBlockNativeResponder: (evt, gestureState) => true
    });
  }

  onIndexChange = (index: number) => {
    // 限流
    if (this.index === index || index >= this.dataSource.length || index < 0) {
      return;
    }
    this.index = index;
    this.setState({
      title: this.dataSource[this.index]
    })
    this.props.onChange && this.props.onChange(index);
  }

  _viewRef: RefObject<View> = React.createRef();
  render() {

    const { showPreview } = this.state;

    return (
      <View style={[{ ...this.props.style }]}>
        <View ref={this._viewRef} onLayout={(layout) => {

          // 获取当前View绝对Y值（包括状态栏）
          this._viewRef.current?.measureInWindow((x, y, width, height) => {
            if (Platform.OS === 'android') {
              const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 0;
              this.navTopH = statusBarHeight + y;
            } else {
              const { StatusBarManager } = NativeModules;
              StatusBarManager.getHeight((status: any) => {
                this.navTopH = y;
              });
            }
          })
        }} style={{}} {...this._panResponder.panHandlers}>
          <View>
            {
              this.dataSource.map((item) => {
                return (
                  <View style={{ alignItems: 'center', justifyContent: 'center', height: this.itemH }}>
                    <Text style={{ fontSize: 11 }}>{item}</Text>
                  </View>
                );
              })
            }
          </View>
        </View>

        {
          showPreview &&
          <View style={[{ height: 50, width: 50, position: 'absolute', right: 70, justifyContent: 'center', alignItems: 'center' }, { ...this.props.previewStyle }]}>
            <Text style={{ fontSize: sp(50), color: Color._b4bbc3 }}>{this.state.title}</Text>
          </View>
        }
      </View>
    );
  }
}