import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export function convertUtcToBeijingTime(utcTimeString: string, format: string = 'YYYY-MM-DD HH:mm:ss'): string {
  // 1. 使用 dayjs 解析 UTC 时间字符串
  const utcTime = dayjs.utc(utcTimeString);

  // 2. 将时间转换为东八区 (Asia/Shanghai)
  const beijingTime = utcTime.tz('Asia/Shanghai');

  // 3. 格式化为指定的格式，默认为 YYYY-MM-DD HH:mm:ss
  const formattedTime = beijingTime.format(format);

  return formattedTime;
}
export function normalizeSearchForm(form: any) {
  for (const key in form) {
    if (form[key] == null) {
      form[key] = '';
    }
  }
  return form;
}
