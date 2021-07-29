import React from "react"
import { Text, TouchableOpacity, View } from "react-native";
import { StackNavigationOptions } from '@react-navigation/stack';
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/Ionicons';
import Color from "../../constant/Color";
interface BaseProps {
  navigation: any,
  route: any,
}

export default class BasePage<P> extends React.Component<P & BaseProps> {

  baseNavigationOptions: StackNavigationOptions = {
    headerShown: true,
    headerTitleAlign: 'center',
    headerBackImage: ()=>(
      <TouchableOpacity onPress={()=>{this.props.navigation.pop()}}>
        <Icon name={'chevron-back-outline'} size={23} color={Color.default_actionColor} />  
      </TouchableOpacity>
    )
  }  

  constructor(props: any) {
    super(props);

    // this.props.navigation.addListener('focus', ()=>{
    //   console.log('聚焦页面：', this.props.route.name);
    // })

    this.props.navigation.setOptions(this.baseNavigationOptions)

  }
}