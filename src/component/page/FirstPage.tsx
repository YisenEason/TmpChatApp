import React from "react";
import { Button, Text, View } from "react-native";
import Network from "../../helper/utils/Network";
import BasePage from "./BasePage";
import { globalStyles } from "../../constant/Styles";
import StatuBar from "../widget/StatuBar";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";


export default class FirstPage extends BasePage<{}> {

  constructor(props:any) {
    super(props);

    this.props.navigation.setOptions(this.baseNavigationOptions)

  }

  componentDidMount() {
  }

  render() {
    
    return (
      <View style={globalStyles.container}>
          <StatuBar />
          <Button title="network post" onPress={() => {

            this.props.navigation.navigate('LoadingModal');

            Network.post(`https://api.muxiaoguo.cn/api/tianqi?city=长沙&type=1`, {}, {})
              .then((e) => {
              })
              .catch((e) => {
                console.log(e);
              }).finally(()=>{

                this.props.navigation.pop();
                this.props.navigation.navigate('UserInfo');

              })
          }}></Button>
          <Button title="loading" onPress={() => {
            // Network.get('http://localhost:8080/mock', null).catch(()=>{});
            // ModalUtil.loadingModal();

            this.props.navigation.replace('LoginPage');

          }}></Button>
      </View>

    )
  }

}