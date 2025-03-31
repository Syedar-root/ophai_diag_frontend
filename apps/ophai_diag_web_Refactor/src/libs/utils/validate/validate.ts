import Joi from 'joi'
import { ElMessage } from 'element-plus'

export const validate = async (values: any, schema: Joi.Schema) => {
  try {
    return await schema.validateAsync(values, {
      abortEarly: false, // 显示所有错误
      allowUnknown: true // 允许未定义的键
    })
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      // 拼接错误信息
      const errorMessages = error.details
        .map(detail => {
          // return `${detail.context?.label || '字段'}：${detail.message}`
          return `${detail.message}`
        })
        .join('；\n')

      ElMessage({
        message: `验证失败：\n${errorMessages}`,
        type: 'error',
        duration: 3000,
        grouping: true
      })
    }
    throw error
  }
}
