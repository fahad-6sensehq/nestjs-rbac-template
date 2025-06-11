// import { HttpStatus } from '@nestjs/common';
// import * as zipcodes from 'zipcodes';
// import { ExceptionHelper } from './ExceptionHelper';

// export class ZipCodeValidator {
//     static async validate(zip: string): Promise<void> {
//         const zipcodeData = await zipcodes.lookup(zip);
//         if (zip && (zipcodeData == undefined || zipcodeData == null || Object.keys(zipcodeData).length == 0)) {
//             ExceptionHelper.getInstance().defaultError('Zip Code Invalid', 'zip_code_invalid', HttpStatus.NOT_FOUND);
//         }
//     }
// }
