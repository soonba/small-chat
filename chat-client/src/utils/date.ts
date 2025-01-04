import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import isYesterday from 'dayjs/plugin/isYesterday';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.locale('ko');
dayjs.extend(isYesterday);

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('Asia/Seoul');

export const getFormatDate = (targetDate: Date | dayjs.Dayjs | number | string, format: string) => {
  return dayjs(targetDate).format(format);
};

export const getIsYesterday = (targetDate: Date | dayjs.Dayjs | number | string) => {
  return dayjs(targetDate).isYesterday();
};

export const getFormatChatTime = (targetDate: Date | dayjs.Dayjs | number | string) => {
  return getIsYesterday(targetDate)
    ? '어제'
    : dayjs(targetDate).isBefore(dayjs(), 'date')
      ? getFormatDate(targetDate, 'M월 D일')
      : getFormatDate(targetDate, 'A h:mm');
};
