import { ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator';
import { Types } from 'mongoose';

export function IsMongoId(validationOptions?: ValidationOptions): (object: object, propertyName: string) => void {
    return function (object: object, propertyName: string): void {
        registerDecorator({
            name: 'isMongoId',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any) {
                    if (!value) {
                        return true;
                    }
                    return Types.ObjectId.isValid(value);
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} is not a valid MongoDB ObjectId.`;
                },
            },
        });
    };
}
