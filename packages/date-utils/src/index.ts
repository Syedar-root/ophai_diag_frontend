/**
 * 获取指定日期是星期几
 * @param {string} dateStr - 日期字符串（如 "2024-05-20"）
 * @returns {string} - 星期几（中文）
 */
export function getDayOfWeek(dateStr :string) {
  const days = ['日', '一', '二', '三', '四', '五', '六'];
  const date = new Date(dateStr);
  return `星期${days[date.getDay()]}`;
}

/**
 * 计算两个日期之间的天数差
 * @param {string} startDateStr - 开始日期
 * @param {string} endDateStr - 结束日期
 * @returns {number} - 天数差
 */
export function getDaysDiff(startDateStr :string, endDateStr :string) {
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);
  const diff = end.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}