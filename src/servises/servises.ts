import * as config from './config';
import axios, { AxiosResponse } from 'axios';
// import RNFetchBlob from 'rn-fetch-blob';
import { Alert } from 'react-native';



export const request = async (method: string, url: string, data: any = {}, baseUrl: string = ""): Promise<any> => {
  let base_url = config.baseUrl
  if (baseUrl) {
    base_url = baseUrl
  }
  console.log("config.baseUrl", base_url + url);
  let headerObj: any = { 'Content-Type': 'application/json', 'Accept': 'application/json' };
  if (method == 'upload') {
    headerObj['Content-Type'] = 'multipart/form-data';
  }
  let instance = axios.create({
    baseURL: base_url,
    timeout: 8000,
    headers: headerObj,
    validateStatus: function (status: any) {
      if (status == 401) {
       Alert.alert("Something went wrong Please try agian")
      }
      return status == 200;
    },
  });
  let base;
  console.log(instance)
  if (method === 'post') {
    base = instance.post(url, data);
  }
  else if (method === 'put') {
    base = instance.put(url, data);
  }
  else if (method === 'patch') {
    base = instance.patch(url, data);
  }
  else if (method === 'delete') {
    base = instance.delete(url);
  }
  else
    base = instance.get(url, { params: data });
  return base;
}



