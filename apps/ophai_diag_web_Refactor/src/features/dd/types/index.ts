export type HistoryCase = {
  caseId: string
  createDate: string
  updateDate: string
  diseaseTypes: string[]
  diagStatus: number
}

export interface PatientInfoViewObj {
  id: string
  name: string
  age: number
  gender: number
  historyCases: HistoryCase[]
}
export type Drug = {
  function: string
  drug: string
}

export type HistoryDiag = {
  doctor: string
  diagnosis: string
}

// key: 疾病类型，使用疾病名称首字母大写
// value: 图像url列表
export type HeatMapImage = Map<string,string[]>
export interface ImageInfoViewObj {
  originImages: Map<string, string>
  heatMapImages: Map<string, HeatMapImage>,
  vesselImages: Map<string, string>,
  diskImages: Map<string, string>,
  diseaseCategories: string[],
}

export interface AIDiagViewObj {
  suggestions: string[]
  drugs: Drug[]
  predictions: Map<string, number>
}

export interface ReportViewObj {
  createDate: string
  responsibleDoctor: string
  historyDiags: HistoryDiag[]
  diseaseTypes: string[],
  revisitTime: string,
}


export const diseaseMap = new Map([
  ['D', '糖尿病'],
  ['G', '青光眼'],
  ['C', '白内障'],
  ['A', '老年性黄斑变性'],
  ['H', '高血压'],
  ['M', '近视'],
  ['O', '其他疾病']
])

export type NormalDiag = {
  doctorName: string | null,
  docSuggestions: string,
}
export interface Mark{
  id?:string,
  data:string,
  imageType:number
}
export interface UpdateCaseQuery {
  caseId: string,
  normalDiag: NormalDiag,
  diseaseName: string[],
  marks: Mark[],
}

// export function getViewObj(res: any): any {
//   // 解构患者信息
//   const patientInfo: PatientInfoViewObj = {
//     id: res.patientInfo.patientId.toUpperCase(),
//     name: res.patientInfo.name,
//     age: res.patientInfo.age,
//     gender: res.patientInfo.gender,
//     historyCases: res.historyCaseListDto.items.map((item: any) => {
//       return {
//         caseId: item.caseId,
//         createDate: item.createDate,
//         updateDate: item.updateDate,
//         diseaseTypes: item.diseaseTypes,
//         diagStatus: item.diagStatus
//       }
//     })
//   }
//   // 解构图像信息
//   const imageInfo: ImageInfoViewObj = {
//     images: new Map<string, string>(Object.entries(res.aiCaseInfoJson.message.images as Object))
//   }
//   imageInfo.images.set('left_origin_url', res.originImageData.leftImage)
//   imageInfo.images.set('right_origin_url', res.originImageData.rightImage)
//   // 解构AI诊断信息
//   const aiDiagInfo: AIDiagViewObj = {
//     suggestions: res.aiCaseInfoJson.message.suggestions,
//     drugs: res.aiCaseInfoJson.message.drugs,
//     predictions: new Map<string, number>(Object.entries(res.aiCaseInfoJson.message.predictions))
//   }
//   // 解构报告信息
//   const reportInfo: ReportViewObj = {
//     createDate: res.createDate,
//     responsibleDoctor: res.responsibleDoctor,
//     historyDiags: res.doctorDiags.map((item: any) => {
//       return {
//         doctor: item.doctorName,
//         diagnosis: item.docSuggestions
//       }
//     }),
//     diseaseTypes: res.diseaseName
//   }
//
//   return { patientInfo: patientInfo, imageInfo: imageInfo, aiDiagInfo: aiDiagInfo, reportInfo: reportInfo }
// }