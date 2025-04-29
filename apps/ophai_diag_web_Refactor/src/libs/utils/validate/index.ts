// 核心验证器
export { validate } from './validate.ts'

// 各模块schema
export { loginSchema } from './schemas/login.ts'
export { registerSchema } from './schemas/register.ts'
export { imageSchema } from './schemas/image.ts'
export { patientInfoSchema } from './schemas/patientInfo.ts'
// 后续新增schema在此添加导出

// // 类型导出（根据工程需要）
// export type { ValidationSchema } from './types';
