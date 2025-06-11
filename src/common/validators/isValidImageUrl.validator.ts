// import { registerDecorator, ValidationOptions } from 'class-validator';

// export function isValidImageUrl(
//     validationOptions?: ValidationOptions
// ): (object: Record<string, any>, propertyName: string) => void {
//     return (object: Record<string, any>, propertyName: string) => {
//         registerDecorator({
//             name: 'isValidImageUrl',
//             target: object.constructor,
//             propertyName: propertyName,
//             constraints: [],
//             options: validationOptions,
//             validator: {
//                 validate(value) {
//                     if (typeof value === 'string' && value.includes('.s3.amazonaws.com/')) {
//                         return true;
//                     }
//                     return false;
//                 },
//                 defaultMessage() {
//                     return 'logo must be a valid image url';
//                 },
//             },
//         });
//     };
// }
