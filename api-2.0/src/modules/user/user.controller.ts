import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import { User } from '../auth/auth.decorator';
import { AdminGuard, AuthGuard } from '../auth/auth.guard';
import { AuthPayload } from '../auth/entities/auth-payload.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@User() user: AuthPayload, @Param('id') id: string) {
    if (!this.userService.canReadOrUpdate(id, user)) {
      throw new UnauthorizedException();
    }

    return this.userService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@User() user: AuthPayload, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    if (!this.userService.canReadOrUpdate(id, user)) {
      throw new UnauthorizedException();
    }

    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
