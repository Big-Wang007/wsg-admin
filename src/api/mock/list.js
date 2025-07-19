import Mock from "mockjs";
import { homeData } from "./data";

/**
 * # 根据url获取query参数
 * @param {Url} urlStr get请求获取参数 eg:"/video/childcomments?sort=1&start=2&count=5&childCount=14&commenIndex=0"
 * @returns Object
 */
const getQuery = urlStr => {
  const startIndex = urlStr.indexOf("?");
  const strSub = urlStr.substring(startIndex + 1);
  const strReplace = strSub.replaceAll("=", ":");
  const arr = strReplace.split("&");

  arr.forEach((it, i) => {
    const startIndex = it.indexOf(":");
    let k = it.substring(0, startIndex),
      v = it.substring(startIndex + 1),
      isNullStr = Object.is(v, "");

    k = `"${k}"`;
    !isNullStr ? (v = Number(v)) : (v = `"${v}"`);
    arr[i] = k + ":" + v;
  });

  const arrToStr = arr.join(",");
  const resStr = `{${arrToStr} }`;
  const resObj = JSON.parse(resStr);
  return resObj;
};

const getHomeData = () => {
  return {
    data: homeData,
    code: 200,
  };
};

export const list = [];
for (let i = 0; i < 10000; i++) {
  list.push({ value: `这是第${i}条数据`, key: i });
}

const getvirtualScrollData = params => {
  const query = getQuery(params.url);
  const data = list.slice((query.current - 1) * query.pageSize, query.current * query.pageSize);
  return {
    data: data,
    code: 200,
  };
};

Mock.mock(/admin\/v1\/fake_analysis_chart_data/, "get", getHomeData);
Mock.mock(/admin\/v1\/get-virtual-scroll-data/, "get", getvirtualScrollData);
