import React from 'react';
import { View } from 'react-native';
import { TypingAnimation } from "react-native-typing-animation";
import Color from '../../constant/Color';

const LoadingView = () => {
  return (
    <View>
      <TypingAnimation
         dotColor={Color.default_subFontColor}
         dotMargin={10}
         dotSpeed={0.15}
         dotRadius={5}/>
    </View>
  );
}

export default LoadingView;