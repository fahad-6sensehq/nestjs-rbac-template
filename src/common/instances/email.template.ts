// import { IPaymentNotificationParams } from '@modules/billing-management/interfaces/payment-notification-params.interface';

// export class EmailTemplate {
//     static getForgetPasswordEmailHtml(firstName: string, lastName: string, resetPasswordLink: string): string {
//         return `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8">
//       <meta http-equiv="X-UA-Compatible" content="IE=edge">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
//       <link rel="preconnect" href="https://fonts.googleapis.com">
//     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
//     <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
//        <style>
//       .button {
//         display: inline-block;
//         background-color: #2969FF;
//         color: #ffffff;
//         padding: 10px 16px;
//         text-decoration: none;
//         border-radius: 5px;
//       }
//   </style>
//     </head>
//     <body style="background-color: #ffffff; font-family: 'Roboto', sans-serif !important; width: 640px; margin: auto; position: relative; top: 75px">
//         <table
//       style="margin: auto; padding-left: 32px; width:550px;"
//       role="presentation"
//       border="0"
//       cellspacing="0"
//       width="100%"
//     >
//       <tr>
//         <td style="padding: 40px 0 72px 0px;">
//           <img
//             style="max-width: 134px; width: 100%;"
//             src="https://pattern50.s3.amazonaws.com/pattern50_P50-Cm37.svg"
//           />
//         </td>
//       </tr>
//     </table>
//         <table style="background-color: #F8F9FB; width: 500px; margin: auto; padding: 32px; border-radius: 8px">
//           <tr>
//             <td colspan="5" style="font-weight: bold; padding-bottom: 20px; font-size: 20px;color:#121A26;">Reset Password Request.</td>
//           </tr>
//           <tr>
//             <td colspan="5" style="padding-bottom: 20px;color:#384860;">
//               Hello ${firstName} ${lastName} ,
//             </td>

//           </tr>
//           <tr>
//             <td colspan="5" style="padding-bottom: 20px;color:#384860;">
//               We've received a request to reset your password.
//             </td>
//             <tr>
//             <td colspan="5" style="padding-bottom: 20px;color:#384860;">
//               If you didn't make the request, just ignore this message. Otherwise, you can reset your password by clicking the button below.
//             </td>
//           </tr>
//           <tr>
//             <td colspan="5" style="padding-bottom: 0px;color:#384860;">
//               Thanks,
//             </td>
//           </tr>
//           <tr>
//             <td colspan="5" style="padding-bottom: 20px;color:#384860;">
//               Pattern50 Team
//             </td>
//           </tr>
//             <tr>
//               <td>
//                 <a href=${resetPasswordLink} style="color:white" class="button">Reset your password</a>
//               </td>
//             </tr>
//         </table>
//         <table style="width: 500px; margin: 56px auto; padding: 0px;">
//           <tr>
//             <td colspan="5" style="padding-bottom: 20px; font-size: 14px; color:#858C95;">Questions or FAQ? Contact us at <a style="color:#0C66E4; text-decoration:none;" href="mailto:support@pattern50.com">support@pattern50.com</a>. For more information about Pattern50, visit <a style="color:#0C66E4; text-decoration:none; cursor: pointer" href="https://www.pattern50.com">www.pattern50.com</a>.</td>
//           </tr>
//           <tr>
//             <td colspan="5" style="padding-bottom: 24px; font-size:14px; color:#858C95;">© 2024 Pattern50.</td>
//           </tr>

//         </table>
//     </body>
//     </html>
//     `;
//     }
//     static userInvitationEmailTemplate(
//         sender: string,
//         userType: string,
//         firstName: string,
//         lastName: string,
//         resetPasswordLink: string
//     ): string {
//         return `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8">
//       <meta http-equiv="X-UA-Compatible" content="IE=edge">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
//       <link rel="preconnect" href="https://fonts.googleapis.com">
//     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
//     <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
//       <style>
//       .button {
//         display: inline-block;
//         background-color: #2969FF;
//         color: #ffffff;
//         padding: 10px 16px;
//         text-decoration: none;
//         border-radius: 5px;
//       }
//   </style>
//     </head>
//     <body style="background-color: #ffffff; font-family: 'Roboto', sans-serif !important; width: 640px; margin: auto; position: relative; top: 75px">
//         <table
//       style="padding-left: 0px; width:576px;"
//       role="presentation"
//       border="0"
//       cellspacing="0"
//       width="100%"
//     >
//       <tr>
//         <td style="padding: 40px 32px;">
//           <img
//             style="max-width: 134px; width: 100%;"
//             src="https://pattern50.s3.amazonaws.com/pattern50_P50-Cm37.svg"
//           />
//         </td>
//       </tr>
//     </table>
//         <table style="background-color: #F8F9FB; width: 576px; margin: 32px; padding: 32px; border-radius: 8px">
//           <tr>
//             <td colspan="5" style="font-weight: bold; padding-bottom: 20px; font-size: 20px;color:#121A26;">${sender} has invited ${firstName} ${lastName} to join Pattern50.</td>
//           </tr>
//           <tr>
//             <td colspan="5" style="padding-bottom: 24px;color:#384860;">
//               You have been invited to Pattern50 as a ${userType}.  Join your team by clicking the button below and completing the registration process.
//             </td>
//           </tr>
//           <tr>
//             <td colspan="5" style="padding-bottom: 0px;color:#384860;">
//               Thank you,
//             </td>
//           </tr>
//           <tr>
//             <td colspan="5" style="padding-bottom: 20px;color:#384860;">
//               The Pattern50 Team
//             </td>
//           </tr>
//             <tr>
//               <td>
//                  <a target="_blank" href="${resetPasswordLink}">
//                   <button style="display: inline-block !important; background-color: #2969FF; color: white; padding: 10px 16px; border-radius: 6px; border: 0; cursor: pointer; font-weight: 500;">
//                    Complete registration
//                   </button>
//                 </a>
//               </td>
//             </tr>
//         </table>
//         <table style="width: 576px; padding:0px 32px;">
//           <tr>
//             <td colspan="5" style="padding-bottom: 20px; font-size: 14px; color:#858C95;">Questions or FAQ? Contact us at <a style="color:#0C66E4; text-decoration:none;" href="mailto:support@pattern50.com">support@pattern50.com</a>. For more information about Pattern50, visit <a style="color:#0C66E4; text-decoration:none;" href="https://www.pattern50.com">www.pattern50.com</a>.</td>
//           </tr>
//           <tr>
//             <td colspan="5" style="padding-bottom: 24px; font-size:14px; color:#858C95;">&#169 2024 Pattern50.</td>
//           </tr>

//         </table>
//     </body>
//     </html>
//     `;
//     }
//     static userInvitationEmailTemplateForCompanyMainAdmin(
//         sender: string,
//         companyName: string,
//         userType: string,
//         firstName: string,
//         lastName: string,
//         resetPasswordLink: string
//     ): string {
//         return `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8">
//       <meta http-equiv="X-UA-Compatible" content="IE=edge">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
//       <link rel="preconnect" href="https://fonts.googleapis.com">
//     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
//     <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
//       <style>
//       .button {
//         display: inline-block;
//         background-color: #2969FF;
//         color: #ffffff;
//         padding: 10px 16px;
//         text-decoration: none;
//         border-radius: 5px;
//       }
//   </style>
//     </head>
//     <body style="background-color: #ffffff; font-family: 'Roboto', sans-serif !important; width: 640px; margin: auto; position: relative; top: 75px">
//         <table
//       style="padding-left: 0px; width:576px;"
//       role="presentation"
//       border="0"
//       cellspacing="0"
//       width="100%"
//     >
//       <tr>
//         <td style="padding: 40px 32px;">
//           <img
//             style="max-width: 134px; width: 100%;"
//             src="https://pattern50.s3.amazonaws.com/pattern50_P50-Cm37.svg"
//           />
//         </td>
//       </tr>
//     </table>
//         <table style="background-color: #F8F9FB; width: 576px; margin: 32px; padding: 32px; border-radius: 8px">
//           <tr>
//             <td colspan="5" style="font-weight: bold; padding-bottom: 20px; font-size: 20px;color:#121A26;">${sender} has invited ${firstName} ${lastName} to join ${companyName} at Pattern50.</td>
//           </tr>
//           <tr>
//             <td colspan="5" style="padding-bottom: 24px;color:#384860;">
//               You have been invited to ${companyName} as a ${userType}.  Join your team by clicking the button below and completing the registration process.
//             </td>
//           </tr>
//           <tr>
//             <td colspan="5" style="padding-bottom: 0px;color:#384860;">
//               Thank you,
//             </td>
//           </tr>
//           <tr>
//             <td colspan="5" style="padding-bottom: 20px;color:#384860;">
//               The Pattern50 Team
//             </td>
//           </tr>
//             <tr>
//               <td>
//                  <a target="_blank" href="${resetPasswordLink}">
//                   <button style="display: inline-block !important; background-color: #2969FF; color: white; padding: 10px 16px; border-radius: 6px; border: 0; cursor: pointer; font-weight: 500;">
//                    Complete registration
//                   </button>
//                 </a>
//               </td>
//             </tr>
//         </table>
//         <table style="width: 576px; padding:0px 32px;">
//           <tr>
//             <td colspan="5" style="padding-bottom: 20px; font-size: 14px; color:#858C95;">Questions or FAQ? Contact us at <a style="color:#0C66E4; text-decoration:none;" href="mailto:support@pattern50.com">support@pattern50.com</a>. For more information about Pattern50, visit <a style="color:#0C66E4; text-decoration:none;" href="https://www.pattern50.com">www.pattern50.com</a>.</td>
//           </tr>
//           <tr>
//             <td colspan="5" style="padding-bottom: 24px; font-size:14px; color:#858C95;">© 2024 Pattern50.</td>
//           </tr>

//         </table>
//     </body>
//     </html>
//     `;
//     }
//     static getPasswordResetSuccessEmailHtml(firstName: string, lastName: string): string {
//         return `
//         <!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8">
//       <meta http-equiv="X-UA-Compatible" content="IE=edge">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
//       <link rel="preconnect" href="https://fonts.googleapis.com">
//     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
//     <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
//       <title>Password Reset</title>
//     </head>
//     <body style="background-color: #f8f8fc; font-family: 'Roboto', sans-serif !important; width: 600px; margin: auto; position: relative; top: 75px">
//         <table
//       style="margin: 0 auto; padding: 20px 0;"
//       role="presentation"
//       border="0"
//       cellspacing="0"
//       width="100%"
//     >
//       <tr>
//         <td align="center">
//           <img
//             style="max-width: 150px; width: 100%;"
//             src="https://user-images.githubusercontent.com/78010933/199701990-130b8a0c-f1cc-4f1e-8b26-ae15374e9e00.png"
//           />
//         </td>
//       </tr>
//     </table>
//         <table style="background-color: white; width: 500px; margin: auto; padding: 20px 30px;">
//           <tr>
//             <td colspan="5" style="font-weight: bold; padding-bottom: 20px">Password Reset Successful</td>
//           </tr>
//           <tr>
//             <td colspan="5" style="padding-bottom: 20px">
//               Hello ${firstName} ${lastName},
//             </td>
//           </tr>
//           <tr>
//             <td colspan="5" style="padding-bottom: 30px">
//               Your password has been successfully changed.
//             </td>
//           <tr>
//             <td colspan="5" style="padding-top: 20px">For more information about Charge OnSite visit</td>
//           </tr>
//           <tr>
//             <td colspan="5" style="padding-top: 5px">
//               <a href="${process.env.CLIENT_BASE_URL}" style="color: #2969FF">${process.env.CLIENT_BASE_URL}</a>
//             </td>
//           </tr>
//         </table>
//         <table style="background-color: white; width: 500px; margin: 30px auto; padding: 20px 30px;">
//           <tr>
//             <td colspan="5" style="padding-bottom: 0px !important; font-weight: bold">Facing any problem?</td>
//           </tr>
//           <tr>
//             <td colspan="5" style="padding-top: 5px">Contact at <a href = "mailto:support@chargeonsite.com" style="color: #2969FF">support@chargeonsite.com</a></td>
//           </tr>

//         </table>
//         <table style="text-align: center; margin-top: 30px; margin: auto">
//                 <tr>
//                    <td>&nbsp;</td>
//                 </tr>
//               </table>
//     </body>
//     </html>
//     `;
//     }

//     static companyInvitationTemplate(resetPasswordLink: string, admin: string, company: string): string {
//         return `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8">
//       <meta http-equiv="X-UA-Compatible" content="IE=edge">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
//       <link rel="preconnect" href="https://fonts.googleapis.com">
//     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
//     <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
//     </head>
//     <body style="background-color: #ffffff; font-family: 'Roboto', sans-serif !important; width: 640px; margin: auto; position: relative; top: 75px">
//         <table
//         class="tableClass"
//       style="padding-left: 0px; width:576px;"
//       role="presentation"
//       border="0"
//       cellspacing="0"
//       width="100%"
//     >
//       <tr>
//         <td style="padding: 40px 32px;">
//           <img
//             style="max-width: 134px; width: 100%;"
//             src="https://pattern50.s3.amazonaws.com/pattern50_P50-Cm37.svg"
//           />
//         </td>
//       </tr>
//     </table>
//         <table style="background-color: #F8F9FB; width: 576px; margin: 32px; padding:32px; border-radius: 8px">
//           <tr>
//             <td colspan="5" style="font-weight: bold; padding-bottom: 20px; font-size: 20px;color:#121A26;">${admin} has invited ${company} to join Pattern50.</td>
//           </tr>
//           <tr>
//             <td colspan="5" style="padding-bottom: 24px;color:#384860;">
//               You have been invited to set up your profile and password to complete your registration on Pattern50 system.
//             </td>
//           </tr>
//           <tr>
//             <td colspan="5" style="padding-bottom: 0px;color:#384860;">
//               Thanks,
//             </td>
//           </tr>
//           <tr>
//             <td colspan="5" style="padding-bottom: 20px;color:#384860;">
//               Pattern50 Team
//             </td>
//           </tr>
//             <tr>
//               <td>
//                 <a  target="_blank" href="${resetPasswordLink}">
//                   <button style="display: inline-block !important; background-color: #2969FF; color: white; padding: 10px 16px; border-radius: 6px; border: 0; cursor: pointer; font-weight: 500;">
//                     Set up your profile & password
//                   </button>
//                 </a>
//               </td>
//             </tr>
//         </table>
//         <table style="width: 576px; padding: 0px 32px;">
//           <tr>
//             <td colspan="5" style="padding-bottom: 20px; font-size: 14px; color:#858C95;">Questions or FAQ? Contact us at <a style="color:#0C66E4; text-decoration:none;" href="mailto:support@pattern50.com">support@pattern50.com</a>. For more information about Pattern50, visit <a style="color:#0C66E4; text-decoration:none;" href="https://www.pattern50.com">www.pattern50.com</a>.</td>
//           </tr>
//           <tr>
//             <td colspan="5" style="padding-bottom: 24px; font-size:14px; color:#858C95;">&#169 2024 Pattern50.</td>
//           </tr>

//         </table>
//     </body>
// </html>
// `;
//     }

//     static achBankFailedEmailTemplate(data: IPaymentNotificationParams): string {
//         return `<!DOCTYPE html>
// <html lang="en">

// <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
//     <link rel="preconnect" href="https://fonts.googleapis.com">
//     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
//     <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
// </head>

// <body style="background-color: #ffffff; font-family: 'Roboto', sans-serif !important; width: 640px; margin: auto; position: relative; top: 75px">
//     <table class="tableClass" style="padding-left: 0px; width:576px;" role="presentation" border="0" cellspacing="0" width="100%">
//         <tr>
//             <td style="padding: 40px 32px;">
//                 <img style="max-width: 134px; width: 100%;" src="https://pattern50.s3.amazonaws.com/pattern50_P50-Cm37.svg" />
//             </td>
//         </tr>
//     </table>
//     </table>
//     <table style="background-color: #F8F9FB; width: 576px; margin: auto; padding: 20px 30px; border-radius: 8px">
//         <tr>
//             <!-- <td colspan="5" style="font-weight: bold; padding-bottom: 20px">Charger Security Event Notification and Log Retrieval Overview</td> -->
//         </tr>
//         <tr>
//             <td colspan="5" style="padding-bottom: 5px">
//                 <div style="display: flex; align-items: center;">

//                     <h2 style="color: #C8322B;">Payment Failed</h2>
//                 </div>
//             </td>
//         </tr>

//         <tr>
//             <td colspan="5" style="padding-bottom: 30px">
//                 We were unable to successfully process your payment.
//             </td>
//         </tr>
//         <tr>
//             <td colspan="5" style="padding-bottom: 10px; line-height: 24px;">
//                 Please enter a valid payment method and try your payment again.
//             </td>
//         </tr>

//         <tr>
//             <td colspan="5" style="padding-bottom: 0px; font-size:20px; font-weight:500">
//                 <p style="padding-bottom: 8px; font-size:20px; font-weight:500">Payment Details</p>
//             </td>
//         </tr>

//         <tr style='vertical-align: baseline'>
//             <td style='padding-bottom: 5px;'>Amount</td>
//             <td>:</td>
//             <td style="padding-left: 10px">$${data?.amountPaid?.toFixed(2)}</td>
//         </tr>

//         <tr style='vertical-align: baseline'>
//             <td style='padding-bottom: 5px;'>Client Name</td>
//             <td>:</td>
//             <td style="padding-left: 10px">${data?.clientName}</td>
//         </tr>

//         <tr style='vertical-align: baseline'>
//             <td style='padding-bottom: 5px;'>Client Email</td>
//             <td>:</td>
//             <td style="padding-left: 10px">${data?.email}</td>
//         </tr>

//         <tr style='vertical-align: baseline'>
//             <td style='width: 135px;padding-bottom: 5px;'>Method</td>
//             <td>:</td>
//             <td style="padding-left: 10px">Bank ending with ${data?.last4}</td>
//         </tr>

//         <tr style='vertical-align: baseline'>
//             <td style='padding-bottom: 5px;'>Initiate Date</td>
//             <td>:</td>
//             <td style="padding-left: 10px">${data?.paymentInitiateDate}</td>
//         </tr>

//         <tr style='vertical-align: baseline'>
//             <td style='padding-bottom: 5px;'>Invoice NO</td>
//             <td>:</td>
//             <td style="padding-left: 10px">${data?.invoiceNumber}</td>
//         </tr>

//     </table>
//     <table style="width: 576px; margin-top:56px; padding: 0px 32px;">
//         <tr>
//             <td colspan="5" style="padding-bottom: 20px; font-size: 14px; color:#858C95;">Questions or FAQ? Contact us at <a style="color:#0C66E4; text-decoration:none;" href="mailto:support@pattern50.com">support@pattern50.com</a>. For more information about Pattern50, visit <a style="color:#0C66E4; text-decoration:none;" href="https://www.pattern50.com">www.pattern50.com</a>.</td>
//         </tr>
//         <tr>
//             <td colspan="5" style="padding-bottom: 24px; font-size:14px; color:#858C95;">© 2024 Pattern50.</td>
//         </tr>

//     </table>
// </body>

// </html>`;
//     }

//     static achBankVerificationFailedTemplate(data: IPaymentNotificationParams): string {
//         return `<!DOCTYPE html>
// <html lang="en">

// <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
//     <link rel="preconnect" href="https://fonts.googleapis.com">
//     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
//     <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
// </head>

// <body style="background-color: #ffffff; font-family: 'Roboto', sans-serif !important; width: 640px; margin: auto; position: relative; top: 75px">
//     <table class="tableClass" style="padding-left: 0px; width:576px;" role="presentation" border="0" cellspacing="0" width="100%">
//         <tr>
//             <td style="padding: 40px 32px;">
//                 <img style="max-width: 134px; width: 100%;" src="https://pattern50.s3.amazonaws.com/pattern50_P50-Cm37.svg" />
//             </td>
//         </tr>
//     </table>
//     </table>
//     <table style="background-color: #F8F9FB; width: 576px; margin: auto; padding: 20px 30px; border-radius: 8px">
//         <tr>
//             <!-- <td colspan="5" style="font-weight: bold; padding-bottom: 20px">Charger Security Event Notification and Log Retrieval Overview</td> -->
//         </tr>
//         <tr>
//             <td colspan="5" style="padding-bottom: 5px">
//                 <div style="display: flex; align-items: center;">

//                     <h2 style="color: #C8322B;">Verification Failed</h2>
//                 </div>
//             </td>
//         </tr>

//         <tr>
//             <td colspan="5" style="padding-bottom: 30px">
//                 We were unable to verify your bank account. Payment has failed.
//             </td>
//         </tr>
//         <tr>
//             <td colspan="5" style="padding-bottom: 10px">
//                Please enter a valid bank account and attempt your payment again.
//             </td>
//         </tr>

//         <tr>
//             <td colspan="5" style="padding-bottom: 0px; font-size:20px; font-weight:500">
//                 <p style="padding-bottom: 8px; font-size:20px; font-weight:500">Payment Details</p>
//             </td>
//         </tr>

//         <tr style='vertical-align: baseline'>
//             <td style='padding-bottom: 5px;'>Amount</td>
//             <td>:</td>
//             <td style="padding-left: 10px">$${data?.amountPaid?.toFixed(2)}</td>
//         </tr>

//         <tr style='vertical-align: baseline'>
//             <td style='padding-bottom: 5px;'>Client Name</td>
//             <td>:</td>
//             <td style="padding-left: 10px">${data?.clientName}</td>
//         </tr>

//         <tr style='vertical-align: baseline'>
//             <td style='padding-bottom: 5px;'>Client Email</td>
//             <td>:</td>
//             <td style="padding-left: 10px">${data?.email}</td>
//         </tr>

//         <tr style='vertical-align: baseline'>
//             <td style='width: 135px;padding-bottom: 5px;'>Method</td>
//             <td>:</td>
//             <td style="padding-left: 10px">Bank ending with ${data?.last4}</td>
//         </tr>

//         <tr style='vertical-align: baseline'>
//             <td style='padding-bottom: 5px;'>Initiate Date</td>
//             <td>:</td>
//             <td style="padding-left: 10px">${data?.paymentInitiateDate}</td>
//         </tr>

//         <tr style='vertical-align: baseline'>
//             <td style='padding-bottom: 5px;'>Invoice NO</td>
//             <td>:</td>
//             <td style="padding-left: 10px">${data?.invoiceNumber}</td>
//         </tr>

//     </table>
//     <table style="width: 576px; margin-top:56px; padding: 0px 32px;">
//         <tr>
//             <td colspan="5" style="padding-bottom: 20px; font-size: 14px; color:#858C95;">Questions or FAQ? Contact us at <a style="color:#0C66E4; text-decoration:none;" href="mailto:support@pattern50.com">support@pattern50.com</a>. For more information about Pattern50, visit <a style="color:#0C66E4; text-decoration:none;" href="https://www.pattern50.com">www.pattern50.com</a>.</td>
//         </tr>
//         <tr>
//             <td colspan="5" style="padding-bottom: 24px; font-size:14px; color:#858C95;">© 2024 Pattern50.</td>
//         </tr>

//     </table>
// </body>

// </html>`;
//     }

//     static achBankSucceedEmailTemplate(data: IPaymentNotificationParams): string {
//         return `
//    <!DOCTYPE html>
// <html lang="en">

// <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
//     <link rel="preconnect" href="https://fonts.googleapis.com">
//     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
//     <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
// </head>

// <body style="background-color: #ffffff; font-family: 'Roboto', sans-serif !important; width: 640px; margin: auto; position: relative; top: 75px">
//     <table class="tableClass" style="padding-left: 0px; width:576px;" role="presentation" border="0" cellspacing="0" width="100%">
//         <tr>
//             <td style="padding: 40px 32px;">
//                 <img style="max-width: 134px; width: 100%;" src="https://pattern50.s3.amazonaws.com/pattern50_P50-Cm37.svg" />
//             </td>
//         </tr>
//     </table>
//     </table>
//     <table style="background-color: #F8F9FB; width: 576px; margin: auto; padding: 20px 30px; border-radius: 8px">
//         <tr>
//             <!-- <td colspan="5" style="font-weight: bold; padding-bottom: 20px">Charger Security Event Notification and Log Retrieval Overview</td> -->
//         </tr>
//         <tr>
//             <td colspan="5" style="padding-bottom: 5px">
//                 <div style="display: flex; align-items: center;">

//                     <h2 style="color: #2AA63C;">Payment Successful</h2>
//                 </div>
//             </td>
//         </tr>

//         <tr>
//             <td colspan="5" style="padding-bottom: 10px">
//                 Your payment to Pattern50 LLC was successful.
//             </td>
//         </tr>
//         <tr>
//             <td colspan="5" style="padding-bottom: 0px; font-size:20px; font-weight:500">
//                 <p style="padding-bottom: 8px; font-size:20px; font-weight:500">Payment Details</p>
//             </td>
//         </tr>

//         <tr style='vertical-align: baseline'>
//             <td style='padding-bottom: 5px;'>Amount Paid</td>
//             <td>:</td>
//             <td style="padding-left: 10px">$${data?.amountPaid?.toFixed(2)}</td>
//         </tr>

//         <tr style='vertical-align: baseline'>
//             <td style='padding-bottom: 5px;'>Client Name</td>
//             <td>:</td>
//             <td style="padding-left: 10px">${data?.clientName}</td>
//         </tr>

//         <tr style='vertical-align: baseline'>
//             <td style='padding-bottom: 5px;'>Client Email</td>
//             <td>:</td>
//             <td style="padding-left: 10px">${data?.email}</td>
//         </tr>

//         <tr style='vertical-align: baseline'>
//             <td style='width: 135px;padding-bottom: 5px;'>Method</td>
//             <td>:</td>
//             <td style="padding-left: 10px">Bank ending with ${data?.last4}</td>
//         </tr>

//         <tr style='vertical-align: baseline'>
//             <td style='padding-bottom: 5px;'>Initiate Date</td>
//             <td>:</td>
//             <td style="padding-left: 10px">${data?.paymentInitiateDate}</td>
//         </tr>

//         <tr style='vertical-align: baseline'>
//             <td style='padding-bottom: 5px;'>Invoice NO</td>
//             <td>:</td>
//             <td style="padding-left: 10px">${data?.invoiceNumber}</td>
//         </tr>

//     </table>
//     <table style="width: 576px; margin-top:56px; padding: 0px 32px;">
//         <tr>
//             <td colspan="5" style="padding-bottom: 20px; font-size: 14px; color:#858C95;">Questions or FAQ? Contact us at <a style="color:#0C66E4; text-decoration:none;" href="mailto:support@pattern50.com">support@pattern50.com</a>. For more information about Pattern50, visit <a style="color:#0C66E4; text-decoration:none;" href="https://www.pattern50.com">www.pattern50.com</a>.</td>
//         </tr>
//         <tr>
//             <td colspan="5" style="padding-bottom: 24px; font-size:14px; color:#858C95;">© 2024 Pattern50.</td>
//         </tr>

//     </table>
// </body>

// </html>
//     `;
//     }

//     static achBankInitiatedEmailTemplate(data: IPaymentNotificationParams): string {
//         return `
//    <!DOCTYPE html>
// <html lang="en">

// <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
//     <link rel="preconnect" href="https://fonts.googleapis.com">
//     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
//     <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
// </head>

// <body style="background-color: #ffffff; font-family: 'Roboto', sans-serif !important; width: 640px; margin: auto; position: relative; top: 75px">
//     <table class="tableClass" style="padding-left: 0px; width:576px;" role="presentation" border="0" cellspacing="0" width="100%">
//         <tr>
//             <td style="padding: 40px 32px;">
//                 <img style="max-width: 134px; width: 100%;" src="https://pattern50.s3.amazonaws.com/pattern50_P50-Cm37.svg" />
//             </td>
//         </tr>
//     </table>
//     </table>
//     <table style="background-color: #F8F9FB; width: 576px; margin: auto; padding: 20px 30px; border-radius: 8px">
//         <tr>
//             <!-- <td colspan="5" style="font-weight: bold; padding-bottom: 20px">Charger Security Event Notification and Log Retrieval Overview</td> -->
//         </tr>
//         <tr>
//             <td colspan="5" style="padding-bottom: 5px">
//                 <div style="display: flex; align-items: center;">

//                     <h2 style="color:#0C66E4;">Payment Initiated</h2>
//                 </div>
//             </td>
//         </tr>

//         <tr>
//             <td colspan="5" style="padding-bottom: 10px">
//                 Your payment to Pattern50 LLC has been initiated.
//             </td>
//         </tr>

//         <tr>
//             <td colspan="5" style="padding-bottom: 10px">
//                 Please allow 2-3 business days for this payment to process. You will receive another email when this payment is successful.
//             </td>
//         </tr>

//         <tr>
//             <td colspan="5" style="padding-bottom: 0px;">
//               <p style="padding-bottom: 0px; font-size:20px; font-weight:500">Payment Details</p>
//             </td>
//         </tr>

//         <tr style='vertical-align: baseline'>
//             <td style='padding-bottom: 5px;'>Amount</td>
//             <td>:</td>
//             <td style="padding-left: 10px">$${data?.amountPaid?.toFixed(2)}</td>
//         </tr>

//         <tr style='vertical-align: baseline'>
//             <td style='padding-bottom: 5px;'>Client Name</td>
//             <td>:</td>
//             <td style="padding-left: 10px">${data?.clientName}</td>
//         </tr>

//         <tr style='vertical-align: baseline'>
//             <td style='padding-bottom: 5px;'>Client Email</td>
//             <td>:</td>
//             <td style="padding-left: 10px">${data?.email}</td>
//         </tr>

//         <tr style='vertical-align: baseline'>
//             <td style='width: 135px;padding-bottom: 5px;'>Method</td>
//             <td>:</td>
//             <td style="padding-left: 10px">Bank ending with ${data?.last4}</td>
//         </tr>

//         <tr style='vertical-align: baseline'>
//             <td style='padding-bottom: 5px;'>Initiate Date</td>
//             <td>:</td>
//             <td style="padding-left: 10px">${data?.paymentInitiateDate}</td>
//         </tr>

//         <tr style='vertical-align: baseline'>
//             <td style='padding-bottom: 5px;'>Invoice NO</td>
//             <td>:</td>
//             <td style="padding-left: 10px">${data?.invoiceNumber}</td>
//         </tr>

//     </table>
//     <table style="width: 576px; margin-top:56px; padding: 0px 32px;">
//         <tr>
//             <td colspan="5" style="padding-bottom: 20px; font-size: 14px; color:#858C95;">Questions or FAQ? Contact us at <a style="color:#0C66E4; text-decoration:none;" href="mailto:support@pattern50.com">support@pattern50.com</a>. For more information about Pattern50, visit <a style="color:#0C66E4; text-decoration:none;" href="https://www.pattern50.com">www.pattern50.com</a>.</td>
//         </tr>
//         <tr>
//             <td colspan="5" style="padding-bottom: 24px; font-size:14px; color:#858C95;">© 2024 Pattern50.</td>
//         </tr>

//     </table>
// </body>

// </html>
//     `;
//     }
// }
