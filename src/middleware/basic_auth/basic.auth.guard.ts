import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async validateUser(username: string, password: string): Promise<any> {
    if (username == 'pooja' && password == 'pooja@') {
      console.log('Valid user');
      return 'success';
    }
    console.log('Invalid user');
    return null;
  }
}