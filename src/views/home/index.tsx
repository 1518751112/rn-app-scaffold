import { Image, PermissionsAndroid, Text, TouchableOpacity, View } from "react-native";
import { useEffect } from "react";
import { Button, Toast, WhiteSpace } from "@ant-design/react-native";
import global from "views/global";
import Geolocation from 'react-native-geolocation-service';
import { effect } from "utils/dva16";
import { EGet, NDemo } from "common/constant";
const coordTransform = require('coordtransform');

let timeCode:any = null
export default ({ navigation }: any) => {
  useEffect(() => {
    /*if(!timeCode){
      timeCode = setInterval(getLoading,5000)
    }*/

  },[]);

  const getLoading = async ()=>{
    Toast.info("获取定位信息",1)
    console.log("首页");
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    const option = {
      timeout: 5000,
      maximumAge: 10,
      enableHighAccuracy: true,
      forceRequestLocation: true,
      forceLocationManager: true,
      distanceFilter: 100,
    };
    Geolocation.getCurrentPosition(
      (location:any) => {
        console.log("location",location);
        //转换为腾讯地图坐标系
        const [longitude, latitude] = coordTransform.wgs84togcj02(location.coords.longitude, location.coords.latitude);
        console.log("transform",{
          longitude,
          latitude
        });
      },
      (error:any) => {
        console.log("error",error);
      },option
    );
  }

  const dataHandle  = async ()=>{
    const result = await effect(NDemo, EGet, { type: 1 })
    Toast.info(result,1)
  }

  return (
    <View style={{
      width:"100%",
      height:"100%",
    }}>

      <TouchableOpacity style={[global.submitButton]}
                        onPress={()=>{
                          Toast.info("触摸文字",1)
                        }}
      >
        <Text style={[global.btnTxt]}>首页【触摸文字】</Text>

      </TouchableOpacity>
      <WhiteSpace />
      <Button onPress={getLoading}>获取定位</Button>
      <WhiteSpace />
      <Button onPress={dataHandle}>数据处理[需要联网]</Button>
    </View>
  )
}
