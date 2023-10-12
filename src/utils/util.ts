import { NativeModules, Platform, StatusBar } from "react-native";

export const setStatusBarHeight = () => {
  const { OS } = Platform
  const {
    StatusBarManager: { HEIGHT },
  } = NativeModules
  let height = OS === 'android' ? StatusBar.currentHeight : HEIGHT
  return height
}
