import request from "./request.js";

export const getHomeData = (params) =>
  request({
    url: "fake_analysis_chart_data",
    method: "get",
    params,
  });
