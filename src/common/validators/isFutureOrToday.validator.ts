// import { DateHelper } from '@common/helpers/date.helper';
// import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

// @ValidatorConstraint({ name: 'isFutureOrToday', async: false })
// export class IsFutureOrTodayValidator implements ValidatorConstraintInterface {
//     validate(startDate: string): boolean {
//         const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
//         if (!isoDateRegex.test(startDate)) {
//             return false;
//         }

//         if (startDate.trim() !== '') {
//             const currentDate = new DateHelper().formatDateAccordingToHour(new Date().toISOString(), 'yyyy-MM-dd');
//             const parsedStartDate = new DateHelper().formatDateAccordingToHour(
//                 new Date(startDate).toISOString(),
//                 'yyyy-MM-dd'
//             );
//             return parsedStartDate >= currentDate;
//         }

//         return false;
//     }

//     defaultMessage(args: ValidationArguments): string {
//         return `${args.property} must be greater than or equal to the current date`;
//     }
// }
