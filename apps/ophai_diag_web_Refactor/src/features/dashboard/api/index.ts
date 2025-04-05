import request from "@/libs/utils/request";

export const getChartDataService = ():Promise<any> => {
  return request({
    url:'/api/chart',
    method:'post',
  })
}