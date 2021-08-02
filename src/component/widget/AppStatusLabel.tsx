import React from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';

const AppStatusLabel = () => {

  const appStatusReducer = useSelector((state: RootState) => (state.appStatusReducer));
  
  return (
    <View style={{position: 'absolute', top: 50, left: 10}}>
      <Text style={{color: 'rgba(0,0,0,0.3)'}}>{`状态:${appStatusReducer.status}\n${appStatusReducer.date}`}</Text>
    </View>
  );
}

export default AppStatusLabel;