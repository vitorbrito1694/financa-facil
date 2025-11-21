import {
  Controller,
  Patch,
  Param,
  Body,
  ParseUUIDPipe,
  Get,
} from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('users/:id/profile')
export class ProfileController {
  constructor(private readonly usersSvc: ProfileService) {}

  @Patch()
  updateProfile(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: any,
  ) {
    return this.usersSvc.updateProfile(id, body);
  }
}
