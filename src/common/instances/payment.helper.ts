// import { Logger } from '@nestjs/common';
// import Stripe from 'stripe';

// export class PaymentHelper {
//     private stripe: Stripe | null = null;
//     private logger: Logger = new Logger(PaymentHelper.name);

//     constructor(stripe: Stripe) {
//         this.stripe = stripe;
//     }

//     async createCustomer(
//         name: string,
//         email: string,
//         phone: string,
//         metadata: Record<string, string>,
//     ): Promise<Stripe.Customer> {
//         if (!this.stripe) {
//             throw new Error('Stripe instance is not initialized');
//         }

//         try {
//             const customer = await this.stripe.customers.create({
//                 name,
//                 email,
//                 phone,
//                 metadata,
//             });

//             return customer;
//         } catch (error) {
//             this.logger.error('Error creating Stripe customer:', error);
//             throw new Error('Failed to create Stripe customer');
//         }
//     }
// }
