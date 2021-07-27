import React from 'react';
import { StatusBar, StatusBarProps } from "react-native";

const StatuBar = (props:StatusBarProps) => {
  
  return (
    <StatusBar barStyle='dark-content' translucent backgroundColor="transparent" {...props} />
  );
}

export default StatuBar;