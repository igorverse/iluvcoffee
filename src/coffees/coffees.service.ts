import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly conffeeRepository: Repository<Coffee>,
  ) {}

  findAll() {
    return this.conffeeRepository.find();
  }

  async findOne(id: string) {
    const coffee = await this.conffeeRepository.findOne({ where: { id: +id } });

    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found!`);
    }

    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    const coffee = this.conffeeRepository.create(createCoffeeDto);
    return this.conffeeRepository.save(coffee);
  }

  async update(id: string, udpateCoffeeDto: UpdateCoffeeDto) {
    const coffee = await this.conffeeRepository.preload({
      id: +id,
      ...udpateCoffeeDto,
    });

    if (!Coffee) {
      throw new NotFoundException(`Coffee #${id} not found!`);
    }

    return this.conffeeRepository.save(coffee);
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);

    return this.conffeeRepository.remove(coffee);
  }
}
