import { Injectable, UseInterceptors } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer'; // Import only MailerService
// import { ErrorInterceptor } from 'src/error/error.interceptor';

@Injectable()
// @UseInterceptors(ErrorInterceptor)
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendBookingConfirmation(userEmail: string, eventName: string): Promise<void> {
    const mailOptions = {
      to: userEmail,
      subject: 'Booking Confirmation',
      html: `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
      <h2 style="color: #333;">Booking Confirmed!</h2>
      <p style="color: #555;">Dear User,</p>
      <p style="color: #555; font-size: 16px;">Congratulations! You have successfully booked the event:</p>
      <p style="color: #555; font-size: 18px; font-weight: bold; margin-top: 10px;">${eventName}</p>
      <p style="color: #555; font-size: 16px;">Thank you for choosing us. We look forward to seeing you at the event!</p>
      <p style="color: #555; font-size: 16px;">Best regards,</p>
      <p style="color: #555; font-size: 16px;">Your Event Management Team</p>
    </div>`
     
    };
    await this.mailerService.sendMail(mailOptions);
  }
  async sendBookingPDF(receiverEmail: string, pdfBuffer: Buffer) {
    const mailOptions = {
      from: 'poojantech11@gmail.com',
      to: receiverEmail,
      subject: 'Booking Confirmation PDF',
      // text: 'Attached is your booking confirmation PDF.',
      html: `
      <h1>Booking Confirmation</h1>
      <p>Dear Customer,</p>
      <p>Thank you for booking the event. Your booking confirmation PDF is attached.</p>
      <p>Enjoy the event!</p>
      <br>
      <p>Best regards,</p>
      <p>Your Event Management Team</p>
    `,
      attachments: [
        {
          filename: 'booking_confirmation.pdf',
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    };
    try {
      await this.mailerService.sendMail(mailOptions);
      console.log('Booking confirmation PDF sent successfully.');
    } catch (error) {
      console.error('Error sending booking confirmation PDF:', error);
      throw error;
    }
  }
  async sendEventReminder(userEmail: string, eventName: string): Promise<void> {
    const mailOptions = {
      from: 'poojantech11@gmail.com', 
      to: userEmail,
      subject: 'Event Reminder',
      html: `
        <p>Dear user,</p>
        <p>Just a reminder that the event "${eventName}" is about to start soon.</p>
        <p>Thankyou</p>`,
    };
    try {
      await this.mailerService.sendMail(mailOptions);
      console.log('Event reminder email sent successfully.');
    } catch (error) {
      console.error('Error sending event reminder email:', error);
      throw error;
    }
  }

}

