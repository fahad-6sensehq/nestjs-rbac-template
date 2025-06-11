import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class EndDateRequiredIfStartDateProvidedConstraint implements ValidatorConstraintInterface {
    validate(_value: any, args: ValidationArguments) {
        const obj = args.object as any;
        const { startDate, endDate } = obj;

        if (startDate && (!endDate || endDate.trim() === '')) {
            return false;
        }

        return true;
    }

    defaultMessage(_args: ValidationArguments) {
        return 'endDate is required when startDate is provided.';
    }
}

export function EndDateRequiredIfStartDateProvided(validationOptions?: ValidationOptions) {
    return function (constructor: Function) {
        registerDecorator({
            name: 'EndDateRequiredIfStartDateProvided',
            target: constructor,
            options: validationOptions,
            validator: EndDateRequiredIfStartDateProvidedConstraint,
            constraints: [],
            propertyName: undefined,
        });
    };
}
