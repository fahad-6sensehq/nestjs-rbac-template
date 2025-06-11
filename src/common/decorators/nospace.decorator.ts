import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'noSpaces', async: false })
export class NoSpacesConstraint implements ValidatorConstraintInterface {
    validate(value: boolean): boolean {
        if (typeof value !== 'string') {
            return false;
        }
        return !/\s/.test(value); // Check if the string contains any whitespace character
    }

    defaultMessage(args: ValidationArguments): string {
        return `${args.property} requirements not fulfilled`;
    }
}

export function NoSpaces(validationOptions?: ValidationOptions) {
    return function (object: Record<string, any>, propertyName: string): void {
        registerDecorator({
            name: 'noSpaces',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: NoSpacesConstraint,
        });
    };
}
