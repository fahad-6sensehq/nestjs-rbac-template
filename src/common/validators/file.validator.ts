// import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

// export function IsFile(validationOptions?: ValidationOptions) {
//     return function (object: Object, propertyName: string) {
//         registerDecorator({
//             name: 'isFile',
//             target: object.constructor,
//             propertyName: propertyName,
//             options: validationOptions,
//             validator: {
//                 validate(value: any, args: ValidationArguments) {
//                     return value instanceof Object && 'originalname' in value;
//                 },
//                 defaultMessage(args: ValidationArguments) {
//                     return 'File must be uploaded';
//                 },
//             },
//         });
//     };
// }

// export function MaxFileSize(maxSize: number, validationOptions?: ValidationOptions) {
//     return function (object: Object, propertyName: string) {
//         registerDecorator({
//             name: 'maxFileSize',
//             target: object.constructor,
//             propertyName: propertyName,
//             constraints: [maxSize],
//             options: validationOptions,
//             validator: {
//                 validate(value: any, args: ValidationArguments) {
//                     return value.size <= maxSize;
//                 },
//                 defaultMessage(args: ValidationArguments) {
//                     return `File size must be less than ${args.constraints[0] / (1024 * 1024)}MB`;
//                 },
//             },
//         });
//     };
// }

// export function IsFileType(allowedTypes: string[], validationOptions?: ValidationOptions) {
//     return function (object: Object, propertyName: string) {
//         registerDecorator({
//             name: 'isFileType',
//             target: object.constructor,
//             propertyName: propertyName,
//             constraints: [allowedTypes],
//             options: validationOptions,
//             validator: {
//                 validate(value: any, args: ValidationArguments) {
//                     return allowedTypes.includes(value.mimetype);
//                 },
//                 defaultMessage(args: ValidationArguments) {
//                     return `File type must be one of the following: ${args.constraints[0].join(', ')}`;
//                 },
//             },
//         });
//     };
// }
