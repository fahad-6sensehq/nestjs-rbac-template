export class EmailTemplate {
    static sendVendorEmailHtml(setupPasswordLink: string): string {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <style>
    body {
      margin: 0;
      padding: 20px;
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
    }

    .container {
      background-color: #ffffff;
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 30px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.05);
    }

    p {
      font-size: 16px;
      line-height: 2.3;
      margin: 10px 0;
    }

    .link-box {
      background-color: #f3f3f3;
      padding: 12px;
      border-radius: 6px;
      word-break: break-word;
      font-family: monospace;
      font-size: 14px;
      margin: 20px 0;
    }

    .footer {
      font-size: 14px;
      color: #777;
      margin-top: 30px;
    }

    .footer a {
      color: #059669;
      text-decoration: none;
      text-decoration: underline;
    }

    @media (max-width: 600px) {
      body {
        padding: 20px;
      }
      .container {
        padding: 25px 16px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div style="text-align: left; margin-bottom: 20px;">
      <img src="https://reelsync-beta-public-bucket.s3.us-east-1.amazonaws.com/logo_reelsync-IthkHd.png"
        alt="ReelSync.io Logo"
        width="150"
        style="display: block;">
    </div>

    <p>Hi,</p>

    <p>You’ve been invited to Reelsync.io to manage & track your projects.</p>

    <p>Before signing in, please set up your account first:</p>
    
    <div>
      <a href="${setupPasswordLink}" 
         target="_blank"
         style="display: inline-block; text-align: center; background-color: #059669; padding: 10px 10px; border-radius: 99px; font-size: 16px; margin: 20px 0; width: 137px; height: 40px; color: #ffffff !important; text-decoration: none !important; line-height: 40px;">
         Set Up Account
      </a>
    </div>
    
    <p>Or</p>
    
    <div class="link-box">
      <a href="${setupPasswordLink}" target="_blank" style="color: #059669; text-decoration: none;">${setupPasswordLink}</a>
    </div>

    <p>Thank you</p>

    <p class="footer">
      Questions or FAQ? Contact us at <a href="mailto:support@reelsync.io">support@reelsync.io</a>.<br />
      For more information about Reelsync.io, visit <a href="https://www.reelsync.io">www.reelsync.io</a>.
    </p>
  </div>
</body>
</html>
`;
    }

    static sendClientInviteEmailHtml(email: string, resetPasswordLink: string): string {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <style>
    body {
      margin: 0;
      padding: 20px;
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
    }

    .container {
      background-color: #ffffff;
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 30px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.05);
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 20px;
    }

    .logo img {
      height: 32px;
    }

    h1 {
      font-size: 20px;
      margin-bottom: 20px;
    }

    p {
      font-size: 16px;
      line-height: 2.3;
      margin: 10px 0;
    }
    
    .link-box {
      background-color: #f3f3f3;
      padding: 12px;
      border-radius: 6px;
      word-break: break-all;
      font-family: monospace;
      font-size: 14px;
      margin: 20px 0;
    }

    .footer {
      font-size: 14px;
      color: #777;
      margin-top: 30px;
    }

    .footer a {
      color: #059669;
      text-decoration: none;
      text-decoration: underline;
    }

    @media (max-width: 600px) {
      body {
        padding: 20px;
      }
      .container {
        padding: 25px 16px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div style="text-align: left; margin-bottom: 20px;">
<img src="https://reelsync-beta-public-bucket.s3.us-east-1.amazonaws.com/logo_reelsync-IthkHd.png"
        alt="ReelSync.io Logo"
        width="150"
        style="display: block;">
      </div>

    <p>Hi,</p>

    <p>
		You’ve been invited to Reelsync.io to track your project’s status. Sign in with your email '${email}'.
    </p>

    <p>
      Before signing in, please set a strong password using this link:
    </p>
    
    <div class="link-box">
      <a href="${resetPasswordLink}" target="_blank">${resetPasswordLink}</a>
    </div>

    <p>
     Thank you
    </p>

    <p class="footer">
      Questions or FAQ? Contact us at <a href="mailto:support@reelsync.io">support@reelsync.io</a>.
      For more information about Reelsync.io, visit <a href="https://www.reelsync.io">www.reelsync.io</a>.
    </p>
  </div>
</body>
</html>
`;
    }

    static otherUserInviteEmailHtml(name: string, email: string, resetPasswordLink: string): string {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<style>
  body {
    margin: 0;
    padding: 20px;
    font-family: Arial, sans-serif;
    background-color: #f5f5f5;
  }

  .container {
    background-color: #ffffff;
    max-width: 600px;
    margin: 0 auto;
    padding: 40px 30px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0,0,0,0.05);
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 20px;
  }

  .logo img {
    height: 32px;
  }

  h1 {
    font-size: 20px;
    margin-bottom: 20px;
  }

  p {
    font-size: 16px;
    line-height: 2.3;
    margin: 10px 0;
  }

  .link-box {
    background-color: #f3f3f3;
    padding: 12px;
    border-radius: 6px;
    word-break: break-all;
    font-family: monospace;
    font-size: 14px;
    margin: 20px 0;
  }

  .footer {
    font-size: 14px;
    color: #777;
    margin-top: 30px;
  }

  .footer a {
    color: #059669;
    text-decoration: none;
    text-decoration: underline;
  }

  @media (max-width: 600px) {
    body {
      padding: 20px;
    }
    .container {
      padding: 25px 16px;
    }
  }
</style>
</head>
<body>
<div class="container">
  <div style="text-align: left; margin-bottom: 20px;">
<img src="https://reelsync-beta-public-bucket.s3.us-east-1.amazonaws.com/logo_reelsync-IthkHd.png"
      alt="ReelSync.io Logo"
      width="150"
      style="display: block;">
    </div>

  <p>Hi ${name},</p>

  <p>
  You’ve been invited to Reelsync.io as an Additional Client. Sign in with your email '${email}'.
  </p>

  <p>
    Before signing in, please set a strong password using this link:
  </p>

  <div class="link-box">
    <a href="${resetPasswordLink}" target="_blank">${resetPasswordLink}</a>
  </div>

  <p>
    Thank you
  </p>

  <p class="footer">
    Questions or FAQ? Contact us at <a href="mailto:support@reelsync.io">support@reelsync.io</a>.
    For more information about Reelsync.io, visit <a href="https://www.reelsync.io">www.reelsync.io</a>.
  </p>
</div>
</body>
</html>
  `;
    }

    static forgetPasswordEmailHtml(resetPasswordLink: string): string {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <style>
    body {
      margin: 0;
      padding: 20px;
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
    }

    .container {
      background-color: #ffffff;
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 30px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.05);
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 20px;
    }

    .logo img {
      height: 32px;
    }

    h1 {
      font-size: 20px;
      margin-bottom: 20px;
    }

    p {
      font-size: 16px;
      line-height: 2.3;
      margin: 10px 0;
    }

    
    .link-box {
      background-color: #f3f3f3;
      padding: 12px;
      border-radius: 6px;
      word-break: break-all;
      font-family: monospace;
      font-size: 14px;
      margin: 20px 0;
    }

    .footer {
      font-size: 14px;
      color: #777;
      margin-top: 30px;
    }

    .footer a {
      color: #059669;
      text-decoration: none;
      text-decoration: underline;
    }

    @media (max-width: 600px) {
      body {
        padding: 20px;
      }
      .container {
        padding: 25px 16px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div style="text-align: left; margin-bottom: 20px;">
<img src="https://reelsync-beta-public-bucket.s3.us-east-1.amazonaws.com/logo_reelsync-IthkHd.png"
        alt="ReelSync.io Logo"
        width="150"
        style="display: block;">
      </div>

    <p>Hi,</p>

    <p>
      You’ve been submitted a password change request.
    </p>

    <p>
      To change or reset the password use the button below or the link.
    </p>
    
    <div>
    	<a href="${resetPasswordLink}" target="_blank" style="display: inline-block; text-align: center; background-color: #059669; padding: 10px 10px; border-radius: 99px; font-size: 16px; margin: 20px 0; width: 137px; height: 40px; color: #ffffff !important; text-decoration: none !important; line-height: 40px;">Reset Password</a>
    </div>
    
	  <p>Or</p>
    
    <div class="link-box">
      <a href="${resetPasswordLink}" target="_blank">${resetPasswordLink}</a>
    </div>

    <p>
     Thank you
    </p>

	  <p class="footer">
      NOTE: If it wasn’t you please disregard this email and make sure you can still login to your account.
    </p>
    
    <p class="footer">
      Questions or FAQ? Contact us at <a href="mailto:support@reelsync.io">support@reelsync.io</a>.
      For more information about Reelsync.io, visit <a href="https://www.reelsync.io">www.reelsync.io</a>.
    </p>
  </div>
</body>
</html>
`;
    }

    static sendStageUpdateEmail(projectName: string, stageName: string, link: string) {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #f5f5f5;">
<div style="background-color: #ffffff; max-width: 600px; margin: 0 auto; padding: 40px 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
<div style="text-align: left; margin-bottom: 20px;">
<img src="https://reelsync-beta-public-bucket.s3.us-east-1.amazonaws.com/logo_reelsync-IthkHd.png"
alt="ReelSync.io Logo"
width="150"
style="display: block;">
</div>

<p style="font-size: 16px; line-height: 2.3; margin: 10px 0 25px 0;">Hi,</p>

<p style="font-size: 16px; line-height: 2.3; margin: 10px 0 25px 0;">
Your ${projectName} current activity is below:
</p>

<div style="display: flex; margin-bottom: 25px;">
<div style="position: relative; background: #10B981; width: 28px; height: 28px; border-radius: 999px; margin-right: 10px;">
<img src="https://reelsync-beta-public-bucket.s3.us-east-1.amazonaws.com/Frame%201000008731_reelsync-4tIR6w.png"
alt="ReelSync.io Logo"
width="28"
style="display: block;">
</div>

<div style="margin-top: 5px; margin-right: 10px;">
${stageName}
</div>

<div style="display: inline-block; margin-top: 5px; background: #ECFDF5; border-radius: 12px; padding: 2px 6px; color: #15803D;">
Done
</div>
</div>

<p style="font-size: 16px; line-height: 2.3; margin: 10px 0;">
To track all the stages with their task details use following link:
</p>

<div style="padding: 12px; border-radius: 6px; word-break: break-word; font-family: monospace; font-size: 14px; margin: 20px 0; background-color: #f3f3f3;">
<a href="${link}" target="_blank" style="color: inherit; text-decoration: none;">${link}</a>
</div>

<p style="font-size: 16px; line-height: 2.3; margin: 10px 0;">
Thank you
</p>

<p style="font-size: 14px; color: #777; margin-top: 30px;">
Questions or FAQ? Contact us at 
<a href="mailto:support@reelsync.io" style="color: #059669; text-decoration: underline;">support@reelsync.io</a>.
For more information about Reelsync.io, visit 
<a href="https://www.reelsync.io" style="color: #059669; text-decoration: underline;">www.reelsync.io</a>.
</p>
</div>
</body>
</html>
`;
    }

    //     static sendUserInviteEmailHtmlV2(email: string, resetPasswordLink: string, time: string): string {
    //         return `
    // <!DOCTYPE html>
    // <html lang="en">
    // <head>
    //   <meta charset="UTF-8" />
    //   <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    //   <title>ReelSync.io Verification Email</title>
    //   <style>
    //     body {
    //       margin: 0;
    //       padding: 20px;
    //       font-family: Arial, sans-serif;
    //       background-color: #f5f5f5;
    //     }

    //     .container {
    //       background-color: #ffffff;
    //       max-width: 600px;
    //       margin: 0 auto;
    //       padding: 30px 20px;
    //       border-radius: 8px;
    //       box-shadow: 0 0 10px rgba(0,0,0,0.05);
    //     }

    //     .logo {
    //       display: flex;
    //       align-items: center;
    //       gap: 8px;
    //       margin-bottom: 20px;
    //     }

    //     .logo img {
    //       height: 32px;
    //     }

    //     h1 {
    //       font-size: 20px;
    //       margin-bottom: 20px;
    //     }

    //     p {
    //       font-size: 16px;
    //       line-height: 1.5;
    //       margin: 10px 0;
    //     }

    //     .link-box {
    //       background-color: #f3f3f3;
    //       padding: 12px;
    //       border-radius: 6px;
    //       word-break: break-all;
    //       font-family: monospace;
    //       font-size: 14px;
    //       margin: 20px 0;
    //     }

    //     .footer {
    //       font-size: 14px;
    //       color: #777;
    //       margin-top: 30px;
    //     }

    //     .footer a {
    //       color: #00aaff;
    //       text-decoration: none;
    //     }

    //     @media (max-width: 600px) {
    //       body {
    //         padding: 20px;
    //       }
    //       .container {
    //         padding: 25px 16px;
    //       }
    //     }
    //   </style>
    // </head>
    // <body>
    //   <div class="container">
    //     <div style="text-align: left; margin-bottom: 20px;">
    // <img src="https://reelsync-beta-public-bucket.s3.us-east-1.amazonaws.com/logo_reelsync-IthkHd.png"
    //         alt="ReelSync.io Logo"
    //         width="150"
    //         style="display: block;">
    //       </div>

    //     <p>Hi there,</p>

    //     <p>
    //       You have requested reelsync.io account using the email address ${email}.
    //     </p>

    //     <p>
    //       Use the following link to verify your email address. This link is valid for ${time}.
    //     </p>

    //     <div class="link-box">
    //       <a href="${resetPasswordLink}" target="_blank">${resetPasswordLink}</a>
    //     </div>

    //     <p class="footer">
    //       If you did not sign up for this account you can ignore this email.
    //     </p>

    //     <p class="footer">
    //       Questions or FAQ? Contact us at <a href="mailto:support@reelsync.io">support@reelsync.io</a>.
    //       For more information about Reelsync.io, visit <a href="https://www.reelsync.io">www.reelsync.io</a>.
    //     </p>
    //   </div>
    // </body>
    // </html>
    // `;
    //     }
}
