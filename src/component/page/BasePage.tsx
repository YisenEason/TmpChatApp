import React from "react"
import { Text, View } from "react-native";
import { StackNavigationOptions } from '@react-navigation/stack';
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";

interface BaseProps {
  navigation: any,
  route: any,
}

export default class BasePage<P> extends React.Component<P & BaseProps> {

  baseNavigationOptions: StackNavigationOptions = {
    headerShown: true,
    headerTitleAlign: 'center',
  }  

  constructor(props: any) {
    super(props);

    this.props.navigation.addListener('focus', ()=>{
      console.log('聚焦页面：', this.props.route.name);
    })

    this.props.navigation.setOptions(this.baseNavigationOptions)

  }
}