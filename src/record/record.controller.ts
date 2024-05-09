import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RecordService } from './record.service';
import { TrackData } from './record.model';

@Controller('records')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  //post / signup
  @Post('/')
  async insertRecord(
    @Body('trackJson') trackJson: string,
    @Body('userId') userId: string,
    @Body('startDate') startDate: string,
    @Body('endDate') endDate: string,
    @Body('distanceTravelled') distanceTravelled: number,
  ): Promise<{ recordId: string; userId: string; trackData: TrackData[] }> {
    const result = await this.recordService.insertRecord(
      trackJson,
      userId,
      startDate,
      endDate,
      distanceTravelled,
    );
    return {
      userId: result.userId,
      recordId: result.id,
      trackData: result.trackData,
    };
  }

  @Get('/:userId')
  async getAllRecords(@Param('userId') userId): Promise<any[]> {
    console.log(userId);
    return await this.recordService.getAllRecords(userId);
  }

  @Get('/single/:recordId')
  async getRecord(@Param('recordId') recordId): Promise<any> {
    return await this.recordService.getRecord(recordId);
  }
}
