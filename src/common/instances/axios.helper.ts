// import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// export interface IAxiosReturnType {
//     err: any;
//     res: AxiosResponse<any, any> | null;
// }

// // without interceptor
// export const axiosCaller = (config: AxiosRequestConfig<any>): Promise<IAxiosReturnType> => {
//     return new Promise((resolve) => {
//         axios(config)
//             .then((res) => {
//                 if (res.status >= 400) {
//                     resolve({
//                         err: {
//                             error: 999,
//                         },
//                         res: res,
//                     });
//                 } else {
//                     resolve({
//                         err: null,
//                         res: res,
//                     });
//                 }
//             })
//             .catch((err) => {
//                 resolve({
//                     err: err,
//                     res: null,
//                 });
//             });
//     });
// };
