/* 发送异步ajax请求的函数模块
封装axios库
函数返回值是promise对象 */
import { Message } from "element-ui";
import axios from "axios";
const baseUrl = process.env.VUE_APP_BASE_URL;
//type形参默认值为"GET"
export default function ajax(url, data = {}, type = "GET") {
  /* 优化：统一处理请求异常(在外层包一个Promise对象,请求出错时不reject而是显示错误提示) */
  return new Promise((resolve, reject) => {
    const sendUrl = baseUrl + '' + url;
    let promise;
    if (type === "GET") {
      promise = axios.get(sendUrl, {
        params: data,
      });
    } else {
      promise = axios.post(sendUrl, data);
    }
    promise
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        Message({ message: "请求出错了 ", type: "error" });
        reject(error);
      });
  });
}
