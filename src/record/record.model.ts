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
  startDate: string;
  endDate: string;
  userId: string;
  distanceTravelled: number;
  trackData: TrackData[];
}

export const RecordSchema = new mongoose.Schema<Record>(
  {
    distanceTravelled: {
      type: Number,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
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
  userId: string;
  startDate: string;
  endDate: string;
  distanceTravelled: number;
  trackData: TrackData[];
}
