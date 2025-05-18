/** 病例列表请求体*/
export interface CaseListQuery {
  /** 目标页码*/
  pageNum: number
  /** 每页数据条数*/
  pageSize: number
  /** 诊断状态*/
  diagStatus?: number
  /** 疾病类型（包括多个 用，分割）*/
  diseaseName?: number | string
  /** 患者唯一标识符*/
  patientInfoPatientId?: string
}

type CaseItem = {
  caseId: string | number
  patientId: string
  patientName: string
  age: number
  gender: number
  diagStatus: number
  diseaseType: string[]
  createDate: string
  updateDate: string
  responsibleDoctor: string
}

export interface CaseListResponse {
  items: any[]
  total: number
}

export interface CaseListViewObj {
  items: CaseItem[]
  total?: number
}

export function getCaseListViewObj(res: CaseListResponse): CaseListViewObj {
  let result: CaseListViewObj = {
    items: [] as CaseItem[],
    total: res.total
  }
  result.items = res.items.map((item: any) => {
    return {
      caseId: item.caseId,
      diseaseType: item.diseaseNameJ,
      diagStatus: item.diagStatus,
      patientId: item.patientInfo?.patientId || "不详",
      patientName: item.patientInfo?.name ? item.patientInfo.name : "不详",
      gender: item.patientInfo?.gender,
      age: item.patientInfo?.age || "不详",
      createDate: item.createDate,
      updateDate: item.updateDate,
      responsibleDoctor: item.responsibleDoctor? item.responsibleDoctor:"不详"
    }
  })

  return result;
}

export const diseaseType = [
  { label: '全部', value: -1 },
  { label: '糖尿病', value: 1 },
  { label: '青光眼', value: 2 },
  { label: '白内障', value: 3 },
  { label: 'AMD', value: 4 },
  { label: '高血压', value: 5 },
  { label: '近视', value: 6 },
  { label: '其他疾病', value: 7 }
]

export const diagStatus = [
  { label: '全部', value: -1 },
  { label: '未诊断', value: 0 },
  { label: '诊断中', value: 1 },
  { label: '已诊断', value: 2 }
]

export const gender = [
  { label: '男', value: 0 },
  { label: '女', value: 1 },
  { label: '其他', value: -1 }
]