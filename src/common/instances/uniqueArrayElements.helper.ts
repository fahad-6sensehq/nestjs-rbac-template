export class UniqueArrayElements {
    static isUniqueElements(array: any[]): boolean {
        const uniqueSet = new Set(array);
        return uniqueSet.size === array?.length;
    }
}
