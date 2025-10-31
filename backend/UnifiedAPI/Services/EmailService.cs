using System.Net;
using System.Net.Mail;

namespace UnifiedAPI.Services;

public class EmailService
{
    private readonly IConfiguration _configuration;

    public EmailService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task SendOtpEmailAsync(string toEmail, string otp)
    {
        var smtpHost = _configuration["Smtp:Host"] ?? "smtp.gmail.com";
        var smtpPort = int.Parse(_configuration["Smtp:Port"] ?? "587");
        var smtpUser = _configuration["Smtp:User"] ?? "";
        var smtpPass = _configuration["Smtp:Pass"] ?? "";
        var smtpFrom = _configuration["Smtp:From"] ?? smtpUser;

        using var client = new SmtpClient(smtpHost, smtpPort)
        {
            EnableSsl = true,
            Credentials = new NetworkCredential(smtpUser, smtpPass)
        };

        var mailMessage = new MailMessage
        {
            From = new MailAddress(smtpFrom, "Project Galaxy"),
            Subject = "Your Portal Access Code - Project Galaxy",
            Body = GetOtpEmailHtml(otp),
            IsBodyHtml = true
        };

        mailMessage.To.Add(toEmail);

        await client.SendMailAsync(mailMessage);
    }

    private string GetOtpEmailHtml(string otp)
    {
        return $@"
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {{
        font-family: Arial, sans-serif;
        background: #140655;
        margin: 0;
        padding: 20px;
        position: relative;
      }}
      
      .container {{
        max-width: 600px;
        margin: 0 auto;
        background: linear-gradient(135deg, #0f0444 0%, #1a0a66 100%);
        border-radius: 20px;
        padding: 40px;
        border: 2px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      }}
      
      .header {{
        text-align: center;
        margin-bottom: 30px;
      }}
      
      .title {{
        font-family: 'Protest Guerrilla', 'Georgia', serif;
        font-size: 36px;
        color: #ffffff;
        margin: 0 0 10px 0;
        text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
      }}
      
      .subtitle {{
        color: #a78bfa;
        font-size: 16px;
        font-style: italic;
      }}
      
      .otp-box {{
        background: linear-gradient(90deg, #2a0a56, #4321a9, #642aa5, #b53da1);
        border-radius: 15px;
        padding: 30px;
        text-align: center;
        margin: 30px 0;
        box-shadow: 0 4px 20px rgba(181, 61, 161, 0.3);
      }}
      
      .otp-code {{
        font-size: 42px;
        font-weight: bold;
        color: #ffffff;
        letter-spacing: 8px;
        font-family: 'Courier New', monospace;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
      }}
      
      .message {{
        color: #cbd5e1;
        line-height: 1.6;
        margin: 20px 0;
        font-size: 15px;
      }}
      
      .warning {{
        background: rgba(239, 68, 68, 0.1);
        border-left: 4px solid #ef4444;
        padding: 15px;
        border-radius: 8px;
        color: #fecaca;
        margin: 20px 0;
        font-size: 14px;
      }}
      
      .footer {{
        text-align: center;
        color: #94a3b8;
        font-size: 13px;
        margin-top: 30px;
        padding-top: 20px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
      }}
      
      .stars {{
        text-align: center;
        font-size: 20px;
        margin: 20px 0;
      }}
    </style>
  </head>
  <body>
    <div class=""container"">
      <div class=""header"">
        <div class=""stars"">🌙 ✨ 🌟</div>
        <h1 class=""title"">Project Galaxy</h1>
        <p class=""subtitle"">✧ Your Portal Access Code ✧</p>
      </div>
      
      <p class=""message"">
        Greetings, cosmic explorer! 🚀
      </p>
      
      <p class=""message"">
        Your magical access code to enter the Project Galaxy realm has been summoned. 
        Use the code below to complete your authentication:
      </p>
      
      <div class=""otp-box"">
        <div class=""otp-code"">{otp}</div>
      </div>
      
      <p class=""message"">
        This code will expire in <strong>10 minutes</strong>. Enter it swiftly to continue your journey!
      </p>
      
      <div class=""warning"">
        ⚠️ <strong>Security Notice:</strong> Never share this code with anyone. 
        Our team will never ask for this code.
      </div>
      
      <p class=""message"" style=""text-align: center; margin-top: 30px;"">
        May your projects reach the stars! ✨
      </p>
      
      <div class=""footer"">
        <p>This is an automated message from Project Galaxy</p>
        <p>If you didn't request this code, please ignore this email.</p>
      </div>
    </div>
  </body>
</html>";
    }
}
