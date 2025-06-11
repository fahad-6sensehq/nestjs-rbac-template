import { DateTime, IANAZone } from 'luxon';

export class DateHelper {
    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    now(zone: string): Date {
        return DateTime.now().setZone(zone).toJSDate();
    }

    stringDateToDateZoneToUTC(date: string, zone: string): Date {
        return DateTime.fromISO(date).setZone(zone).toJSDate();
    }

    stringDateToDateZone(date: string, zone: string): Date {
        return DateTime.fromISO(date).setZone(zone).toJSDate();
    }

    add30Days(): Date {
        return DateTime.now().plus({ days: 30 }).toJSDate();
    }

    add1Days(): Date {
        return DateTime.now().plus({ days: 1 }).toJSDate();
    }

    add1DaysFromDate(date: string): Date {
        return DateTime.fromISO(date).setZone().plus({ days: 1 }).toJSDate();
    }

    minus1Days(date: Date): Date {
        return DateTime.fromJSDate(date).minus({ days: 1 }).toJSDate();
    }

    add20Mins(): Date {
        return DateTime.now().plus({ minutes: 20 }).toJSDate();
    }

    minus6hour(date: Date): Date {
        return DateTime.fromJSDate(date).minus({ hour: 6 }).toJSDate();
    }

    addMins(date: Date, mins: number): Date {
        return DateTime.fromJSDate(date).plus({ minutes: mins }).toJSDate();
    }

    fromString(dateString: string, format: string, zone: string): Date {
        const date = DateTime.fromFormat(dateString, format, {
            zone: zone,
            setZone: true,
        });
        return date.toJSDate();
    }

    fromDate(date: Date, zone: string): Date {
        return DateTime.fromJSDate(date).setZone(zone).startOf('day').toJSDate();
    }

    formatDateZone(date: Date, zone: string): Date {
        return DateTime.fromJSDate(date).setZone(zone).toJSDate();
    }

    test(date: string, zone: string): Date {
        const newDate = new Date(date);
        const date1 = newDate.toISOString();
        let time = DateTime.fromISO(date1).setZone(zone).plus({ days: -1 }).plus({ hours: -6 }).toJSDate();
        return time;
    }

    startOfToday(zone: string): string {
        return DateTime.now().setZone(zone).startOf('day').toISO();
    }

    startOfDate(date: Date, zone: string): Date {
        return DateTime.fromJSDate(date).setZone(zone).startOf('day').toJSDate();
    }

    startOfDateString(date: Date, zone: string): string {
        return DateTime.fromJSDate(date).setZone(zone).startOf('day').toISO();
    }

    endOfDate(date: Date, zone: string): Date {
        return DateTime.fromJSDate(date).setZone(zone).endOf('day').toJSDate();
    }

    endOfDateString(date: Date, zone: string): string {
        return DateTime.fromJSDate(date).setZone(zone).endOf('day').toISO();
    }

    startOfDaysAgo(zone: string, days: number): Date {
        return DateTime.now().plus({ days: days }).setZone(zone).startOf('day').toJSDate();
    }

    endOfToday(zone: string): Date {
        return DateTime.now().setZone(zone).endOf('day').toJSDate();
    }

    endOfTodayString(zone: string): string {
        return DateTime.now().setZone(zone).endOf('day').toJSDate().toISOString();
    }

    getDayName(date: Date): string {
        return this.days[date.getDay()];
    }

    getNowInTimestamp(): number {
        return DateTime.now().setZone('UTC').toUTC().toMillis();
    }

    getNowInTimestampByZone(zone): number {
        return DateTime.now().setZone(zone).toUTC().toMillis();
    }

    getSixMonthsInTimestamp(): number {
        return DateTime.now().plus({ days: 180 }).setZone('UTC').toUTC().toMillis();
    }

    getOneMonthInTimestamp(): number {
        return DateTime.now().plus({ days: 30 }).setZone('UTC').toUTC().toMillis();
    }

    getDateInTimestamp(date: Date): number {
        const date2 = date.toISOString();
        return DateTime.fromISO(date2).toMillis();
    }

    getNowInISOString(): string {
        return DateTime.now().setZone('UTC').toJSDate().toISOString();
    }

    getTimeInISOString(date: Date): string {
        return DateTime.fromJSDate(date).setZone('UTC').toJSDate().toISOString();
    }

    getTimeInISODate(date: Date): Date {
        return DateTime.fromJSDate(date).setZone('UTC').toJSDate();
    }

    isValidTimeZone(zone: string): boolean {
        return IANAZone.isValidZone(zone);
    }

    getDayOfMonth(): number {
        let day = DateTime.now().day;
        return day;
    }

    getZone(date: Date): string {
        const luxonDateTime = DateTime.fromJSDate(date);
        const zone = luxonDateTime.zoneName;
        return zone;
    }

    isDateInRange(currentDate: string, startDate: string, endDate: string): boolean {
        return currentDate >= startDate && currentDate <= endDate;
    }

    getCurrentMonthName(): string {
        const currentDate = new Date();
        const currentMonth = this.months[currentDate.getMonth()];

        return currentMonth;
    }

    getPreviousMonthName(): string {
        const currentDate = new Date();
        const currentMonthIndex = currentDate.getMonth();
        const previousMonthIndex = currentMonthIndex === 0 ? 11 : currentMonthIndex - 1;
        const previousMonth = this.months[previousMonthIndex];

        return previousMonth;
    }

    getTimeInNext24Hours(now: string): string {
        const next24Hours = new Date(new Date(now).getTime() + 24 * 60 * 60 * 1000).toISOString();

        return next24Hours;
    }

    getPastStartDate(): Date {
        const startDate = new Date(0);
        return startDate;
    }

    isSecondDateGreater(startDate: string, endDate: string): boolean {
        return endDate > startDate;
    }

    formatDateWithoutTime(date: any) {
        // new Date() to  '2024-04-01' formate
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    compareDates(date1: any, date2: any) {
        // formate: '2024-04-01'
        const [year1, month1, day1] = date1.split('-').map(Number);
        const [year2, month2, day2] = date2.split('-').map(Number);

        // Compare years
        if (year1 !== year2) {
            return year1 - year2;
        }

        // Compare months
        if (month1 !== month2) {
            return month1 - month2;
        }

        // Compare days
        if (day1 !== day2) {
            return day1 - day2;
        }

        // Both dates are equal
        return 0;
    }

    isSecondDateGreaterOrEqual(date1: any, date2: any): Boolean {
        const result = this.compareDates(date1, date2);
        return result <= 0;
    }
}
