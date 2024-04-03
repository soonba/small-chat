import dayjs from 'dayjs';

dayjs.locale('ko');
export const getFormatDate = (targetDate: string | number | Date | dayjs.Dayjs, format: string) => {
    return dayjs(targetDate).format(format);
};
