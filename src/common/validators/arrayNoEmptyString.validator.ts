// import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

// @ValidatorConstraint({ name: 'arrayNoEmptyString', async: false })
// export class ArrayNoEmptyStringValidator implements ValidatorConstraintInterface {
//     validate(value: any[]) {
//         if (!Array.isArray(value)) {
//             return false;
//         }

//         for (const item of value) {
//             if (typeof item !== 'string' || item.trim() === '') {
//                 return false;
//             }
//         }

//         return true;
//     }

//     defaultMessage(args: ValidationArguments): string {
//         return `${args.property} must be an array of non-empty strings`;
//     }
// }

// // export function ArrayNoEmptyString(validationOptions?: ValidationOptions) {
// //     return function (object: Record<string, any>, propertyName: string) {
// //         registerDecorator({
// //             name: 'arrayNoEmptyString',
// //             target: object.constructor,
// //             propertyName: propertyName,
// //             options: validationOptions,
// //             validator: ArrayNoEmptyStringValidator,
// //         });
// //     };
// // }
