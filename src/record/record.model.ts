import * as mongoose from 'mongoose';

export interface TrackData {
  accuracy: number;
  altitude: number;
  altitudeAccuracy: number;
  heading: number;
  latitude: number;
  longitude: number;
  speed: number;
}

interface Record extends Document {
  trackData: TrackData[];
}

export const RecordSchema = new mongoose.Schema<Record>(
  {
    trackData: [
      {
        type: Object,
        required: true,
      },
    ],
  },
  { timestamps: true },
);

export interface TrackRecord extends mongoose.Document {
  _id: string;
  trackData: TrackData[];
}
