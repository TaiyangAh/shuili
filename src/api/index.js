/* 要求：能根据接口文档定义接口请求函数
包含应用所有接口请求函数的模块
每个函数返回值都是promise */
import ajax from "./ajax";
// import jsonp from "jsonp";
// import { Message } from "element-ui";

//上传行政区划
export const saveFormDate = ({
  adabbrname,
  adcode,
  adfullname,
  adgrad,
  adname,
  isms,
  ismset,
  ismsets,
  upadcode,
  upadname,
}) =>
  ajax(
    "/allarea/saveAllarea",
    {
      adabbrname,
      adcode,
      adfullname,
      adgrad,
      adname,
      isms,
      ismset,
      ismsets,
      upadcode,
      upadname,
    },
    "POST"
  );
//上传用户信息
export const saveUserInfor = ({
  account,
  adgrad,
  allareaid,
  duties,
  email,
  organization,
  pwd,
  role,
  six,
  tel,
  username,
}) =>
  ajax(
    "/userinfor/saveUserInfor",
    {
      account,
      adgrad,
      allareaid,
      duties,
      email,
      organization,
      pwd,
      role,
      six,
      tel,
      username,
    },
    "POST"
  );
//全部行政区域
export const getAllarea = (grad) =>
  ajax("/allarea/getAllarea?grad=" + grad);

//上传公告牌信息
export const saveWorkCard = ({cardname,cardsign,level,allareaid,lati,longti}) =>
  ajax("/workcard/saveWorkCard",{cardname,cardsign,level,allareaid,lati,longti},"POST");
