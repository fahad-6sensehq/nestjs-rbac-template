// import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

// export function IsDecimalWithOnePlace(validationOptions?: ValidationOptions) {
//     return function (object: Object, propertyName: string) {
//         registerDecorator({
//             name: 'isDecimalWithOnePlace',
//             target: object.constructor,
//             propertyName: propertyName,
//             options: validationOptions,
//             validator: {
//                 validate(value: any, args: ValidationArguments) {
//                     return typeof value === 'number' && /^\d+(\.\d{1})?$/.test(value.toString());
//                 },
//                 defaultMessage(args: ValidationArguments) {
//                     return `${propertyName} must be a number with at most one decimal place`;
//                 },
//             },
//         });
//     };
// }
