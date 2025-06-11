// import { Transform } from 'class-transformer';
// import { ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator';

// function IsStringAndNotEmptyWithTransform(validationOptions?: ValidationOptions) {
//     return function (object: any, propertyName: string) {
//         registerDecorator({
//             name: 'IsStringAndNotEmptyWithTransform',
//             target: object.constructor,
//             propertyName: propertyName,
//             options: validationOptions,
//             validator: {
//                 async validate(value: any, args: ValidationArguments) {
//                     // Check if the value is a string
//                     if (typeof value === 'string') {
//                         // Apply the transformation to trim the value
//                         const transformedValue = Transform(({ value }: TransformFnParams) => value?.trim())({ value });
//                         // Validate the transformed value
//                         const errors: ValidationError[] = await validate({ [propertyName]: transformedValue }, { groups: [args.property] });
//                         return errors.length === 0; // Return true if there are no validation errors for the transformed value
//                     }
//                     return true; // If not a string, no transformation is needed, and it's considered valid
//                 },
//                 defaultMessage(args: ValidationArguments) {
//                     return args.property + ' must be a string';
//                 },
//             },
//         });
//     };
// }
