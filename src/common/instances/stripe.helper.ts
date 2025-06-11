// import { Logger } from '@nestjs/common';
// import { IUser } from 'modules/user/interface/user.interface';
// import { IVendor } from 'modules/vendor/interface/vendor.interface';
// import Stripe from 'stripe';
// import { PaymentHelper } from './payment.helper';

// export class StripeHelper {
//     private static instance: StripeHelper;
//     private logger: Logger = new Logger(StripeHelper.name);

//     static getInstance(): StripeHelper {
//         StripeHelper.instance = StripeHelper.instance || new StripeHelper();
//         return StripeHelper.instance;
//     }

//     async getStripe(sk: string): Promise<any> {
//         const stripeSecretKey = sk;
//         if (!stripeSecretKey) {
//             throw new Error('Stripe secret key is not set');
//         }

//         const stripe = new Stripe(stripeSecretKey, {
//             apiVersion: '2025-05-28.basil',
//         });

//         return stripe;
//     }

//     async creteStripeCustomer(vendor: IVendor, user: IUser, sk: string): Promise<any> {
//         try {
//             const stripe = await this.getStripe(sk);
//             const paymentHelper = new PaymentHelper(stripe);

//             const customer = await paymentHelper.createCustomer(vendor.name, vendor.email, vendor.phone, {
//                 vendorId: vendor._id.toString(),
//                 userId: user.userId.toString(),
//             });

//             return customer;
//         } catch (error) {
//             this.logger.error('Error creating Stripe customer:', error);
//             throw new Error('Failed to create Stripe customer');
//         }
//     }
// }
