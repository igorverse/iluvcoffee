import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffesService: CoffeesService) {}

  @Get()
  findAll(@Query() paginationQuery) {
    // const { limit, offset } = paginationQuery;
    return this.coffesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffesService.findOne(id);
  }

  @Post()
  create(@Body() CreateCoffeeDto: CreateCoffeeDto) {
    return this.coffesService.create(CreateCoffeeDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateCoffeeDto: UpdateCoffeeDto) {
    return this.coffesService.update(id, UpdateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffesService.remove(id);
  }
}
