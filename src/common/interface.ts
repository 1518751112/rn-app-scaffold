import { RouteProp } from "@react-navigation/core/lib/typescript/src/types";

export interface ViewsConfig {
  component:any,
  name:string,
  options:{
    title:string,
    headerShown?:boolean,
  }
}
