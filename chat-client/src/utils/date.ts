import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import isYesterday from 'dayjs/plugin/isYesterday';

dayjs.locale('ko');
dayjs.extend(isYesterday);

export const getFormatDate = (targetDate: string | number | Date | dayjs.Dayjs, format: string) => {
    return dayjs(targetDate).format(format);
};

export const getIsYesterday = (targetDate: string | number | Date | dayjs.Dayjs) => {
    return dayjs(targetDate).isYesterday();
};

export const getFormatChatTime = (targetDate: string | number | Date | dayjs.Dayjs) => {
    return getIsYesterday(targetDate)
        ? '어제'
        : dayjs(targetDate).isBefore(dayjs(), 'date')
          ? getFormatDate(targetDate, 'M월 D일')
          : getFormatDate(targetDate, 'A h:mm');
};
