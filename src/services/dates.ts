import dayjs from 'dayjs';

class DatesFormatter {
	format(date: string | number, format: string) {
		return dayjs(date).format(format);
	}
}

const dates = new DatesFormatter();

Object.freeze(dates);

export default dates;