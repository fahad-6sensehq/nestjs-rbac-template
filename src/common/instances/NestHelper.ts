export class NestHelper {
    private static instance: NestHelper;

    static getInstance(): NestHelper {
        NestHelper.instance = NestHelper.instance || new NestHelper();
        return NestHelper.instance;
    }

    async asyncForEach<T>(array: Array<T>, callback: (item: T, index: number, array: Array<T>) => void): Promise<void> {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }

    async asyncForEachParallel<T>(
        array: Array<T>,
        callback: (item: T, index: number, array: Array<T>) => Promise<void>,
    ): Promise<void> {
        await Promise.all(array.map((item, index) => callback(item, index, array)));
    }

    isNumberAndNotEmpty(value: unknown): boolean {
        if (typeof value === 'number' && !isNaN(value)) {
            return value !== null && value !== undefined;
        }
        return false;
    }

    isNumber(value: unknown): boolean {
        return typeof value === 'number' && !isNaN(value);
    }

    findObjectByField<T extends Record<string, any>>(arr: T[], field: keyof T, value: T[keyof T]): T | undefined {
        return arr.find((obj) => obj[field] === value);
    }

    isEmpty<T>(value: string | number | boolean | object | null | Array<T>): boolean {
        return (
            // null or undefined
            value == null ||
            // has length and it's zero
            (value.hasOwnProperty('length') && (value as Array<T>).length === 0) ||
            // is an Object and has no keys
            (value.constructor === Object && Object.keys(value).length === 0) ||
            //has empty string
            value == ''
        );
    }

    arrayFirstOrNull<T>(arr: Array<T>): T | null {
        if (arr.hasOwnProperty('length') && arr.length > 0) {
            return arr[0];
        } else {
            return null;
        }
    }

    paginationListResponse<T>(arr: Array<T>): any {
        if (arr.hasOwnProperty('length') && arr.length === 0) {
            return {
                data: [],
                count: 0,
            };
        } else {
            return arr[0];
        }
    }

    getUnmatchedElements(oldArr: string[], newArr: string[]): string[] {
        const difference = oldArr.filter((x) => {
            return !newArr.includes(x);
        });
        return difference;
    }

    capitalizeFirstLetter(name: string): string {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    getBooleanValue(input: string | boolean): boolean {
        if (typeof input === 'boolean') {
            return input;
        } else if (typeof input === 'string') {
            const lowerCaseInput = input.toLowerCase();
            if (lowerCaseInput === 'true') {
                return true;
            } else if (lowerCaseInput === 'false') {
                return false;
            }
        }
        return false;
    }

    // hashData(password: string): Promise<string> {
    //     return AuthHelper.hashPassword(password);
    // }

    hasDuplicateInArrayOfObject(array: { [key: string]: any }[], property): boolean | string {
        const seen = new Set();
        for (const item of array) {
            const value = item[property];
            if (seen.has(value)) {
                return value; // Duplicate found
            }
            seen.add(value);
        }
        return false; // No duplicates found
    }
}
