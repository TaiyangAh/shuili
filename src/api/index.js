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
export const saveUserInfor = (data) =>
  ajax("/userinfor/saveUserInfor", data, "POST");
//全部行政区域
export const getAllarea = (grad) => ajax("/allarea/getAllarea?grad=" + grad);

//上传公告牌信息
export const saveWorkCard = ({
  cardname,
  cardsign,
  level,
  allareaid,
  lati,
  longti,
}) => {
  return ajax(
    "/workcard/saveWorkCard",
    { cardname, cardsign, level, allareaid, lati, longti },
    "POST"
  );
};
//获取组织机构列表
export const getOrganizationList = (adcode) => {
  return ajax("/organization/getOrganization?adcode=", { adcode }, "GET");
};
// 添加组织结构
export const saveOrganizationList = (data) => {
  ajax("/organization/saveOrganization", data, "POST");
};
