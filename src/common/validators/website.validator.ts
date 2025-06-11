// import { Injectable } from '@nestjs/common';
// import {
//     ValidationArguments,
//     ValidationOptions,
//     ValidatorConstraint,
//     ValidatorConstraintInterface,
//     registerDecorator,
// } from 'class-validator';

// @Injectable()
// @ValidatorConstraint({ name: 'isUrlWithTld', async: false })
// export class IsUrlWithTldConstraint implements ValidatorConstraintInterface {
//     validate(url: string) {
//         const urlPattern = /^((https?:\/\/)?(www\.)?[\w\-]+(\.[\w\-]+)+)(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;
//         return urlPattern.test(url);
//     }

//     defaultMessage(args: ValidationArguments): string {
//         return `Invalid URL format`;
//     }
// }

// export function IsUrlWithTld(validationOptions?: ValidationOptions) {
//     return function (object: Record<string, any>, propertyName: string) {
//         registerDecorator({
//             target: object.constructor,
//             propertyName: propertyName,
//             options: validationOptions,
//             constraints: [],
//             validator: IsUrlWithTldConstraint,
//         });
//     };
// }
