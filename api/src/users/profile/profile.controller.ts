import { Controller, Patch, Body, Get, UseGuards, Request } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthGuard } from '../../auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Profile')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('users/profile')
export class ProfileController {
  constructor(private readonly usersSvc: ProfileService) {}

  @Get()
  getProfile(@Request() req) {
    return this.usersSvc.findOne(req.user.sub);
  }

  @Patch()
  updateProfile(@Request() req, @Body() body: any) {
    return this.usersSvc.updateProfile(req.user.sub, body);
  }
}
