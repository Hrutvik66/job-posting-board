import mongoose from "mongoose";
import { Schema } from "mongoose";

const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    experienceLevel: {
      type: String,
      required: true,
    },
    candidates: [
      {
        type: String
      },
    ],
    endDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "upated_at" } }
);

const jobModel = mongoose.model('JobSchema',jobSchema);

export default jobModel;
