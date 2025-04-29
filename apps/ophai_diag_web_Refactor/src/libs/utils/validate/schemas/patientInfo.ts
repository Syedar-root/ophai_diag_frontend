import Joi from 'joi'

export const patientInfoSchema = Joi.object({
  name: Joi.string()
	  .trim()
	  .min(2)
	  .required()
	  .pattern(/^[\u4e00-\u9fa5·•]{2,}$/)
	  .messages({
	   'string.empty': '姓名不能为空',
	   'string.min': '姓名至少需要2个中文字符',
		'any.required': '必须填写姓名',
	   'string.pattern.base': '至少需要两个中文字符'
	  }),
  age: Joi.number()
	  .min(0)
	  .max(150)
	  .required().messages({
	  'number.empty': '年龄不能为空',
	  'number.min': '年龄不能小于1',
	  'number.max': '年龄不能大于150',
	  'any.required': '必须填写年龄'
	  }),
  gender: Joi.number()
	  .min(0)
	  .max(1)
	  .required().messages({
	  'number.empty': '性别不能为空',
	  'any.required': '必须填写性别'
	  })
})
