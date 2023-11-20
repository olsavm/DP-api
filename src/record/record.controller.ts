import { Body, Controller, Post } from '@nestjs/common';
import { RecordService } from './record.service';
import { TrackData } from './record.model';

@Controller('records')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  //post / signup
  @Post('/')
  async insertRecord(
    @Body('trackJson') trackJson: string,
  ): Promise<{ recordId: string; trackData: TrackData[] }> {
    const result = await this.recordService.insertRecord(trackJson);
    return {
      recordId: result.id,
      trackData: result.trackData,
    };
  }
}
