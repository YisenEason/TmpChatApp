/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { AppState } from 'react-native';
import { Provider } from 'react-redux';
import WebSocketClient from './src/helper/manager/WebSocketClient';
import { store } from './src/redux/Store';
import RouterPage from './src/RouterPage';

export default class App extends React.Component {

  componentDidMount() {

    // AppState.addEventListener("change", (nextAppState)=>{
    //   console.log(nextAppState);
    //   if (nextAppState === 'active') {
    //     WebSocketClient.getInstance().initWebSocket();
    //   }else {
    //     WebSocketClient.getInstance().close();
    //   }
    // });
  }

  componentWillUnmount() {

    AppState.removeEventListener("change", (nextAppState)=>{
      
    });
  }

  render () {
    return (
      <Provider store={store}>
        <RouterPage />
      </Provider>
    );
  }
}
