import { Controller, Patch, Body, Get, UseGuards, Request } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthGuard } from '../../auth/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './profile.entity';

@ApiTags('Profile')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('users/profile')
export class ProfileController {
  constructor(private readonly usersSvc: ProfileService) {}

  @Get()
  @ApiOperation({ summary: 'Get profile of the user' })
  @ApiResponse({ status: 200, description: 'Return the user profile.', type: Profile })
  getProfile(@Request() req) {
    return this.usersSvc.findOne(req.user.sub);
  }

  @Patch()
  @ApiOperation({ summary: 'Update the profile of the user' })
  @ApiResponse({ status: 200, description: 'The profile has been successfully updated.', type: Profile })
  updateProfile(@Request() req, @Body() body: UpdateProfileDto) {
    return this.usersSvc.updateProfile(req.user.sub, body);
  }
}
