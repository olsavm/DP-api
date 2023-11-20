import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RecordSchema } from './record.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'record', schema: RecordSchema }]),
  ],
  providers: [RecordService],
  controllers: [RecordController],
})
export class RecordModule {}
