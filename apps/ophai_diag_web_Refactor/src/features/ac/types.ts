export interface NonAdminQuery {
  pageNum: number
  pageSize: number
}

export interface Item {
  age: number;
  avatarUrl?: string;
  createDate?: string;
  doctorNumber: null;
  email: string;
  gender: number;
  hospital?: null | string;
  idNumber: string;
  permission: number;
  phone: string;
  position?: string;
  realName?: string;
  updateDate?: string;
  userId: string;
  userName: string;
  [property: string]: any;
}

export interface NonAdminResponse{
  total: number,
  items: Item[];
}

export interface AddOtherQuery {
  /**
   * 年龄
   */
  age?: number;
  /**
   * 头像URL
   */
  avatarUrl?: string;
  /**
   * 医生编号
   */
  email?: string;
  /**
   * 性别
   */
  gender?: number;
  /**
   * 身份证号
   */
  idNumber: string;
  /**
   * SHA256加密密码
   */
  passwordHash?: string;
  /**
   * 权限
   */
  permission: number;
  /**
   * 手机号
   */
  phone: string;
  /**
   * 职位
   */
  position?: string;
  /**
   * 真实姓名
   */
  realName?: string;
  /**
   * 用户名
   */
  userName: string;
  [property: string]: any;
}

export interface UpdatePermissionQuery {
  permission: number;
  userId: string;
  [property: string]: any;
}