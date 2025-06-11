export class UpdateMultipleDataHandler {
    static findDataToUpdate(oldData: any[], newData: any[]): unknown {
        const oldDataSet = new Set(oldData.map((item) => item.toString()));

        const commonData = newData.filter((item) => oldDataSet.has(item.toString()));
        const commonDataSet = new Set(commonData.map((item) => item.toString()));

        const itemsToAdd = newData.filter((item) => !oldDataSet.has(item.toString()));

        const itemsToRemove = oldData
            .filter((item) => !commonDataSet.has(item.toString()))
            .map((item) => item.toString());

        return {
            itemsToAdd,
            itemsToRemove,
            commonData,
        };
    }
}
