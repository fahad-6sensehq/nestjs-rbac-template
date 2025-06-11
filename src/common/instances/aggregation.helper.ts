import { IUserListQuery } from 'modules/user/interface/user.interface';
import { Types } from 'mongoose';
import { ConstructObjectsFromArrays } from './constructObjectsFromArrays';

export class AggregationHelper {
    static filterByMatchAndQueriesAll(aggregate: any[], queries: any[]): void {
        aggregate.push({
            $match: {
                $and: [...queries],
            },
        });
    }

    static unsetAField(aggregate: any[], field: string): void {
        aggregate.push({
            $unset: field,
        });
    }

    // this requires the productEmployees
    static getAssignedCompanyAndProducts(aggregate: any[]): void {
        aggregate.push(
            {
                $addFields: {
                    productIds: {
                        $map: {
                            input: '$productEmployees',
                            as: 'employee',
                            in: '$$employee.productId',
                        },
                    },
                },
            },
            {
                $addFields: {
                    productIds: {
                        $reduce: {
                            input: '$productIds',
                            initialValue: [],
                            in: {
                                $cond: {
                                    if: { $in: ['$$this', '$$value'] },
                                    then: '$$value',
                                    else: { $concatArrays: ['$$value', ['$$this']] },
                                },
                            },
                        },
                    },
                },
            },
        );

        aggregate.push({
            $addFields: {
                assignProductsCount: { $size: { $ifNull: ['$productIds', []] } },
            },
        });
        AggregationHelper.lookupForCustomFields(aggregate, 'products', 'productIds', '_id', 'products');
        aggregate.push(
            {
                $addFields: {
                    companyIds: {
                        $map: {
                            input: '$products',
                            as: 'product',
                            in: '$$product.companyId',
                        },
                    },
                },
            },
            {
                $addFields: {
                    companyIds: {
                        $reduce: {
                            input: '$companyIds',
                            initialValue: [],
                            in: {
                                $cond: {
                                    if: { $in: ['$$this', '$$value'] },
                                    then: '$$value',
                                    else: { $concatArrays: ['$$value', ['$$this']] },
                                },
                            },
                        },
                    },
                },
            },
        );

        aggregate.push({
            $addFields: {
                assignCompanyCount: { $size: { $ifNull: ['$companyIds', []] } },
            },
        });

        AggregationHelper.lookupForCustomFields(aggregate, 'companies', 'companyIds', '_id', 'companies');
    }

    static unwindAField(aggregate: any[], field: string, preserveNullAndEmpty: boolean): void {
        aggregate.push({
            $unwind: {
                path: `$${field}`,
                preserveNullAndEmptyArrays: preserveNullAndEmpty,
            },
        });
    }

    static lookupForIdForeignKey(aggregate: any[], from: string, localField: string, asName: string): void {
        aggregate.push({
            $lookup: {
                from: from,
                localField: localField,
                foreignField: '_id',
                as: asName,
            },
        });
    }

    static lookupForIdLocalKey(aggregate: any[], from: string, foreignField: string, asName: string): void {
        aggregate.push({
            $lookup: {
                from: from,
                localField: '_id',
                foreignField: foreignField,
                as: asName,
            },
        });
    }

    static lookupForCustomFields(
        aggregate: any[],
        from: string,
        localField: any,
        foreignField: string,
        asName: string,
    ): void {
        aggregate.push({
            $lookup: {
                from: from,
                localField: localField,
                foreignField: foreignField,
                as: asName,
            },
        });
    }

    static addField(aggregate: any[]): void {
        // add new field and assign name there
        aggregate.push({
            $addFields: {
                type: '$type.name',
            },
        });
    }

    static sortBy(aggregate: any[], sortBy: Record<string, number>): void {
        aggregate.push({
            $sort: sortBy,
        });
    }

    static unwindWithPreserveNullAndEmptyArrays(aggregate: any[], path: string): void {
        aggregate.push({
            $unwind: { path: `$${path}`, preserveNullAndEmptyArrays: true },
        });
    }

    static getCountAndDataByFacet(aggregate: any[], page: number, size: number): void {
        aggregate.push({ $sort: { createdAt: -1 } });
        aggregate.push(
            {
                $facet: {
                    total: [{ $count: 'total' }],
                    data: [{ $skip: (page - 1) * size }, { $limit: size }],
                },
            },
            {
                $unwind: '$total',
            },
            {
                $project: {
                    _id: 0,
                    count: '$total.total',
                    data: 1,
                },
            },
        );
    }

    static getFacetSortedByName(aggregate: any[], page: number, size: number): void {
        aggregate.push({
            $addFields: {
                normalizedFirstName: { $toLower: { $concat: ['$firstName', ' ', '$lastName'] } },
            },
        });

        aggregate.push({
            $sort: { normalizedFirstName: 1 },
        });

        aggregate.push({
            $project: {
                normalizedFirstName: 0,
            },
        });

        aggregate.push(
            {
                $facet: {
                    total: [{ $count: 'total' }],
                    data: [{ $skip: (page - 1) * size }, { $limit: size }],
                },
            },
            {
                $unwind: '$total',
            },
            {
                $project: {
                    _id: 0,
                    count: '$total.total',
                    data: 1,
                },
            },
        );
    }

    static getCountAndDataByFacetStartDate(aggregate: any[], page: number, size: number): void {
        aggregate.push({ $sort: { startDate: -1 } });
        aggregate.push(
            {
                $facet: {
                    total: [{ $count: 'total' }],
                    data: [{ $skip: (page - 1) * size }, { $limit: size }],
                },
            },
            {
                $unwind: '$total',
            },
            {
                $project: {
                    _id: 0,
                    count: '$total.total',
                    data: 1,
                },
            },
        );
    }

    static getCountAndDataByFacetAndUpdated(aggregate: any[], page: number, size: number): void {
        aggregate.push({ $sort: { updated_at: -1 } });
        aggregate.push(
            {
                $facet: {
                    total: [{ $count: 'total' }],
                    data: [{ $skip: (page - 1) * size }, { $limit: size }],
                },
            },
            {
                $unwind: '$total',
            },
            {
                $project: {
                    _id: 0,
                    count: '$total.total',
                    data: 1,
                },
            },
        );
    }

    static getCountAndDataByFacetByCustomField(aggregate: any[], page: number, size: number, field: string): void {
        aggregate.push({
            $addFields: {
                sortField: { $toLower: `$${field}` },
            },
        });

        aggregate.push({ $sort: { sortField: 1 } });

        aggregate.push({
            $project: {
                sortField: 0,
            },
        });

        aggregate.push(
            {
                $facet: {
                    total: [{ $count: 'total' }],
                    data: [{ $skip: (page - 1) * size }, { $limit: size }],
                },
            },
            {
                $unwind: '$total',
            },
            {
                $project: {
                    _id: 0,
                    count: '$total.total',
                    data: 1,
                },
            },
        );
    }

    static projectFields(aggregate: any[], fields: string[]): void {
        const projectFields = ConstructObjectsFromArrays.getFieldsToProjectFromArray(fields);

        aggregate.push({
            $project: {
                ...projectFields,
            },
        });
    }

    static generateMessage(aggregate: any[], taskId: Types.ObjectId): void {
        AggregationHelper.filterByMatchAndQueriesAll(aggregate, [{ _id: taskId }]);

        AggregationHelper.lookupForCustomFields(aggregate, 'stages', 'stageId', '_id', 'stages');
        AggregationHelper.unwindAField(aggregate, 'stages', true);

        AggregationHelper.lookupForCustomFields(aggregate, 'boards', 'stages.boardId', '_id', 'boards');
        AggregationHelper.unwindAField(aggregate, 'boards', true);

        AggregationHelper.lookupForCustomFields(aggregate, 'projects', 'boards.projectId', '_id', 'projects');
        AggregationHelper.unwindAField(aggregate, 'projects', true);

        aggregate.push({
            $set: {
                stageId: '$stageId',
            },
        });

        AggregationHelper.lookupForCustomFields(aggregate, 'tasks', 'stageId', 'stageId', 'sameStageTasks');

        aggregate.push({
            $addFields: {
                stageName: '$stages.name',
                projectName: '$projects.name',
            },
        });

        // AggregationHelper.projectFields(aggregate, ['stages', 'projects', 'boards']);
    }

    static searchByNameAndEmail(aggregate: any[], query: any): void {
        let trimmedQuery: string | null = null;
        if (query?.search) {
            trimmedQuery = query.search.trim();
        }

        if (trimmedQuery) {
            const escapedQuery = trimmedQuery.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
            aggregate.push({
                $match: {
                    $or: [
                        {
                            name: { $regex: escapedQuery, $options: 'i' },
                        },
                        {
                            email: { $regex: escapedQuery, $options: 'i' },
                        },
                    ],
                },
            });
        }
    }

    static searchByName(aggregate: any[], query: any): void {
        let trimmedQuery: string | null = null;
        if (query?.search) {
            trimmedQuery = query.search.trim();
        }

        if (trimmedQuery) {
            const escapedQuery = trimmedQuery.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
            aggregate.push({
                $match: {
                    name: { $regex: escapedQuery, $options: 'i' },
                },
            });
        }
    }

    static getUserAddress(aggregate: any[]): void {
        AggregationHelper.lookupForIdLocalKey(aggregate, 'addresses', 'userId', 'address');
        AggregationHelper.unwindAField(aggregate, 'address', true);

        AggregationHelper.projectFields(aggregate, ['password', 'resetLink']);
    }

    static filterUsersByStatusAndDate(aggregateUsers: any[], query: IUserListQuery): void {
        let statusFilter: string[] | null = ['active', 'invited'];

        if (query.status !== undefined) {
            const statusValues = Array.isArray(query.status)
                ? query.status
                : String(query.status)
                      .split(',')
                      .map((s) => s.trim().toLowerCase());

            if (statusValues.includes('all')) {
                statusFilter = null;
            } else {
                statusFilter = statusValues;
            }
        }

        if (statusFilter && statusFilter.length > 0) {
            aggregateUsers.push({
                $match: {
                    status: { $in: statusFilter },
                },
            });
        }

        if (query.startDate && query.endDate) {
            const startDate = new Date(query.startDate);
            const endDate = new Date(query.endDate);

            aggregateUsers.push({
                $match: {
                    createdAt: {
                        $gte: startDate,
                        $lte: endDate,
                    },
                },
            });
        }
    }

    static modifyTimeToSplit(aggregate: any[]): void {
        aggregate.push({
            $addFields: {
                startTimeForSplit: {
                    $concat: [
                        { $substr: ['$startTime', 0, 5] },
                        {
                            $cond: {
                                if: { $eq: [{ $substr: ['$startTime', 5, 2] }, 'PM'] },
                                then: ':PM',
                                else: ':AM',
                            },
                        },
                    ],
                },
                endTimeForSplit: {
                    $concat: [
                        { $substr: ['$endTime', 0, 5] },
                        {
                            $cond: {
                                if: { $eq: [{ $substr: ['$endTime', 5, 2] }, 'PM'] },
                                then: ':PM',
                                else: ':AM',
                            },
                        },
                    ],
                },
            },
        });
    }

    static splitStartAndEndTime(aggregate: any[]): void {
        aggregate.push({
            $addFields: {
                startTimeParts: {
                    $split: ['$startTimeForSplit', ':'],
                },
                endTimeParts: {
                    $split: ['$endTimeForSplit', ':'],
                },
            },
        });
    }

    static getSplittedTimeInInteger(aggregate: unknown[]): void {
        aggregate.push({
            $addFields: {
                startHour: {
                    $toInt: {
                        $arrayElemAt: ['$startTimeParts', 0],
                    },
                },
                endHour: {
                    $toInt: {
                        $arrayElemAt: ['$endTimeParts', 0],
                    },
                },
                startMinute: {
                    $toInt: {
                        $arrayElemAt: ['$startTimeParts', 1],
                    },
                },
                endMinute: {
                    $toInt: {
                        $arrayElemAt: ['$endTimeParts', 1],
                    },
                },
                startAmPm: {
                    $arrayElemAt: ['$startTimeParts', 2],
                },
                endAmPm: {
                    $arrayElemAt: ['$endTimeParts', 2],
                },
            },
        });
    }

    // static getSortedArrayByUploadedDate(aggregate: any[], fields: string[]): void {
    //     fields.forEach((field) => {
    //         console.log(field);
    //         const capitalizedField = field.charAt(0).toUpperCase() + field.slice(1);
    //         aggregate.push(
    //             // Unwind the array field
    //             {
    //                 $unwind: {
    //                     path: `$${field}`,
    //                     preserveNullAndEmptyArrays: true,
    //                 },
    //             },
    //             // Sort by uploadedDate
    //             {
    //                 $sort: {
    //                     [`${field}.uploadedDate`]: -1,
    //                 },
    //             },
    //             // Group back and reassemble the array
    //             {
    //                 $group: {
    //                     _id: '$_id',
    //                     otherFields: { $first: '$$ROOT' },
    //                     [`sorted${capitalizedField}`]: { $push: `$${field}` },
    //                 },
    //             },
    //             // // Merge back into the root document
    //             {
    //                 $replaceRoot: {
    //                     newRoot: {
    //                         $mergeObjects: ['$otherFields', { [field]: `$sorted${capitalizedField}` }],
    //                     },
    //                 },
    //             }
    //         );
    //     });
    // }

    static getSortedArrayByUploadedDate(aggregate: any[], fields: string[]): void {
        fields.forEach((field) => {
            const capitalizedField = field.charAt(0).toUpperCase() + field.slice(1);
            aggregate.push(
                {
                    $unwind: {
                        path: `$${field}`,
                        preserveNullAndEmptyArrays: true, // Handles null or empty arrays
                    },
                },
                {
                    $sort: {
                        [`${field}.uploadedDate`]: -1, // Primary sort by uploadedDate
                        [`${field}._id`]: 1, // Secondary sort by _id for consistent order
                    },
                },
                {
                    $group: {
                        _id: '$_id',
                        otherFields: { $first: '$$ROOT' },
                        [`sorted${capitalizedField}`]: { $push: `$${field}` },
                    },
                },
                {
                    $replaceRoot: {
                        newRoot: {
                            $mergeObjects: ['$otherFields', { [field]: `$sorted${capitalizedField}` }],
                        },
                    },
                },
            );
        });
    }

    static getTimeIn24HourFormat(aggregate: any[]): void {
        aggregate.push({
            $addFields: {
                startTimeInHours: {
                    $cond: {
                        if: { $eq: ['$startAmPm', 'PM'] },
                        then: {
                            $concat: [
                                {
                                    $toString: {
                                        $add: [
                                            {
                                                $cond: {
                                                    if: { $eq: ['$startHour', 12] },
                                                    then: 0,
                                                    else: '$startHour',
                                                },
                                            },
                                            12,
                                        ],
                                    },
                                },
                                ':',
                                {
                                    $toString: {
                                        $cond: {
                                            if: { $lt: ['$startMinute', 10] },
                                            then: {
                                                $concat: ['0', { $toString: '$startMinute' }],
                                            },
                                            else: { $toString: '$startMinute' },
                                        },
                                    },
                                },
                            ],
                        },
                        else: {
                            $concat: [
                                {
                                    $toString: {
                                        $cond: {
                                            if: { $eq: ['$startHour', 12] },
                                            then: '00',
                                            else: {
                                                $cond: {
                                                    if: { $lt: ['$startHour', 10] },
                                                    then: {
                                                        $concat: ['0', { $toString: '$startHour' }],
                                                    },
                                                    else: { $toString: '$startHour' },
                                                },
                                            },
                                        },
                                    },
                                },
                                ':',
                                {
                                    $toString: {
                                        $cond: {
                                            if: { $lt: ['$startMinute', 10] },
                                            then: {
                                                $concat: ['0', { $toString: '$startMinute' }],
                                            },
                                            else: { $toString: '$startMinute' },
                                        },
                                    },
                                },
                            ],
                        },
                    },
                },
                endTimeInHours: {
                    $cond: {
                        if: { $eq: ['$endAmPm', 'PM'] },
                        then: {
                            $concat: [
                                {
                                    $toString: {
                                        $add: [
                                            {
                                                $cond: {
                                                    if: { $eq: ['$endHour', 12] },
                                                    then: 0,
                                                    else: '$endHour',
                                                },
                                            },
                                            12,
                                        ],
                                    },
                                },
                                ':',
                                {
                                    $toString: {
                                        $cond: {
                                            if: { $lt: ['$endMinute', 10] },
                                            then: {
                                                $concat: ['0', { $toString: '$endMinute' }],
                                            },
                                            else: { $toString: '$endMinute' },
                                        },
                                    },
                                },
                            ],
                        },
                        else: {
                            $concat: [
                                {
                                    $toString: {
                                        $cond: {
                                            if: { $eq: ['$endHour', 12] },
                                            then: '00',
                                            else: {
                                                $cond: {
                                                    if: { $lt: ['$endHour', 10] },
                                                    then: {
                                                        $concat: ['0', { $toString: '$endHour' }],
                                                    },
                                                    else: { $toString: '$endHour' },
                                                },
                                            },
                                        },
                                    },
                                },
                                ':',
                                {
                                    $toString: {
                                        $cond: {
                                            if: { $lt: ['$endMinute', 10] },
                                            then: {
                                                $concat: ['0', { $toString: '$endMinute' }],
                                            },
                                            else: { $toString: '$endMinute' },
                                        },
                                    },
                                },
                            ],
                        },
                    },
                },
            },
        });
    }
}
