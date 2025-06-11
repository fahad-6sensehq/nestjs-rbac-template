import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function IsIsoDate(validationOptions?: ValidationOptions): PropertyDecorator {
    return function (object: Record<string, any>, propertyName: string): void {
        registerDecorator({
            name: 'isIsoDate',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any): boolean {
                    // Check if the value is a string
                    if (typeof value !== 'string') {
                        return false;
                    }
                    // Regular expression to match ISO date format
                    const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z?$/;
                    return isoDateRegex.test(value);
                },
                defaultMessage(args: ValidationArguments): string {
                    return `${args.property} must be a valid ISO date string`;
                },
            },
        });
    };
}
