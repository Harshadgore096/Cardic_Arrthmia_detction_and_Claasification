import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import ECGRecord from "../../models/ECGRecord"
import { processECGData } from "@/lib/tensorflow"

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const formData = await request.formData()
    const file = formData.get("ecgFile") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Read file content
    const fileContent = await file.text()

    // Parse ECG data based on file type
    let ecgData: number[] = []
    if (file.name.endsWith(".csv")) {
      ecgData = fileContent
        .split("\n")
        .filter((line) => line.trim())
        .map((line) => Number.parseFloat(line.split(",")[0]))
        .filter((val) => !isNaN(val))
    } else if (file.name.endsWith(".txt")) {
      ecgData = fileContent
        .split("\n")
        .filter((line) => line.trim())
        .map((line) => Number.parseFloat(line))
        .filter((val) => !isNaN(val))
    }

    // Process with TensorFlow model
    const analysisResult = await processECGData(ecgData)

    // Save to database
    const ecgRecord = new ECGRecord({
      filename: file.name,
      uploadDate: new Date(),
      rawData: ecgData,
      analysisResult,
      patientId: "demo-patient", // In real app, get from auth
    })

    await ecgRecord.save()

    return NextResponse.json({
      message: "File uploaded successfully",
      recordId: ecgRecord._id,
      analysisResult,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
