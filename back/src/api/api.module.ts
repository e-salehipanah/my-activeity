import { Module } from '@nestjs/common';
import { DateModule } from './date/date.module';

@Module({
  imports: [DateModule],
})
export class ApiModule {}
