import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TrackRecord } from './record.model';

@Injectable()
export class RecordService {
  constructor(
    @InjectModel('record') private readonly recordModel: Model<TrackRecord>,
  ) {}

  async insertRecord(
    trackJson: string,
    userId: string,
    startDate: string,
    endDate: string,
    distanceTravelled: number,
  ) {
    const parsedResult = JSON.parse(trackJson);
    const trackData = parsedResult.map((jsonString) => JSON.parse(jsonString));

    const newRecord = new this.recordModel({
      userId,
      trackData,
      startDate,
      endDate,
      distanceTravelled,
    });

    await newRecord.save();
    return newRecord;
  }

  async getAllRecords(userId: string) {
    return this.recordModel.find({ userId });
  }

  async getRecord(recordId: string) {
    return this.recordModel.findOne({ _id: recordId });
  }
}
