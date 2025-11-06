export const verificationEmailTemplate = (code) => `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
    <table style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
      <tr style="background-color: #3f51b5;">
        <td style="padding: 20px; text-align: center; color: #ffffff;">
          <h1 style="margin: 0;">🔒 Verified by Saqib</h1>
        </td>
      </tr>
      <tr>
        <td style="padding: 30px;">
          <h2 style="color: #333333;">Email Verification Code</h2>
          <p style="font-size: 16px; color: #555555;">
            Please use the following verification code to complete your action:
          </p>
          <div style="margin: 20px 0; text-align: center;">
            <span style="display: inline-block; background-color: #3f51b5; color: white; font-size: 32px; font-weight: bold; padding: 10px 20px; border-radius: 6px; letter-spacing: 4px;">
              ${code}
            </span>
          </div>
          <p style="font-size: 14px; color: #777777;">
            This code is valid for the next <strong>5 minutes</strong>. Please do not share it with anyone.
          </p>
        </td>
      </tr>
      <tr style="background-color: #f0f0f0;">
        <td style="text-align: center; padding: 20px; font-size: 13px; color: #888888;">
          &copy; ${new Date().getFullYear()} Services By Saqib CompanyIT. All rights reserved.
        </td>
      </tr>
    </table>
  </div>
`;
