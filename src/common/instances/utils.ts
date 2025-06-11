// import { IListQuery } from 'common/interfaces/query.interface';
import { randomBytes } from 'crypto';
import { PipelineStage } from 'mongoose';

export class Utils {
    static returnListResponse(response: any): { data?: any; count?: number } {
        return {
            data: response?.length ? response[0]?.data : [],
            count: response?.length ? response[0]?.count : 0,
        };
    }

    static getShortUniqueId(length = 6): string {
        // Calculate the number of bytes needed for the desired length in base64url
        const bytes = Math.ceil((length * 3) / 4);
        const buffer = randomBytes(bytes);

        // Convert to base64url to make it URL-safe and remove any padding
        const id = buffer.toString('base64url').replace(/[^a-zA-Z0-9_-]/g, '');
        return id.slice(0, length);
    }

    static namePreProcess(name: string): string {
        const nameParts = name.split('.');
        let namePart2 = [];

        // check if name already have _P50- or not, if yes then extract it
        if (nameParts[0].includes('_reelsync-')) {
            namePart2 = nameParts[0].split('_reelsync-');
            return namePart2[0] + '_reelsync-' + this.getShortUniqueId(6) + '.' + nameParts[1];
        }

        // Default case: append random 4-character suffix
        return nameParts[0] + '_reelsync-' + this.getShortUniqueId(6) + '.' + nameParts[1];
    }

    static defineListRule(query: any): { aggregate: PipelineStage[]; page: number; size: number } {
        const aggregate: PipelineStage[] = [];

        const page = query?.page && !isNaN(parseInt(query.page)) ? parseInt(query.page) : 1;
        const size = query?.size && !isNaN(parseInt(query.size)) ? parseInt(query.size) : 10;

        return { aggregate, page, size };
    }

    //     static specialCharactersRegex = /^[!@#$%^&*(),.?":{}|<>\\/]+$/;

    //     static getDefaultValueForDto(value: string, defaultValue: string): boolean | string {
    //         return value !== '' && value !== undefined ? value : defaultValue;
    //     }

    //     static removeSpecialCharactersAndAssignNull(inputString: string): string {
    //         if (this.hasOnlySpecialCharacters(inputString))
    //             return inputString.replace(this.specialCharactersRegex, undefined);

    //         return inputString;
    //     }

    //     static hasOnlySpecialCharacters(inputString: string): boolean {
    //         return this.specialCharactersRegex.test(inputString);
    //     }

    //     static async extractIdsFromRolePermissions(rolePermissions: IRolePermission[]): Promise<mongoose.Types.ObjectId[]> {
    //         const idsArray = [];
    //         for (const rolePermission of rolePermissions) {
    //             if (rolePermission.permissionId) {
    //                 idsArray.push(rolePermission.permissionId);
    //             }
    //         }
    //         return idsArray;
    //     }

    //     static getUniqueId(): string {
    //         const id = uuidv4();
    //         return id;
    //     }

    //     static getShortUniqueId(length = 6): string {
    //         const randomString = nanoid(length);
    //         return randomString;
    //     }
    //     static getAppUrl(): string {
    //         return appConfig.appURL;
    //     }

    //     // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    //     static getTimeDifferenceInMinutes(dateOld: any, dateNew: any): number {
    //         const diff = Math.abs(dateNew - dateOld);
    //         const minutes = diff / 1000 / 60;
    //         return minutes;
    //     }

    //     static inspect(key: any, val: any): void {
    //         console.log(key, util.inspect(val, false, null));
    //     }

    //     static isEqualIds(prevId: any, currId: string | mongoose.Types.ObjectId): Boolean {
    //         return prevId.toString() === currId.toString();
    //     }

    // static extractFileInfo(fileString: string): {
    //     fileKey: string;
    //     fileName: string;
    //     originalExtension: string;
    //     originalFileName: string;
    //     cloudLinkId?: string;
    // } {
    //     // Use regular expressions to capture the file key and name
    //     const regex = /\[(.*?)\]\s(.*?)$/;
    //     const match = fileString.match(regex);

    //     if (match && match.length === 3) {
    //         const fileKey = match[1];
    //         const fileName = match[2];

    //         const fileNameMatch = fileName.match(regex);
    //         // Extract original extension from the file key
    //         const originalExtension = fileKey.split('.').pop();
    //         // Construct the original filename using the fileName (without extension) and the original extension
    //         // const originalFileName = `${fileName.split('.')[0]}.${originalExtension}`;
    //         const originalFileName = `${fileKey.replace(/_P50-.*(?=\.)/, '')}`;
    //         const cloudLinkId = fileNameMatch !== null ? fileNameMatch[1] : '';
    //         return {
    //             fileKey,
    //             fileName,
    //             originalExtension,
    //             originalFileName,
    //             cloudLinkId,
    //         };
    //     }
    // }

    // // retrieve the name from the s3 bucket key
    // static retrieveName(name: string): string {
    //     const nameParts = name.split('_P50-');
    //     const ext = nameParts[nameParts.length - 1].split('.');
    //     return nameParts[0].replace(/%20/g, ' ') + '.' + ext[ext.length - 1];
    // }

    // // for payment methods
    // static getAdminUrl(): string {
    //     let url = '';
    //     if (appConfig.serverType == 'test_') {
    //         url = 'https://beta-app.pattern50.com/';
    //     } else if (process.env['IS_LOCAL'] == 'true') {
    //         url = 'http://192.168.0.186:3000/';
    //     } else if (appConfig.serverType == 'prod_') {
    //         url = 'https://app.pattern50.com/';
    //     }
    //     return url;
    // }

    // static validateClientId(clientId: string, dataClientId: string): void {
    //     if (clientId?.toString() !== dataClientId?.toString()) {
    //         ExceptionHelper.getInstance().defaultError(
    //             'forbidden',
    //             'You are not authorized to access this',
    //             HttpStatus.BAD_REQUEST,
    //         );
    //     }
    // }

    //     static sanitizeSearchText(searchText: string) {
    //         // Check if searchText is defined and is a string
    //         if (typeof searchText !== 'string' || !searchText) {
    //             return null;
    //         }

    //         // Trim leading and trailing whitespace
    //         const trimmedQuery = searchText.trim();

    //         // Define the characters to be escaped and replace them with "----"
    //         const escapeChars = /[$%{}\\;<>,]/g;

    //         // Replace the specified characters with "----"
    //         const sanitizedText = trimmedQuery.replace(escapeChars, '----');

    //         return sanitizedText;
    //     }

    // upload file to aws s3
    // static async uploadFile(file: Express.Multer.File): Promise<S3.ManagedUpload.SendData | { error: string }> {
    //     if (NestHelper.getInstance().isEmpty(file)) {
    //         ExceptionHelper.getInstance().defaultError('File Is Empty', 'file_is_empty', HttpStatus.BAD_REQUEST);
    //     }

    //     const s3Response = await AwsServices.S3.uploadFile(file, FileTypes.ANY);
    //     if (s3Response == -1) {
    //         return {
    //             error: 'FILE TYPE NOT ALLOWED',
    //         };
    //     }

    //     return s3Response;
    // }

    //     static async uploadPresignedFile(file: Express.Multer.File): Promise<any> {
    //         if (NestHelper.getInstance().isEmpty(file)) {
    //             ExceptionHelper.getInstance().defaultError('File Is Empty', 'file_is_empty', HttpStatus.BAD_REQUEST);
    //         }

    //         const s3Response = await AwsServices.S3.uploadDocumentsToPresignedUrl(file, FileTypes.ANY);
    //         if (s3Response == -1) {
    //             return {
    //                 error: 'FILE TYPE NOT ALLOWED',
    //             };
    //         }

    //         return s3Response;
    //     }

    //     static isElementExist(id: string, ids: any[]): boolean {
    //         return ids?.some((element) => id?.toString() === element?.toString()) || false;
    //     }

    //     static transformFileName(fileName: string): string {
    //         // Split the filename at the underscore character
    //         const parts = fileName?.split('_P50-');

    //         // Get the first part (before the underscore)
    //         const prefix = parts[0]?.replace(/%20/g, ' ');

    //         // Get the last part (after the underscore)
    //         const extension = parts[1]?.split('.')[1]; // Extract the file extension

    //         // Concatenate the prefix and the extension with the ".png" extension
    //         return `${prefix}.${extension}`;
    //     }

    //     // // hash any data
    //     // static async hashData(data: string): Promise<string> {
    //     //     // Generate a salt with 10 rounds (higher rounds means better security but slower hashing)
    //     //     const saltRounds = 10;
    //     //     const salt = await bcrypt.genSalt(saltRounds);

    //     //     // Hash the data with the generated salt
    //     //     const hashedData = await bcrypt.hash(data, salt);

    //     //     return hashedData;
    //     // }

    //     // compare hashed data
    //     // static async compareData(data: string, hashedData: string): Promise<boolean> {
    //     //     // Compare data with hashed data to verify correctness
    //     //     return bcrypt.compare(data, hashedData);
    //     // }

    //     //multiple files
    //     static async uploadMultipleFiles(files: Array<Express.Multer.File>): Promise<unknown> {
    //         const uploadPromises = files.map((file) => {
    //             // return this.uploadFile(file);
    //             return AwsServices.S3.uploadToPresignedUrl(file, '');
    //         });
    //         const uploadedFilesUrls = await Promise.all(uploadPromises);
    //         return uploadedFilesUrls;
    //     }
    //     static async deleteFile(key: string, bucket?: boolean): Promise<unknown> {
    //         if (NestHelper.getInstance().isEmpty(key)) {
    //             ExceptionHelper.getInstance().defaultError('key Is Empty', 'key_is_empty', HttpStatus.BAD_REQUEST);
    //         }

    //         let s3Response;
    //         if (bucket) {
    //             s3Response = await AwsServices.S3.deleteFileFromResources(key);
    //         } else {
    //             s3Response = await AwsServices.S3.deleteFile(key);
    //         }

    //         if (s3Response == -1) {
    //             return {
    //                 error: 'FILE TYPE NOT ALLOWED',
    //             };
    //         }

    //         return s3Response;
    //     }
    //     static async deleteMultipleFiles(keys: Array<string>): Promise<unknown> {
    //         const uploadPromises = keys.map((file) => this.deleteFile(file));
    //         const deletedFilesFilesUrls = await Promise.all(uploadPromises);
    //         return { deletedFilesFilesUrls };
    //     }

    //     static async isValidUrl(url): Promise<boolean> {
    //         /// Regular expression to match URLs with http://, https://, or www. and .com domain
    //         // const urlPattern = /^(https?:\/\/)?(www\.)?[\w.-]+\.[a-z]{2,}(\.[a-z]{2,})?(\/[\w.-]*)*$/i;
    //         const urlPattern = /^(https?:\/\/)?(www\.)?[\w.-]+\.[a-z]{2,}(\/[\w\-.~:?#[\]@!$&'()*+,;=%]*)*$/i;
    //         return urlPattern.test(url);
    //     }

    //     static async sortFilesAndLinksByDate(filesAndLinks: any) {
    //         // Sort the array in ascending order based on uploadedDate
    //         filesAndLinks.sort((a, b) => Number(new Date(b.uploadedDate)) - Number(new Date(a.uploadedDate)));
    //         return filesAndLinks;
    //     }

    //     static containsPattern50s3Url(str: string): boolean {
    //         const pattern = /^https:\/\/pattern50\.s3\.amazonaws\.com|.*_P50-[\w\W]+\.[a-zA-Z0-9]+$/;
    //         return pattern.test(str);
    //     }

    //     static filterByCompanies(
    //         aggregate: any[],
    //         query: InvoiceListQueryDto | EmployeeListQueryDto,
    //         fieldName: string
    //     ): void {
    //         let companyIdsArr: any = query?.companyIds
    //             ?.split(',')
    //             ?.map((id: string) => id.trim())
    //             ?.filter((id: string) => id !== '');

    //         if (!NestHelper.getInstance().isEmpty(companyIdsArr)) {
    //             const matchQuery = {};

    //             companyIdsArr.forEach((companyId) => {
    //                 MongooseHelper.getInstance().isValidMongooseId(companyId, 'company');
    //             });

    //             companyIdsArr = companyIdsArr?.map((companyId: string) => new Types.ObjectId(companyId?.trim()));

    //             matchQuery[fieldName] = { $in: companyIdsArr };

    //             AggregationHelper.filterByMatchAndQueriesAll(aggregate, [matchQuery]);
    //         }
    //     }

    //     static filterByStudios(
    //         aggregate: any[],
    //         query: InvoiceListQueryDto | EmployeeListQueryDto,
    //         fieldName: string
    //     ): void {
    //         let studioIdsArr: any = query?.studioIds
    //             ?.split(',')
    //             ?.map((id: string) => id.trim())
    //             ?.filter((id: string) => id !== '');

    //         if (!NestHelper.getInstance().isEmpty(studioIdsArr)) {
    //             const matchQuery = {};

    //             studioIdsArr.forEach((studioId: string) => {
    //                 MongooseHelper.getInstance().isValidMongooseId(studioId, 'studio');
    //             });

    //             studioIdsArr = studioIdsArr?.map((studioId: string) => new Types.ObjectId(studioId?.trim()));

    //             matchQuery[fieldName] = { $in: studioIdsArr };

    //             AggregationHelper.filterByMatchAndQueriesAll(aggregate, [matchQuery]);
    //         }
    //     }

    //     static filterByProducts(aggregate: any[], query: InvoiceListQueryDto | EmployeeListQueryDto, fieldName: string) {
    //         let productIdsArr: any = query?.productIds
    //             ?.split(',')
    //             ?.map((id: string) => id.trim())
    //             ?.filter((id: string) => id !== '');

    //         if (!NestHelper.getInstance().isEmpty(productIdsArr)) {
    //             const matchQuery = {};

    //             productIdsArr.forEach((productId) => {
    //                 MongooseHelper.getInstance().isValidMongooseId(productId, 'product');
    //             });

    //             productIdsArr = productIdsArr?.map((productId: string) => new Types.ObjectId(productId?.trim()));

    //             matchQuery[fieldName] = { $in: productIdsArr };

    //             AggregationHelper.filterByMatchAndQueriesAll(aggregate, [matchQuery]);
    //         }
    //     }

    //     static filterByRoles(aggregate: any[], query: InvoiceListQueryDto | EmployeeListQueryDto, fieldName: string) {
    //         let roleIdsArr: any = query?.roleIds
    //             ?.split(',')
    //             ?.map((id: string) => id.trim())
    //             ?.filter((id: string) => id !== '');

    //         if (!NestHelper.getInstance().isEmpty(roleIdsArr)) {
    //             const matchQuery = {};

    //             roleIdsArr.forEach((roleId) => {
    //                 MongooseHelper.getInstance().isValidMongooseId(roleId, 'role');
    //             });

    //             roleIdsArr = roleIdsArr?.map((roleId: string) => new Types.ObjectId(roleId?.trim()));

    //             matchQuery[fieldName] = { $in: roleIdsArr };

    //             AggregationHelper.filterByMatchAndQueriesAll(aggregate, [matchQuery]);
    //         }
    //     }

    //     static filterByToolTypes(aggregate: any[], query: InvoiceListQueryDto, fieldName: string) {
    //         let toolTypesArr: any = query?.toolTypes
    //             ?.split(',')
    //             ?.map((id: string) => id.trim())
    //             ?.filter((id: string) => id !== '');

    //         if (!NestHelper.getInstance().isEmpty(toolTypesArr)) {
    //             const matchQuery = {};

    //             toolTypesArr.forEach((typeId) => {
    //                 MongooseHelper.getInstance().isValidMongooseId(typeId, 'toolType');
    //             });

    //             toolTypesArr = toolTypesArr?.map((typeId: string) => new Types.ObjectId(typeId?.trim()));

    //             matchQuery[fieldName] = { $in: toolTypesArr };

    //             AggregationHelper.filterByMatchAndQueriesAll(aggregate, [matchQuery]);
    //         }
    //     }

    //     static filterByDateRange(aggregate: any[], query: InvoiceListQueryDto | EmployeeListQueryDto, fieldName: string) {
    //         if (!NestHelper.getInstance().isEmpty(query?.startDate?.trim())) {
    //             const matchQuery = {};

    //             matchQuery[fieldName] = {
    //                 $gte: new Date(query?.startDate),
    //                 $lte: new Date(query?.endDate),
    //             };

    //             aggregate.push({
    //                 $match: {
    //                     ...matchQuery,
    //                 },
    //             });
    //         }
    //     }

    //     static canUpdate(updatedObj: IEmployeeObj, existingObj: IEmployee): Boolean {
    //         const isUpdated = Object.keys(updatedObj).some((key) => {
    //             const updatedValue = updatedObj[key];
    //             const existingValue = existingObj[key];

    //             // Check if both values are arrays
    //             if (Array.isArray(updatedValue) && Array.isArray(existingValue)) {
    //                 // Compare lengths first
    //                 if (updatedValue.length !== existingValue.length) {
    //                     return true;
    //                 }
    //                 // Compare elements
    //                 for (let i = 0; i < updatedValue.length; i++) {
    //                     if (updatedValue[i].toString() !== existingValue[i].toString()) {
    //                         return true;
    //                     }
    //                 }
    //                 return false;
    //             }

    //             // Fallback to the default comparison
    //             return existingValue?.toString() !== updatedValue?.toString();
    //         });

    //         return isUpdated;
    //     }

    //     static removeElementsFromArray(arr1: any[], arr2: any[]) {
    //         return arr1.filter((item) => !arr2.includes(item));
    //     }
    //     static paginate<T>(data: T[], page: number, pageSize: number): IPaginationResult<T> {
    //         // Ensure page and pageSize are valid positive integers
    //         if (page < 1 || pageSize < 1) {
    //             throw new Error('Page and page size must be positive integers');
    //         }

    //         const totalItems = data.length;
    //         const totalPages = Math.ceil(totalItems / pageSize);

    //         // Ensure the page number does not exceed the total pages
    //         if (page > totalPages) {
    //             throw new Error('Page number exceeds total pages');
    //         }

    //         const startIndex = (page - 1) * pageSize;
    //         const endIndex = startIndex + pageSize;
    //         const pageData = data.slice(startIndex, endIndex);

    //         return {
    //             currentPage: page,
    //             pageSize: pageSize,
    //             count: totalItems,
    //             totalPages: totalPages,
    //             data: pageData,
    //         };
    //     }
}
