// import { NestHelper } from '@common/helpers/NestHelper';
// import { HttpStatus } from '@nestjs/common';
// import { ExceptionHelper } from './ExceptionHelper';

// export class TimeValidationHelper {
//     static validateStartAndEndTime(startTime: string, endTime: string): void {
//         const start = this.convertTo24HourFormat(startTime);
//         const end = this.convertTo24HourFormat(endTime);

//         const startTimeDate = new Date(`1970-01-01T${start}`);
//         const endTimeDate = new Date(`1970-01-01T${end}`);

//         if (startTimeDate >= endTimeDate) {
//             ExceptionHelper.getInstance().defaultError(
//                 'start time must be less than end time',
//                 'invalid_time_duration',
//                 HttpStatus.BAD_REQUEST
//             );
//         }
//     }

//     static convertTo24HourFormat(time: string): string {
//         const match = time?.match(/^(\d+):(\d+)([APap][Mm])$/);

//         if (NestHelper.getInstance().isEmpty(match)) {
//             ExceptionHelper.getInstance().defaultError(
//                 'invalid_time_format',
//                 'invalid time format',
//                 HttpStatus.BAD_REQUEST
//             );
//         }

//         const [, hoursStr, minutesStr, amPm] = match;
//         const hours = parseInt(hoursStr, 10);
//         const minutes = parseInt(minutesStr, 10);

//         let hours24 = hours % 12;
//         if (amPm.toLowerCase() === 'pm') {
//             hours24 += 12;
//         }

//         return `${String(hours24).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
//     }
//     static convertTo24HourFormatTrimmed(time: string): string {
//         const match = time?.match(/^(\d+):(\d+)([APap][Mm])$/);

//         if (NestHelper.getInstance().isEmpty(match)) {
//             ExceptionHelper.getInstance().defaultError(
//                 'invalid time format',
//                 'invalid_time_format',
//                 HttpStatus.BAD_REQUEST
//             );
//         }

//         const [, hoursStr, minutesStr, amPm] = match;
//         const hours = parseInt(hoursStr, 10);
//         const minutes = parseInt(minutesStr, 10);

//         let hours24 = hours % 12;
//         if (amPm.toLowerCase() === 'pm') {
//             hours24 += 12;
//         }

//         return `${String(hours24)}:${String(minutes)}`;
//     }
//     static isTimeInRange(startTime: string, endTime: string, givenTime: string): boolean {
//         const convertTo24HourFormat = (time12h): string => {
//             const [time, period] = time12h.split(/([APap][Mm])/);
//             let [hours, minutes] = time.split(':');
//             hours = parseInt(hours, 10);
//             minutes = parseInt(minutes, 10);

//             if (period.toUpperCase() === 'PM' && hours !== 12) {
//                 hours += 12;
//             } else if (period.toUpperCase() === 'AM' && hours === 12) {
//                 hours = 0;
//             }

//             return hours * 60 + minutes;
//         };

//         const startTimeInMinutes = convertTo24HourFormat(startTime);
//         const endTimeInMinutes = convertTo24HourFormat(endTime);
//         const givenTimeInMinutes = convertTo24HourFormat(givenTime);

//         return startTimeInMinutes <= givenTimeInMinutes && givenTimeInMinutes <= endTimeInMinutes;
//     }
// }
