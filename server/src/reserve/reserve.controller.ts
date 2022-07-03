import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Body,
  UseGuards,
  Request,
  Patch,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserRole } from '../user/constants';
import { AddReserveDto, ModifyReserveDto } from './dto';
import { Reserve } from './reserve.schema';
import { ReserveService } from './reserve.service';

@Controller('reserve')
export class ReserveController {
  constructor(private readonly reserveService: ReserveService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async queryById(@Request() req, @Body() body: Reserve, @Param() params: any) {
    const guestId = req.user.role === UserRole.admin ? null : req.user.id;
    const result = await this.reserveService.queryReserveById(
      params.id,
      guestId,
    );
    if (!result) return { code: 400, msg: 'reserve not exist or not owner' };
    return { code: 0, msg: 'success' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/owner/:id')
  async queryReserveByOwner(@Request() req, @Param() params: any) {
    if (req.user.role === UserRole.guest && req.user.id !== params.id)
      return { code: 400, msg: 'not owner' };

    const reserve = await this.reserveService.queryReserveByOwner(params.id);
    return {
      code: 0,
      data: reserve,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/list/date/:reserveDate/used/:isUsed/status/:status')
  async queryReserveList(@Request() req, @Param() params: any) {
    if (req.user.role !== UserRole.admin)
      return { code: 400, msg: 'not admin' };

    const reserveList = await this.reserveService.queryReserveList(params);
    return {
      code: 0,
      data: reserveList,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async addReserve(@Request() req, @Body() body: AddReserveDto) {
    const data = await this.reserveService.createReserve({
      ...body,
      createdUserId: req.user.id,
    });

    return { code: 0, data, msg: 'success' };
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async modifyReserve(
    @Request() req,
    @Body() body: ModifyReserveDto,
    @Param() params: any,
  ) {
    const guestId = req.user.role === UserRole.admin ? null : req.user.id;
    const result = await this.reserveService.modifyReserve(
      params.id,
      body,
      guestId,
    );
    if (!result) return { code: 400, msg: 'reserve not exist or not owner' };
    return { code: 0, msg: 'success' };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/used/id/:id')
  async used(@Request() req, @Param() params: any) {
    const guestId = req.user.role === UserRole.admin ? null : req.user.id;
    const result = await this.reserveService.usedReserve(params.id, guestId);
    if (!result) return { code: 400, msg: 'reserve not exist or not owner' };
    return { code: 0, msg: 'success' };
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async cancel(@Request() req, @Param() params: any) {
    const guestId = req.user.role === UserRole.admin ? null : req.user.id;
    const result = await this.reserveService.cancelReserve(params.id, guestId);
    if (!result) return { code: 400, msg: 'reserve not exist or not owner' };
    return { code: 0, msg: 'success' };
  }
}
