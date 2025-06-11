import { ValidationOptions, registerDecorator } from '@nestjs/class-validator';

export function TrimmedString(validationOptions?: ValidationOptions): PropertyDecorator {
    return function (object: Record<string, any>, propertyName: string): void {
        registerDecorator({
            name: 'trimmedString',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate(value: any): boolean {
                    if (typeof value === 'string') {
                        const trimmedValue = value.trim();
                        return trimmedValue.length >= 6 && trimmedValue.length <= 40;
                    }
                    return true;
                },
                defaultMessage(): string {
                    return 'The displayId must be a trimmed string with a length between 6 and 40 characters.';
                },
            },
        });
    };
}
