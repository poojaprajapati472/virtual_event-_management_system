import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Get,
  UseGuards,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateadminDto } from './dto';
// import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { admin } from './adminschema';
import { JwtAuthGuard } from 'src/middleware/jwt.auth.guard';
import { ApiBody, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { I18n, I18nContext } from 'nestjs-i18n';
import { ErrorInterceptor } from 'src/interceptor/error.interceptor';
// import { Roles } from './decorator/role.decorator';
@ApiTags('admin')
@Controller('admin')
@UseInterceptors(ErrorInterceptor)
export class AdminController {
  constructor(
    public adminservice: AdminService,
    private readonly jwtService: JwtService,
  ) {}
  @Post('/signup')
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
  })
  @ApiBody({ type: CreateadminDto })
  async signup(@Body() admin_details: CreateadminDto,@I18n() i18n: I18nContext) {
    const newadmin = await this.adminservice.createadmin(admin_details);
    return { message: i18n.t('test.adminregisteredsuccessfully'), admin: newadmin };
  }
  @Post('/login')
  @ApiBody({ type: CreateadminDto })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully',
    type: String,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async login(@Body() loginDto: CreateadminDto,@I18n() i18n: I18nContext) {
    const admin = await this.adminservice.loginadmin(loginDto.email);
    console.log(admin);
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      admin.password,
    );

    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    const payload = {
      sub: admin['_id'], // Use the MongoDB-generated _id as the subject (sub) of the token
      email: admin.email,
      roles: admin.roles,
    };

    const token = this.jwtService.sign(payload);
    return { message: i18n.t('test.AdminLoggedinsuccessfully'), admin, token };
  }
  // @UseGuards(AuthGuard('basic'))
  @Get('/getall')
  @ApiResponse({
    status: 200,
    description: 'List of all admin',
    type: admin,
    isArray: true,
  })
  async getalladmin(): Promise<admin[]> {
    return this.adminservice.findall();
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  @ApiHeader({
    name: 'Token',
    description: 'Token',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'User profile data',
  })
  gethello(@Req() req): any {
    console.log('xyz4');
    console.log(req.user);
    return req.user;
  }
}
