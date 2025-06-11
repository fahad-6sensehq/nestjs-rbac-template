// import { HttpStatus } from '@nestjs/common';
// import * as moment from 'moment-timezone';
// import { ExceptionHelper } from './ExceptionHelper';

// export class TimeZoneValidator {
//     static async validate(dtoZone: string): Promise<void> {
//         const zone = moment.tz.zone(dtoZone);
//         if (zone === null) {
//             ExceptionHelper.getInstance().defaultError('Time Zone Invalid', 'time_zone_invalid', HttpStatus.NOT_FOUND);
//         }
//     }
// }
