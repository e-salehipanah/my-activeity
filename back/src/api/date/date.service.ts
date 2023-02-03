import { HttpException, Injectable } from '@nestjs/common';
import { CreateDateDto } from './dto/create-date.dto';
import { UpdateDateDto } from './dto/update-date.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Date } from './entities/date.entity';
import { Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';

@Injectable()
export class DateService {
  constructor(
    @InjectRepository(Date)
    private readonly repository: Repository<Date>,
  ) {}
  create(createDateDto: CreateDateDto) {
    const date = this.repository.create(createDateDto);
    return this.repository.save(date);
  }

  findAll(date: string) {
    // return this.repository.find({ where: { date } });
    return this.repository
      .createQueryBuilder('date')
      .where('date.date LIKE :date', { date: `%${date}%` })
      .getMany();
  }

  findOne(id: number) {
    return this.repository.findOne({ id });
  }

  async update(id: number, updateDateDto: UpdateDateDto) {
    const date = await this.findOne(id);
    if (!date) {
      // return new HttpException(NotFoundError, 'date not found');
    }
    Object.assign(date, updateDateDto);
    return this.repository.save(date);
  }

  remove(id: number) {
    return this.repository.delete({ id });
  }
}
