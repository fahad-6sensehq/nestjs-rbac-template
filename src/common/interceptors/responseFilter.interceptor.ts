import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseFilterInterceptor implements NestInterceptor {
    private readonly sensitiveFields = ['password', 'resetLink', 'createdAt', 'updatedAt'];

    private isPlainObject(value: any): boolean {
        return Object.prototype.toString.call(value) === '[object Object]' && value.constructor === Object;
    }

    private filterSensitiveFields(data: any, seen = new WeakSet()): any {
        if (data === null || typeof data !== 'object') return data;
        if (seen.has(data)) return data;
        seen.add(data);

        if (Array.isArray(data)) {
            return data.map((item) => this.filterSensitiveFields(item, seen));
        }

        if (!this.isPlainObject(data)) {
            // Allow values like Date, ObjectId, etc.
            return data;
        }

        const filtered: any = {};
        for (const key of Object.keys(data)) {
            if (!this.sensitiveFields.includes(key)) {
                filtered[key] = this.filterSensitiveFields(data[key], seen);
            }
        }

        return filtered;
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                const filtered = this.filterSensitiveFields(data);
                return filtered;
            }),
        );
    }
}
