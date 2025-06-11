import { registerDecorator, ValidationArguments, ValidationOptions } from '@nestjs/class-validator';

export function TrimAndValidateString(
    validationOptions?: ValidationOptions,
): (object: Record<string, any>, propertyName: string) => void {
    return (object: Record<string, any>, propertyName: string) => {
        registerDecorator({
            name: 'trimAndValidateString',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                async validate(value: any): Promise<boolean> {
                    if (typeof value === 'string') {
                        const trimmedValue = value.trim();
                        // Validate the trimmed value as per your criteria.
                        // For example, you can check if it's not empty.
                        if (trimmedValue.length === 0) {
                            return false;
                        }
                    }

                    return true;
                },
                defaultMessage(args: ValidationArguments): string {
                    return `${args.property} contains only whitespace characters`;
                },
            },
        });
    };
}
