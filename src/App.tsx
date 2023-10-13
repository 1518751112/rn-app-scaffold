import React, { useState, useEffect, Component, useRef } from "react";
import { AppState, PermissionsAndroid, StatusBar } from "react-native";
import LoginScreen from 'views/login';
import TabBar from 'componests/tabBar';
import { createNavigationContainerRef, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavName, NDemo } from "common/constant";
import Models from './models';
import { initDva, initRequest, setNetInfo, useStore } from "utils/dva16";
import { Provider, Toast } from "@ant-design/react-native";
import NetInfo from '@react-native-community/netinfo';
import { config } from "configs";
export const navigationRef = createNavigationContainerRef()
const Stack = createNativeStackNavigator()
/*------------------------ 初始化dva16 ------------------------*/
initDva(Models, { printLog: false, useImmer: false })
initRequest(config.serverHome, (status: any, data: any) => {
  console.log('[API Error]', status, data)
  const { errorCode } = data||{}
  if (status === 401) {

  } else if (status === 400) {
    Toast.fail(data.message, 1)
  } else if (status instanceof Error) {
    Toast.fail(status.message, 1)
  }
})

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: '请求定位权限',
        message: '应用需要访问您的位置信息',
        buttonNeutral: '稍后再说',
        buttonNegative: '拒绝',
        buttonPositive: '允许',
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('定位权限已授予');
    } else {
      console.log('定位权限被拒绝');
    }
  } catch (error) {
    console.error(error);
  }
}
//开启网络调试
/*const _XHR = global.originalXMLHttpRequest ?
  global.originalXMLHttpRequest :
  global.XMLHttpRequest

XMLHttpRequest = _XHR*/
const App = () => {
  const { name } = useStore(NDemo)
  const appState = useRef(AppState.currentState)
  const netStateInfo = useRef(AppState.currentState)

  useEffect(() => {
    console.log("444",name,config);
    requestLocationPermission()
    const stateListener = AppState.addEventListener('change', handleAppStateChange)
    const net = NetInfo.addEventListener(
      handleConnectivityChange
    );
    return () => {
      stateListener.remove()
      net()
    }
  },[]);
  const handleAppStateChange = (nextAppState: any) => {
    //监听app是在后台还是前台
    appState.current = nextAppState
  }
  const handleConnectivityChange = (state:any) => {
    //监听网络状态
    netStateInfo.current = state
    setNetInfo(state)
  };

  return (
    <Provider>
      <StatusBar barStyle='dark-content' />
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName={"测试"} screenOptions={{
          headerStyle: {
            backgroundColor: "#162b5d",
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            color:'#000',
            fontSize:18,
          },
          headerTitleAlign: 'center', // 将标题居中
          animation: 'slide_from_right', // 通过animation属性设置动画效果
        }}>
          <Stack.Screen name={NavName.Tab} component={TabBar} options={{ headerShown: false }} />
          <Stack.Screen name={NavName.Login} component={LoginScreen} options={{ headerShown: false }} />

          </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
export default App;
