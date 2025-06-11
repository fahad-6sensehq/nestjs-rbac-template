// import {
//     registerDecorator,
//     ValidationArguments,
//     ValidationOptions,
//     ValidatorConstraint,
//     ValidatorConstraintInterface,
// } from 'class-validator';

// @ValidatorConstraint({ name: 'IsFileImageKeyMutuallyExclusive', async: false })
// class IsFileImageKeyMutuallyExclusiveConstraint implements ValidatorConstraintInterface {
//     validate(imageKey: any, args: ValidationArguments) {
//         const object = args.object as any;
//         if (object.file) {
//             return !imageKey; // imageKey must be empty if file is present
//         } else {
//             return !!imageKey; // imageKey must be present if file is not present
//         }
//     }

//     defaultMessage(args: ValidationArguments) {
//         const object = args.object as any;
//         if (object.file) {
//             return 'imageKey must be empty if file is present';
//         } else {
//             return 'imageKey is required if file is not present';
//         }
//     }
// }

// export function IsFileImageKeyMutuallyExclusive(validationOptions?: ValidationOptions) {
//     return function (object: Object, propertyName: string) {
//         registerDecorator({
//             target: object.constructor,
//             propertyName: propertyName,
//             options: validationOptions,
//             constraints: [],
//             validator: IsFileImageKeyMutuallyExclusiveConstraint,
//         });
//     };
// }
