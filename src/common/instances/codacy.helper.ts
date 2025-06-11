// import { ICodacyAnalysis } from '@common/interfaces/codacy-analysis-report.interface';
// import { ICodingStandardList } from '@common/interfaces/codacy-coding-standard-list.interface';
// import { ICodacyGatePolicies } from '@common/interfaces/codacy-gate-policies.interfaces';
// import { IGatePolicyRepositories } from '@common/interfaces/codacy-gate-policy-repositories.interface';
// import { ICodacyOrganizations } from '@common/interfaces/codacy-organizations.interface';
// import { ICodacyPeople } from '@common/interfaces/codacy-people-from-org.interface';
// import { ICodacyPullReq } from '@common/interfaces/codacy-pull-request-report.interface';
// import { ICodacyRepositories } from '@common/interfaces/codacy-repositories.interface';
// import { ICodacyRepositoryList } from '@common/interfaces/codacy-repository-list.interface';
// import { IRepositoryLanguages } from '@common/interfaces/codacy-respository-languages.interface';
// import { ICodacySecurityCategories } from '@common/interfaces/codacy-security-categories.interface';
// import { ICodacySecurityManagers } from '@common/interfaces/codacy-security-managers.interface';
// import { ICodacyUser } from '@common/interfaces/codacy-user-report.interface';
// import { axiosCaller } from './axios.helper';

// export class CodacyHelper {
//     private static instance: CodacyHelper;
//     static readonly baseUrl = 'https://api.codacy.com/api/v3';

//     static getInstance(): CodacyHelper {
//         CodacyHelper.instance = CodacyHelper.instance || new CodacyHelper();
//         return CodacyHelper.instance;
//     }

//     async getUser(apiToken: string): Promise<{ res: ICodacyUser }> {
//         const path = CodacyHelper.baseUrl + '/user';

//         const config = this.getApiRequestConfig('GET', path, apiToken);

//         config.headers['Accept'] = 'application/json';

//         const response = await axiosCaller(config);

//         return response;
//     }

//     async getOrganizations(apiToken: string): Promise<{
//         res: { data: ICodacyOrganizations };
//     }> {
//         const path = CodacyHelper.baseUrl + '/user/organizations';
//         const config = this.getApiRequestConfig('GET', path, apiToken);

//         config.headers['Accept'] = 'application/json';

//         const response = await axiosCaller(config);

//         return response;
//     }

//     private getApiRequestConfig(method: string, path: string, apiToken: string, data?: any) {
//         const config = {
//             method,
//             port: null,
//             path,
//             url: path,
//             headers: {
//                 'api-token': `${apiToken}`,
//             },
//             data: JSON.stringify(data),
//         };

//         return config;
//     }

//     async getReport(
//         apiToken: string,
//         provider: string,
//         organizationName: string
//     ): Promise<{
//         res: {
//             data: ICodacyAnalysis;
//         };
//     }> {
//         const path = CodacyHelper.baseUrl + `/analysis/organizations/${provider}/${organizationName}/repositories`;

//         const config = this.getApiRequestConfig('GET', path, apiToken);

//         config.headers['Accept'] = 'application/json';

//         const response = await axiosCaller(config);

//         return response;
//     }
//     async getOrganizationRepositories(
//         apiToken: string,
//         provider: string,
//         organizationName: string
//     ): Promise<{ res: { data: ICodacyRepositories } }> {
//         const path = CodacyHelper.baseUrl + `/organizations/${provider}/${organizationName}/repositories`;

//         const config = this.getApiRequestConfig('GET', path, apiToken);

//         config.headers['Accept'] = 'application/json';

//         const response = await axiosCaller(config);

//         return response;
//     }

//     async getOrganizationPullRequests(
//         apiToken: string,
//         provider: string,
//         organizationName: string
//     ): Promise<{ res: { data: ICodacyPullReq } }> {
//         const path = CodacyHelper.baseUrl + `/analysis/organizations/${provider}/${organizationName}/pull-requests`;

//         const config = this.getApiRequestConfig('GET', path, apiToken);

//         config.headers['Accept'] = 'application/json';

//         const response = await axiosCaller(config);

//         return response;
//     }

//     async getListPeopleFromOrg(
//         apiToken: string,
//         provider: string,
//         organizationName: string
//     ): Promise<{
//         res: { data: ICodacyPeople };
//     }> {
//         const path = CodacyHelper.baseUrl + `/organizations/${provider}/${organizationName}/people`;

//         const config = this.getApiRequestConfig('GET', path, apiToken);

//         config.headers['Accept'] = 'application/json';

//         const response = await axiosCaller(config);

//         return response;
//     }

//     async getListCodingStandards(
//         apiToken: string,
//         provider: string,
//         organizationName: string
//     ): Promise<{
//         res: { data: ICodingStandardList };
//     }> {
//         const path = CodacyHelper.baseUrl + `/organizations/${provider}/${organizationName}/coding-standards`;

//         const config = this.getApiRequestConfig('GET', path, apiToken);

//         config.headers['Accept'] = 'application/json';

//         const response = await axiosCaller(config);

//         return response;
//     }

//     async getRepositoryLanguages(
//         apiToken: string,
//         provider: string,
//         organizationName: string,
//         repositoryName: string
//     ): Promise<{
//         res: { data: IRepositoryLanguages };
//     }> {
//         const path =
//             CodacyHelper.baseUrl +
//             `/organizations/${provider}/${organizationName}/repositories/${repositoryName}/settings/languages`;

//         const config = this.getApiRequestConfig('GET', path, apiToken);

//         config.headers['Accept'] = 'application/json';

//         const response = await axiosCaller(config);

//         return response;
//     }

//     async getReportSecurityItems(
//         apiToken: string,
//         provider: string,
//         organizationName: string
//     ): Promise<{
//         res: { data: string };
//     }> {
//         const path = CodacyHelper.baseUrl + `/reports/organizations/${provider}/${organizationName}/security/items`;

//         const config = this.getApiRequestConfig('GET', path, apiToken);

//         config.headers['Accept'] = 'application/json';

//         const response = await axiosCaller(config);

//         return response;
//     }

//     async searchSecurityDashboard(
//         apiToken: string,
//         provider: string,
//         organizationName: string
//     ): Promise<{
//         res: { data: { data: { [key: string]: number } } };
//     }> {
//         const path = CodacyHelper.baseUrl + `/organizations/${provider}/${organizationName}/security/dashboard`;

//         const config = this.getApiRequestConfig('GET', path, apiToken);

//         config.headers['Accept'] = 'application/json';

//         const response = await axiosCaller(config);

//         return response;
//     }

//     async searchSecurityDashboardRepositories(
//         apiToken: string,
//         provider: string,
//         organizationName: string
//     ): Promise<{
//         res: { data: ICodingStandardList };
//     }> {
//         const path =
//             CodacyHelper.baseUrl +
//             `/organizations/${provider}/${organizationName}/security/dashboard/repositories/search`;

//         const config = this.getApiRequestConfig('GET', path, apiToken);

//         config.headers['Accept'] = 'application/json';

//         const response = await axiosCaller(config);

//         return response;
//     }

//     // incomplete
//     async searchSecurityDashboardHistory(
//         apiToken: string,
//         provider: string,
//         organizationName: string
//     ): Promise<{
//         res: { data: ICodingStandardList };
//     }> {
//         const path =
//             CodacyHelper.baseUrl + `/organizations/${provider}/${organizationName}/security/dashboard/history/search`;

//         const config = this.getApiRequestConfig('GET', path, apiToken);

//         config.headers['Accept'] = 'application/json';

//         const response = await axiosCaller(config);

//         return response;
//     }

//     async getSecurityManagers(
//         apiToken: string,
//         provider: string,
//         organizationName: string
//     ): Promise<{
//         res: { data: ICodacySecurityManagers };
//     }> {
//         const path = CodacyHelper.baseUrl + `/organizations/${provider}/${organizationName}/security/managers`;

//         const config = this.getApiRequestConfig('GET', path, apiToken);

//         config.headers['Accept'] = 'application/json';

//         const response = await axiosCaller(config);

//         return response;
//     }

//     async getSecurityRepositories(
//         apiToken: string,
//         provider: string,
//         organizationName: string
//     ): Promise<{
//         res: { data: ICodacySecurityManagers };
//     }> {
//         const path = CodacyHelper.baseUrl + `/organizations/${provider}/${organizationName}/security/repositories`;

//         const config = this.getApiRequestConfig('GET', path, apiToken);

//         config.headers['Accept'] = 'application/json';

//         const response = await axiosCaller(config);

//         return response;
//     }

//     async getSecurityCategories(
//         apiToken: string,
//         provider: string,
//         organizationName: string
//     ): Promise<{
//         res: { data: ICodacySecurityCategories };
//     }> {
//         const path = CodacyHelper.baseUrl + `/organizations/${provider}/${organizationName}/security/categories`;

//         const config = this.getApiRequestConfig('GET', path, apiToken);

//         config.headers['Accept'] = 'application/json';

//         const response = await axiosCaller(config);

//         return response;
//     }
//     async getGatePolicies(
//         apiToken: string,
//         provider: string,
//         organizationName: string
//     ): Promise<{
//         res: { data: ICodacyGatePolicies };
//     }> {
//         const path = CodacyHelper.baseUrl + `/organizations/${provider}/${organizationName}/gate-policies`;

//         const config = this.getApiRequestConfig('GET', path, apiToken);

//         config.headers['Accept'] = 'application/json';

//         const response = await axiosCaller(config);

//         return response;
//     }

//     async getRepositoriesFollowingGatePolicy(
//         apiToken: string,
//         provider: string,
//         organizationName: string,
//         gatePolicyId: number
//     ): Promise<{
//         res: { data: IGatePolicyRepositories };
//     }> {
//         const path =
//             CodacyHelper.baseUrl +
//             `/organizations/${provider}/${organizationName}/gate-policies/${gatePolicyId}/repositories`;

//         const config = this.getApiRequestConfig('GET', path, apiToken);

//         config.headers['Accept'] = 'application/json';

//         const response = await axiosCaller(config);

//         return response;
//     }

//     async getRepositories(
//         apiToken: string,
//         provider: string,
//         organizationName: string
//     ): Promise<{ res: { data: ICodacyRepositoryList } }> {
//         const path = CodacyHelper.baseUrl + `/organizations/${provider}/${organizationName}/repositories`;

//         const config = this.getApiRequestConfig('GET', path, apiToken);

//         config.headers['Accept'] = 'application/json';

//         const response = await axiosCaller(config);

//         return response;
//     }
// }
