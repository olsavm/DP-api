import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TrackRecord } from './record.model';

@Injectable()
export class RecordService {
  constructor(
    @InjectModel('record') private readonly recordModel: Model<TrackRecord>,
  ) {}

  async insertRecord(trackJson: string) {
    const parsedResult = JSON.parse(trackJson);
    const trackData = parsedResult.map((jsonString) => JSON.parse(jsonString));

    const newRecord = new this.recordModel({
      trackData,
    });

    await newRecord.save();
    return newRecord;
  }
}
