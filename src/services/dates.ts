import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrAfter);
/**
 * Adapter for library working with dates
 */
class DatesFormatter {
  format(date: string | number, format: string) {
    return dayjs(date).format(format);
  }
  toISO(date: string | number) {
    return dayjs(date).toISOString();
  }
  isSameOrAfter(firstDate: string | number, secondDate: string | number) {
    return dayjs(firstDate).isSameOrAfter(secondDate);
  }
}

const dates = new DatesFormatter();

Object.freeze(dates);

export default dates;
