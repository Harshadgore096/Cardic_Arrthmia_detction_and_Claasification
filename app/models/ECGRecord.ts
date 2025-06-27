import mongoose from "mongoose"

const ECGRecordSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  rawData: [
    {
      type: Number,
    },
  ],
  analysisResult: {
    totalArrhythmias: Number,
    averageFrequency: Number,
    severity: String,
    arrhythmiaTypes: {
      typeA: Number,
      typeB: Number,
      typeC: Number,
      typeD: Number,
      typeE: Number,
    },
    confidence: Number,
    detectedPatterns: [String],
  },
  patientId: {
    type: String,
    required: true,
  },
})

export default mongoose.models.ECGRecord || mongoose.model("ECGRecord", ECGRecordSchema)
