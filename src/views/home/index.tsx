import { Image, PermissionsAndroid, Text, TouchableOpacity, View } from "react-native";
import { useEffect } from "react";
import { Toast } from "@ant-design/react-native";
import global from "views/global";
import Geolocation from 'react-native-geolocation-service';
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

  return (
    <View style={{
      width:"100%",
      height:"100%",
    }}>
<Image style={{
width:50,
  height:50,
}} source={require('assets/icons/update_icon.png')} />
      <TouchableOpacity style={[global.rowFlexStartCenter]}
                        onPress={getLoading}
      >
        <Text style={{
          color:"#000",
        }}>首页</Text>
      </TouchableOpacity>

    </View>
  )
}
