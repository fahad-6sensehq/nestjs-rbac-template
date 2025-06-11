// import { ValidationOptions, registerDecorator } from 'class-validator';
// import * as passwordValidator from 'password-validator';

// const schema = new passwordValidator();
// schema
//     .is()
//     .min(8)
//     .has()
//     .uppercase(1)
//     .has(/\d{1}|[#?!@$%^&*-]{1}/, 'Should have at least one number or one special character');

// export function IsStrongPassword(validationOptions?: ValidationOptions): (object: object, propertyName: string) => void {
//     return function (object: object, propertyName: string): void {
//         registerDecorator({
//             name: 'isStrongPassword',
//             target: object.constructor,
//             propertyName: propertyName,
//             constraints: [],
//             options: validationOptions,
//             async: true, // Set async to true
//             validator: {
//                 async validate(value: any) {
//                     return schema.validate(value) as boolean;
//                 },
//                 defaultMessage() {
//                     return 'Password does not meet the required criteria';
//                 },
//             },
//         });
//     };
// }
