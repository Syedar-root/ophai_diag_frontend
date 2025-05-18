export interface ImageLibraryQuery {
  /**
   * 默认值
   * 诊断状态
   */
  diagStatus?: number;
  /**
   * 默认值是全部
   * 疾病名称 用，隔开
   */
  diseaseName?: string;
  /**
   * 默认值
   * 年龄
   */
  StartAge?: number;
  EndAge?: number;
  /**
   * 默认值
   * 性别
   */
  gender?: number;
  /**
   * 默认值
   * 病例日期
   */
  startDate?: string | null;
  endDate?: string | null;
  /**
   * 默认值
   * 页码
   */
  pageNum?: number;
  pageSize?: number;
  [property: string]: any;
}
export interface ImageLibraryResponse {
  total: number;
  items: ImageLibraryItem[];
}



export interface ImageLibraryItem {
  caseId: string;
  originImageData: OriginImageData;
  aiCaseInfo: string;
}

export interface OriginImageData {
  /**
   * 创建时间
   */
  createDate?: string;
  imageId?: string;
  /**
   * 左眼URL或路径
   */
  leftImage: string;
  /**
   * 右眼URL或路径
   */
  rightImage: string;
  /**
   * 更新时间
   */
  updateDate?: string;
  [property: string]: any;
}

export const DiagStatusMap = new Map<number, string>([
  [0, '未诊断'],
  [1, '诊断中'],
  [2, '已诊断'],
  [-1, '全部']
])

export const DiseaseMap = new Map<string, string>([
  ['D', '糖尿病'],
  ['G', '青光眼'],
  ['C', '白内障'],
  ['A', '老年性黄斑变性'],
  ['H', '高血压'],
  ['M', '近视'],
  ['O', '其他疾病'],
  ['ALL', '全部'],
])