// import { Injectable } from '@nestjs/common';
// import { google, Auth } from 'googleapis';
// import * as qrcode from 'qrcode';
// import * as fs from 'fs';

// @Injectable()
// export class GoogleDriveService {
//   async saveQRCodeToDrive(userEmail: string, qrCodeImage: string,refreshToken: string): Promise<void> {
//     const auth = await this.authenticateUser(refreshToken);
//     const drive = google.drive({ version: 'v3', auth });
//     const fileMetadata = {
//       name: 'qrcode.png', 
//     };
//     // Upload the file to Google Drive
//     await drive.files.create({
//         media: {
//           mimeType: 'image/png',
//           body: Buffer.from(qrCodeImage.replace(/^data:image\/png;base64,/, ''), 'base64'),
//         },
//         requestBody: fileMetadata,
//         fields: 'id',
//         uploadType: 'multipart',
//       });
//     }

//   private async authenticateUser(refreshToken: string,): Promise<Auth.OAuth2Client> {
//     const client = new google.auth.OAuth2({
//       clientId: process.env.CLIENT_ID,
//       clientSecret:process.env.CLIENT_SECRET ,
//       redirectUri: process.env.REDIRECT_URL,
//     });

//    // Replace with the user's refresh token
//     client.setCredentials({ refresh_token: refreshToken });

//     return client;
//   }
// }
