import { Module } from '@nestjs/common';
import { DateService } from './date.service';
import { DateController } from './date.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Date } from './entities/date.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Date])],
  controllers: [DateController],
  providers: [DateService],
  exports: [TypeOrmModule],
})
export class DateModule {}
