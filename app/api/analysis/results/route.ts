import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "../../../lib/mongodb"
import ECGRecord from "../../../models/ECGRecord"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    // Get latest ECG record for demo
    const latestRecord = await ECGRecord.findOne().sort({ uploadDate: -1 }).limit(1)

    if (!latestRecord) {
      // Return mock data if no records found
      return NextResponse.json({
        totalArrhythmias: 5,
        averageFrequency: 2.1,
        severity: "Moderate",
        arrhythmiaTypes: {
          typeA: 30,
          typeB: 25,
          typeC: 45,
          typeD: 20,
          typeE: 40,
        },
      })
    }

    return NextResponse.json(latestRecord.analysisResult)
  } catch (error) {
    console.error("Analysis fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch analysis" }, { status: 500 })
  }
}
