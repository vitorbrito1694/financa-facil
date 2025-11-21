import {
  Controller,
  Patch,
  Param,
  Body,
  ParseUUIDPipe,
  Get,
} from '@nestjs/common';
import { UsersService } from '../users.service';

@Controller('users/:id/profile')
export class ProfileController {
  constructor(private readonly usersSvc: UsersService) {}

  @Patch()
  updateProfile(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: any,
  ) {
    return this.usersSvc.updateProfile(id, body);
  }

  @Get()
  getProfile(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersSvc.findOne(id).then((u) => u?.profile ?? null);
  }
}
