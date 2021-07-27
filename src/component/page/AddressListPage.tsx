import React from 'react';
import { Button, Text, View } from "react-native";
import { globalStyles } from "../../constant/Styles";
import StatuBar from '../widget/StatuBar';
import BasePage from "./BasePage";

export default class AddressListPage extends BasePage<{}> {

  constructor(props: any) {
    super(props);
  }

  render () {
    return (
      <View style={globalStyles.container}>
        <StatuBar />
        <Text>AddressListPage</Text>
      </View>
    );
  }
}