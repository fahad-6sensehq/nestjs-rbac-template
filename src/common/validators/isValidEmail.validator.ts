import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function IsValidEmail(
    validationOptions?: ValidationOptions,
): (object: Record<string, any>, propertyName: string) => void {
    return (object: Record<string, any>, propertyName: string) => {
        registerDecorator({
            name: 'IsValidEmail',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                async validate(value: any): Promise<boolean> {
                    if (typeof value !== 'string') {
                        return false;
                    }

                    const strictEmailRegex = /^[a-zA-Z0-9]+([._%+-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

                    return strictEmailRegex.test(value);
                },

                defaultMessage(args: ValidationArguments): string {
                    return `${args.property} is not a valid email address`;
                },
            },
        });
    };
}
