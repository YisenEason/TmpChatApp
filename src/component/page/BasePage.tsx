import React from "react"
import { Text, TouchableOpacity, View } from "react-native";
import { StackNavigationOptions } from '@react-navigation/stack';
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/Ionicons';
import Color from "../../constant/Color";
import { NativeStackNavigationOptions } from "react-native-screens/lib/typescript/native-stack";
import { sp } from "../../helper/utils/ScreenUtil";
interface BaseProps {
  navigation: any,
  route: any,
}

export default class BasePage<P> extends React.Component<P & BaseProps> {

  baseNavigationOptions: NativeStackNavigationOptions = {
    headerShown: true,
    // headerTitleAlign: 'center',
    // headerCenter: ()=>(<Text>123123</Text>),
    headerTitleStyle: {
      fontSize: sp(32)
    }
  }  

  constructor(props: any) {
    super(props);

    // this.props.navigation.addListener('focus', ()=>{
    //   console.log('聚焦页面：', this.props.route.name);
    // })

    this.props.navigation.setOptions(this.baseNavigationOptions)

  }
}