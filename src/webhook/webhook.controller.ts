import { Controller, Post, Body, Req } from '@nestjs/common';

@Controller('webhook')
export class WebhookController {
  @Post()
  handleWebhook(@Req() request, @Body() payload: any) {
    console.log('Received webhook request:', request);
    console.log('Received webhook data',payload);
    return 'Webhook received successfully';
  }
}