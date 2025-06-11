// import {
//     ValidationArguments,
//     ValidationOptions,
//     ValidatorConstraint,
//     ValidatorConstraintInterface,
//     registerDecorator,
// } from 'class-validator';

// @ValidatorConstraint({ name: 'notEmptyStringArrayAndMongoIds', async: false })
// export class NotEmptyStringArrayAndMongoIdsConstraint implements ValidatorConstraintInterface {
//     validate(value: any[]): boolean {
//         if (!value || !Array.isArray(value)) {
//             return false;
//         }

//         const isValidString = (item: any): boolean => typeof item === 'string' && item.trim() !== '';
//         // const isValidMongoId = (item: any) => mongoose.Types.ObjectId.isValid(item);

//         return value.every((item) => isValidString(item));
//     }

//     defaultMessage(args: ValidationArguments): string {
//         return `${args.property} name is empty`;
//     }
// }

// export function NotEmptyStringArrayAndMongoIds(
//     validationOptions?: ValidationOptions
// ): (object: object, propertyName: string) => void {
//     return function (object: object, propertyName: string) {
//         registerDecorator({
//             target: object.constructor,
//             propertyName: propertyName,
//             options: validationOptions,
//             constraints: [],
//             validator: NotEmptyStringArrayAndMongoIdsConstraint,
//         });
//     };
// }
