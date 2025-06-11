import {
    ConflictException,
    HttpException,
    HttpStatus,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';

export interface IError {
    status: number;
    errorCode: string;
    message: string;
    data: object;
}

export class ExceptionHelper {
    private static instance: ExceptionHelper;
    // constructor() {}

    static getInstance(): ExceptionHelper {
        ExceptionHelper.instance = ExceptionHelper.instance || new ExceptionHelper();
        return ExceptionHelper.instance;
    }

    postNotFoundException(message: string): void {
        throw new NotFoundException({ statusCode: HttpStatus.NOT_FOUND, message: [message] });
    }

    postUnauthorizedException({ message }: { message: string }): void {
        throw new UnauthorizedException({ statusCode: HttpStatus.UNAUTHORIZED, message });
    }

    postForbiddenException(message: string): void {
        throw { statusCode: HttpStatus.FORBIDDEN, message: [message] };
    }

    postBadRequestException(message: string): void {
        throw new NotFoundException({ statusCode: HttpStatus.FORBIDDEN, message: [message] });
    }

    postConflictException(message: string): void {
        throw new ConflictException({ statusCode: HttpStatus.CONFLICT, message: [message] });
    }

    internalServerErrorWithDynamicMessage(error: { message: string }): void {
        throw new InternalServerErrorException({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: error.message,
        });
    }

    throwUserNotFoundException(): void {
        this.defaultError('User not found', 'user_not_found', HttpStatus.NOT_FOUND);
    }

    throwProjectNotFoundException(): void {
        this.defaultError('Project not found', 'project_not_found', HttpStatus.NOT_FOUND);
    }

    throwBoardNotFoundException(): void {
        this.defaultError('Board not found', 'board_not_found', HttpStatus.NOT_FOUND);
    }

    throwVendorNotFoundException(): void {
        this.postNotFoundException('Vendor not found');
    }

    throwMemberNotFoundException(): void {
        this.postNotFoundException('member_not_found');
    }

    notPermittedException(): void {
        this.postBadRequestException('not_permitted');
    }

    userNotPermitted(): void {
        this.postForbiddenException('user_not_permitted');
    }

    userNotVerified(): void {
        this.postForbiddenException('user_not_verified');
    }

    alreadyExists(): void {
        this.postForbiddenException('email/ein/address already exists');
    }

    userAlreadyExists(): void {
        this.postForbiddenException('user already exists');
    }

    siteInUse(): void {
        this.postForbiddenException('site is already in use');
    }

    siteIsDummy(): void {
        this.postForbiddenException('you are using a dummy site');
    }

    fileTypeForbidden(): void {
        this.postForbiddenException('File Type Unsupported');
    }

    tokenExpired(): void {
        this.postUnauthorizedException({ message: 'The Link has Expired' });
    }

    tokenInvalid(): void {
        this.postUnauthorizedException({ message: 'token_invalid' });
    }

    noDataFound(): void {
        this.postNotFoundException('No_data_found');
    }

    companyNotFound(): void {
        this.postNotFoundException('Company_not_found');
    }

    userNotMatched(): void {
        throw new UnauthorizedException({ statusCode: HttpStatus.UNAUTHORIZED, message: ['user_not_matched'] });
    }

    userDoesNotExist(): void {
        throw new UnauthorizedException({
            status: HttpStatus.UNAUTHORIZED,
            errorCode: ['user_does_not_exist'],
            message: 'user does not exist',
            data: {},
        });
    }

    passwordValidation(): void {
        throw {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Use at least 8 characters, with a mix of upper & lower case letters and a number.',
        };
    }

    propertyNotMatch(): void {
        this.postNotFoundException('Property does not belong to this company');
    }

    userHasAccepted(): void {
        this.postNotFoundException('user has already accepted');
    }

    userWasVerified(): void {
        this.postNotFoundException('user has already verified');
    }

    /***Stripe Error */
    // cardDeclined(message: string, errorCode: string): void {
    //     const error: IError = { status: 402, errorCode: errorCode, message: message ? message : '', data: {} };
    //     throw new HttpException(error, HttpStatus.PAYMENT_REQUIRED);
    // }

    // paymentError(message: string, errorCode: string): void {
    //     const error: IError = { status: 402, errorCode: errorCode, message: message ? message : '', data: {} };
    //     throw new HttpException(error, HttpStatus.PAYMENT_REQUIRED);
    // }

    defaultError(message: any, errorCode: string, statusCode: number, data?: any): void {
        const error: IError = {
            status: statusCode,
            errorCode: errorCode,
            message: message ? message : [],
            data: data ? data : {},
        };
        throw new HttpException(error, statusCode);
    }

    notAllowError(): void {
        const error: IError = {
            message: 'You Are Not Allow To Perform This Action',
            errorCode: 'forbidden',
            status: HttpStatus.FORBIDDEN,
            data: {},
        };
        throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
}
