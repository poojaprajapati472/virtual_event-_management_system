import { Body, Controller, Get, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { EventService } from './event.service';
import { JwtAuthGuard } from 'src/middleware/jwt.auth.guard';
import { EventDto } from './date_transfer_object/eventdto';
import { Role } from './decorator/role.enum';
import { Roles } from './decorator/role.decorator';
import { RolesGuard } from './decorator/roles.guard';
import { ApiBody, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ErrorInterceptor } from 'src/interceptor/error.interceptor';

@ApiTags('events')
@Controller('event')
@UseInterceptors(ErrorInterceptor)
export class EventController {
  constructor(private readonly eventservice: EventService) {}

  @Roles(Role.Admin)
  @Post('/create')
  @ApiBody({ type: EventDto })
  @ApiHeader({
    name: 'Token',
    description: 'Token',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'event created by admin successfully',
    type: String,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  // @Roles(Role.User) // Add this decorator to specify the required role
  @UseGuards(JwtAuthGuard, RolesGuard)
  createEvent(@Body() eventDto: EventDto) {
    return this.eventservice.createEvent(eventDto);
  }

  @UseGuards(AuthGuard('basic'))
  @Get('/allevent')
  @ApiResponse({
    status: 200,
    description: 'List of all events',
    type: Event,
    isArray: true,
  })
  async getalluser(): Promise<Event[]> {
    return this.eventservice.findall();
  }

  //list all the event booked by the user by using token jwt
  @UseGuards(JwtAuthGuard)
  @Get('/user-events')
  @ApiHeader({
    name: 'Token',
    description: 'Token',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'User profile data',
  })
  async getUserEvents(@Req() req): Promise<Event[]> {
    return this.eventservice.findEventsByUserAttendee(req.user._id); // Use _id
  }
}
