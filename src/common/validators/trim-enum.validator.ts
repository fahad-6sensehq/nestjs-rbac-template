// import { UserStatusEnum } from '@common/enums/status.enum';
// import { ValidationOptions, registerDecorator } from 'class-validator';

// export function TrimAndValidateEnum(validationOptions?: ValidationOptions) {
//     return function (object: Object, propertyName: string) {
//         registerDecorator({
//             name: 'trimAndValidateEnum',
//             target: object.constructor,
//             propertyName: propertyName,
//             options: validationOptions,
//             validator: {
//                 async validate(value: any) {
//                     const trimmedValue = value.trim();
//                     return UserStatusEnum[trimmedValue] !== undefined;
//                 },
//             },
//         });
//     };
// }
