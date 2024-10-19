import mongoose from "mongoose";
const { Schema } = mongoose;

const companySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    company_name: {
      type: String,
      required: true,
    },
    company_email: {
      type: String,
      required: true,
    },
    employee_size: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "upated_at" } }
);

const companyModel = mongoose.model("companyModel", companySchema);

export default companyModel;