import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'isEndDateBeforeStartDate', async: false })
export class IsEndDateBeforeStartDate implements ValidatorConstraintInterface {
    validate(endDate: string, args: ValidationArguments): boolean {
        const object = args.object as any;
        const startDate = object?.startDate;

        if (!startDate || !endDate) {
            return false; // Ensure both dates are provided
        }

        const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

        if (!isoDateRegex.test(startDate) || !isoDateRegex.test(endDate)) {
            return false;
        }

        const endDateTimestamp = new Date(endDate).getTime();
        const startDateTimestamp = new Date(startDate).getTime();
        const currentTimestamp = new Date().getTime();

        // Ensure endDate is greater than both startDate and the current date
        if (endDateTimestamp <= currentTimestamp) {
            // console.log(`Invalid: endDate (${endDate}) is not in the future.`);
            return false;
        }

        if (endDateTimestamp <= startDateTimestamp) {
            // console.log(`Invalid: endDate (${endDate}) is before or equal to startDate (${startDate}).`);
            return false;
        }

        return true;
    }

    defaultMessage(): string {
        return `End Date must be greater than the start date and must be in the future`;
    }
}
