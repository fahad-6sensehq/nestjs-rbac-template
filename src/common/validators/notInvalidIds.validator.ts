// import {
//     ValidationOptions,
//     ValidatorConstraint,
//     ValidatorConstraintInterface,
//     registerDecorator,
// } from 'class-validator';
// import mongoose from 'mongoose';
// @ValidatorConstraint({ name: 'notEmptyStringArrayAndMongoIds', async: false })
// export class NotEmptyStringArrayAndMongoIdsConstraint implements ValidatorConstraintInterface {
//     validate(value: any[]): boolean {
//         if (!value || !Array.isArray(value)) {
//             return false;
//         }

//         const isValidMongoId = (item: any): boolean => mongoose.Types.ObjectId.isValid(item);

//         return value.every((item) => isValidMongoId(item));
//     }

//     defaultMessage(): string {
//         return `invalid id`;
//     }
// }

// export function NotInvalidMongoIds(
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
