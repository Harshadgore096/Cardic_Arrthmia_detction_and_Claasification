"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Search } from "lucide-react"
import Navigation from "../_components/Navigation"
import ECGChart from "../_components/ECGChart"

export default function Visualization() {
  const [searchTerm, setSearchTerm] = useState("")
  const [ecgData, setEcgData] = useState<number[]>([])

  useEffect(() => {
    // Generate sample ECG data
    const generateECGData = () => {
      const data = []
      for (let i = 0; i < 1000; i++) {
        const t = i / 100
        const ecg = Math.sin(t * 2 * Math.PI * 1.2) * 0.5 + Math.sin(t * 2 * Math.PI * 0.8) * 0.3 + Math.random() * 0.1
        data.push(ecg)
      }
      return data
    }

    setEcgData(generateECGData())
  }, [])

  return (
    <div className="min-h-screen bg-slate-800">
      <Navigation />

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-6">ECG Chart Visualization</h1>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search patient ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-600 border-slate-500 text-white placeholder-slate-400 h-12"
            />
          </div>
        </div>

        <Card className="bg-slate-700 border-slate-600">
          <CardContent className="p-8">
            <div className="mb-6">
              <h2 className="text-sm font-medium text-slate-400 mb-2">ECG Waveform</h2>
              <h3 className="text-2xl font-bold text-white mb-2">Normal Sinus Rhythm</h3>
              <p className="text-slate-400">
                Last 24 Hours <span className="text-green-400">+2%</span>
              </p>
            </div>

            <ECGChart data={ecgData} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
