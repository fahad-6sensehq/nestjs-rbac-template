export class ConstructObjectsFromArrays {
    // static constructPricingScheduleObjects(createPricingScheduleDto: any, user: IUser): any[] {
    //     return createPricingScheduleDto?.schedules?.map(schedule => {
    //         // return ConstructObjectFromDtoHelper.getConstructedCreatePricingScheduleObject(schedule, user?.clientId);
    //     })
    // }

    static getFieldsToProjectFromArray(projectionFields: string[]): Record<string, number> {
        const fields: Record<string, number> = {};
        projectionFields.forEach((field) => {
            fields[field] = 0;
        });
        return fields;
    }
}
