import request from "./request";

export const getHomeData = () =>
  request({
    url: "fake_analysis_chart_data",
    method: "get",
  });

export const getvirtualScrollData = (params: VirtualScrollParams): Promise<VirtualScroll> =>
  request({
    url: "get-virtual-scroll-data",
    method: "get",
    params,
  });
