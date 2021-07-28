
import React from 'react';
import { Button, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Color from '../../constant/Color';
import { globalStyles } from '../../constant/Styles';
import { sp } from '../../helper/utils/ScreenUtil';
import LoadingPlaceholderView from '../widget/LoadingPlaceholderView';
import StatuBar from '../widget/StatuBar';
import BasePage from './BasePage';

class AdvicePage extends BasePage<{}> {

  state = {
    isLoading: false
  }

  constructor(props:any) {
    super(props);
  }

  componentDidMount() {
  }

  submit() {
    this.setState({
      isLoading: true
    })
    setTimeout(() => {
      this.setState({
        isLoading: false
      })
    }, 3000);
  }

  render() {

    const { isLoading } = this.state;

    return (
      <ScrollView style={globalStyles.container} scrollEnabled={false}>
        <StatuBar />
        <View style={{margin:20, padding: 10, backgroundColor: Color.white, minHeight: 120, borderRadius: 10}}>
          <TextInput style={{fontSize: sp(28)}} multiline={true} placeholder="请输入您的建议或者反馈" ></TextInput>
        </View>
        <LoadingPlaceholderView loading={isLoading} style={{height: 44, paddingHorizontal: 20}} >
          <TouchableOpacity style={{backgroundColor: Color.white, width: '100%', height: '100%', borderRadius: 10, justifyContent: 'center', alignItems: 'center'}} onPress={()=>{
            this.submit();
          }}>
            <Text style={{fontSize: sp(30), color: Color.default_actionColor}}>提交</Text>
          </TouchableOpacity>
        </LoadingPlaceholderView>
      </ScrollView>
    );
  }
}

export default AdvicePage;