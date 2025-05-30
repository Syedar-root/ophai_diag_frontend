import request from "@/libs/utils/request";
import {type ResponseData} from "@/libs/utils/request";

export const getPatientListService = (params: any):Promise<any> => {
    return request({
        url: '/api/patient/list',
        method: 'get',
        params: params
    })
}

export const getPatientHistoryCase = (params: any):Promise<any> => {
    return request({
        url: '/api/patient/batch',
        method: 'get',
        params: params
    })
}

export const addPatientService = (data: any):Promise<ResponseData> => {
    return request({
        url: '/api/patient/add',
        method: 'post',
        data: data
    })
}