using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace service.Services
{
    public static class EmailService
    {
        public static async Task SendEmailAsync(string toEmail, string subject, string body)
        {
            Console.WriteLine("Preparing to send email...");

            try
            {
                using (var smtpClient = new SmtpClient("smtp.gmail.com", 587))
                {
                    smtpClient.UseDefaultCredentials = false;
                    smtpClient.Credentials = new NetworkCredential("moellers.den@gmail.com", "your_app_specific_password_here");
                    smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
                    smtpClient.EnableSsl = true;

                    var mailMessage = new MailMessage
                    {
                        From = new MailAddress("moellers.den@gmail.com"),
                        Subject = subject,
                        Body = body,
                        IsBodyHtml = true,
                    };
                    mailMessage.To.Add(toEmail);

                    Console.WriteLine("Sending email to: " + toEmail);
                    await smtpClient.SendMailAsync(mailMessage);
                    Console.WriteLine("Email sent successfully to: " + toEmail);
                }
            }
            catch (SmtpException smtpEx)
            {
                Console.WriteLine($"SMTP Error sending email: {smtpEx.Message}, Status Code: {smtpEx.StatusCode}");
                throw;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"General Error sending email: {ex.Message}");
                throw;
            }
        }
    }
}